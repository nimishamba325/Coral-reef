# 🤖 AI Model Integration Guide

This guide shows you how to replace the mock API with your actual trained AI model.

## 🔄 **Quick Integration Steps**

### **Step 1: Choose Your Integration Method**

#### **Option A: Backend API (Recommended)**
- Deploy your model as a REST API (Flask, FastAPI, Django)
- Frontend calls the API endpoint
- Best for production use

#### **Option B: TensorFlow.js (Browser-based)**
- Convert your model to TensorFlow.js format
- Runs directly in the browser
- No server required, but larger bundle size

#### **Option C: Cloud AI Service**
- Use services like Google Cloud AI, AWS SageMaker, or OpenAI
- Managed infrastructure
- Pay-per-use pricing

### **Step 2: Update the API Function**

Replace `src/utils/mockApi.js` with your actual AI model:

```javascript
// src/utils/aiApi.js
export async function getAIPrediction(fileName, imageFile) {
  // Your AI model integration here
  const formData = new FormData();
  formData.append('image', imageFile);
  
  const response = await fetch('/api/predict', {
    method: 'POST',
    body: formData,
  });
  
  const result = await response.json();
  return {
    filename: fileName,
    prediction: result.prediction, // "healthy" or "bleached"
    confidence: result.confidence,  // 0.0 to 1.0
  };
}
```

### **Step 3: Update the Predict Page**

In `src/pages/Predict.jsx`, change the import:

```javascript
// Replace this line:
import { getMockPrediction } from '../utils/mockApi';

// With this:
import { getAIPrediction } from '../utils/aiApi';
```

And update the analysis function:

```javascript
const handleAnalyze = async () => {
  if (!selectedImage) return;

  setIsAnalyzing(true);
  setResult(null);

  try {
    // Replace mock with real AI
    const aiResult = await getAIPrediction(selectedImage.name, selectedImage);
    setResult(aiResult);
  } catch (error) {
    console.error('Analysis failed:', error);
    // Handle error (show error message to user)
  } finally {
    setIsAnalyzing(false);
  }
};
```

## 🛠️ **Detailed Integration Examples**

### **Backend API Integration (Python/Flask)**

**Backend (Python):**
```python
# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io

app = Flask(__name__)
CORS(app)

# Load your trained model
model = tf.keras.models.load_model('coral_model.h5')

@app.route('/api/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    file = request.files['image']
    image = Image.open(io.BytesIO(file.read()))
    
    # Preprocess image (resize, normalize, etc.)
    image = image.resize((224, 224))
    image_array = np.array(image) / 255.0
    image_array = np.expand_dims(image_array, axis=0)
    
    # Make prediction
    prediction = model.predict(image_array)
    confidence = float(np.max(prediction))
    predicted_class = "healthy" if prediction[0][0] > 0.5 else "bleached"
    
    return jsonify({
        'prediction': predicted_class,
        'confidence': confidence
    })

if __name__ == '__main__':
    app.run(debug=True)
```

**Frontend Integration:**
```javascript
// src/utils/aiApi.js
export async function getAIPrediction(fileName, imageFile) {
  const formData = new FormData();
  formData.append('image', imageFile);
  
  const response = await fetch('http://localhost:5000/api/predict', {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error('Prediction failed');
  }
  
  const result = await response.json();
  return {
    filename: fileName,
    prediction: result.prediction,
    confidence: result.confidence,
  };
}
```

### **TensorFlow.js Integration**

**Convert your model:**
```python
# convert_model.py
import tensorflow as tf

# Load your trained model
model = tf.keras.models.load_model('coral_model.h5')

# Convert to TensorFlow.js format
tfjs.converters.save_keras_model(model, 'public/models/')
```

**Frontend Integration:**
```javascript
// src/utils/tensorflowApi.js
import * as tf from '@tensorflow/tfjs';

let model = null;

export async function loadModel() {
  if (!model) {
    model = await tf.loadLayersModel('/models/model.json');
  }
  return model;
}

export async function getTensorFlowPrediction(fileName, imageFile) {
  const model = await loadModel();
  
  // Create image element
  const imageElement = document.createElement('img');
  imageElement.src = URL.createObjectURL(imageFile);
  
  // Wait for image to load
  await new Promise((resolve) => {
    imageElement.onload = resolve;
  });
  
  // Preprocess image
  const tensor = tf.browser.fromPixels(imageElement)
    .resizeNearestNeighbor([224, 224])
    .expandDims(0)
    .div(255.0);
  
  // Make prediction
  const prediction = model.predict(tensor);
  const result = await prediction.data();
  
  // Clean up
  tensor.dispose();
  prediction.dispose();
  
  return {
    filename: fileName,
    prediction: result[0] > 0.5 ? "healthy" : "bleached",
    confidence: Math.max(result[0], 1 - result[0]),
  };
}
```

## 🚀 **Production Deployment**

### **Environment Variables**
Create `.env` file for configuration:

```env
# .env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_MODEL_PATH=/models/coral-model.json
```

### **Error Handling**
Add comprehensive error handling:

```javascript
const handleAnalyze = async () => {
  if (!selectedImage) return;

  setIsAnalyzing(true);
  setResult(null);
  setError(null);

  try {
    const aiResult = await getAIPrediction(selectedImage.name, selectedImage);
    setResult(aiResult);
  } catch (error) {
    console.error('Analysis failed:', error);
    
    // Show user-friendly error messages
    if (error.message.includes('network')) {
      setError('Network error. Please check your connection.');
    } else if (error.message.includes('timeout')) {
      setError('Analysis timed out. Please try again.');
    } else {
      setError('Analysis failed. Please try again.');
    }
  } finally {
    setIsAnalyzing(false);
  }
};
```

## 📦 **Dependencies to Add**

For TensorFlow.js integration:
```bash
npm install @tensorflow/tfjs
```

For better image processing:
```bash
npm install canvas
```

## 🔧 **Testing Your Integration**

1. **Test with sample images** of known healthy/bleached coral
2. **Verify confidence scores** are reasonable (0.7-0.95)
3. **Check error handling** with invalid images
4. **Test loading states** and user feedback
5. **Validate results** against your model's expected output

## 📊 **Performance Optimization**

- **Image compression** before sending to API
- **Caching** for repeated predictions
- **Progressive loading** for large models
- **Web Workers** for heavy computations
- **CDN** for model files

## 🎯 **Next Steps**

1. **Choose your integration method** based on your needs
2. **Implement the API function** with your model
3. **Update the Predict page** to use real AI
4. **Add error handling** and user feedback
5. **Test thoroughly** with real coral images
6. **Deploy to production** when ready

Your Coral Reef Health Monitoring System is now ready for real AI integration! 🌊🤖
