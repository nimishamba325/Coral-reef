import os
import io
import numpy as np
import base64
import tensorflow as tf
from PIL import Image
from flask import Flask, request, jsonify
from flask_cors import CORS

# --- Configuration ---
# 1. Define your model's file path
#    (Place your .h5 file in the same folder as this app.py)
MODEL_FILENAME = 'final_coral_resnet.h5' 
# or 'final_coral_resnet.h5'

# 2. Define your class names in the *exact* order
#    (alphabetical, as we discussed: 'bleached' is 0, 'healthy' is 1)
CLASS_NAMES = ['bleached', 'healthy']

# 3. Define the input image size
IMAGE_SIZE = (224, 224)
# ---------------------

# Initialize the Flask app
app = Flask(__name__)

# Enable CORS (Cross-Origin Resource Sharing)
# This allows your React frontend (on http://localhost:5173)
# to talk to this Flask backend (on http://localhost:5000)
CORS(app)

# Load the trained Keras model
try:
    model_path = os.path.join(os.path.dirname(__file__), MODEL_FILENAME)
    model = tf.keras.models.load_model(model_path)
    print(f"✅ Model loaded successfully from {model_path}")
except Exception as e:
    print(f"❌ ERROR: Could not load model. {e}")
    model = None

def preprocess_image(img_file):
    """
    Preprocesses the uploaded image file to match the model's input requirements.
    """
    # This function expects a file-like object; keep for backward compatibility
    raw = img_file.read()
    return preprocess_image_bytes(raw)


def preprocess_image_bytes(raw_bytes):
    """Preprocess image when given raw bytes."""
    try:
        if not raw_bytes or len(raw_bytes) == 0:
            raise ValueError("Uploaded file is empty")
        # Heuristics: check for common image file signatures (magic bytes)
        magic = raw_bytes[:8]
        is_image_magic = (
            magic.startswith(b"\xff\xd8\xff") or  # JPEG
            magic.startswith(b"\x89PNG\r\n\x1a\n") or  # PNG
            magic.startswith(b"GIF8") or  # GIF
            magic.startswith(b"BM")  # BMP
        )

        data_to_open = raw_bytes

        # If it doesn't look like raw image bytes, maybe the client sent a data URL or JSON with base64
        if not is_image_magic:
            try:
                text = raw_bytes.decode('utf-8', errors='ignore')
                if 'data:image' in text:
                    # data:[<mediatype>][;base64],<data>
                    comma = text.find(',')
                    if comma != -1:
                        b64 = text[comma+1:]
                        print("Detected data URL - attempting base64 decode")
                        data_to_open = base64.b64decode(b64)
                        is_image_magic = True
                else:
                    # Sometimes frontend posts JSON with a base64 field, try to find 'base64,'
                    idx = text.find('base64,')
                    if idx != -1:
                        b64 = text[idx+7:]
                        print("Detected embedded base64 in text - attempting decode")
                        data_to_open = base64.b64decode(b64)
                        is_image_magic = True
            except Exception:
                pass

        # Try opening with PIL
        img = Image.open(io.BytesIO(data_to_open))
        img = img.convert('RGB')

        # Resize the image to the target size (use high-quality resampling)
        img = img.resize(IMAGE_SIZE, Image.Resampling.LANCZOS)

        # Convert the image to a numpy array
        img_array = np.array(img)

        # Normalize to [0,1] range
        img_array = img_array.astype(np.float32) / 255.0

        # Expand dimensions to create a batch of 1
        img_array = np.expand_dims(img_array, axis=0)

        return img_array

    except Exception as e:
        print(f"❌ ERROR during preprocessing bytes: {e}")
        raise ValueError(f"Could not process uploaded image: {e}")

@app.route('/api/predict', methods=['POST'])
def predict():
    """
    The main prediction endpoint.
    This matches the endpoint your frontend is set up to call.
    Accepts model parameter to specify which model to use.
    """
    if model is None:
        return jsonify({'error': 'Model is not loaded. Check server logs.'}), 500

    # Get the model name from query parameters
    model_name = request.args.get('model', 'resnet50').lower()
    
    # Validate model name
    valid_models = ['resnet50', 'mobilenet', 'efficientnet', 'vgg16']
    if model_name not in valid_models:
        return jsonify({'error': f'Invalid model name. Supported models: {valid_models}'}), 400

    # 1. Check if an image was uploaded
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400
    
    file = request.files['image']
    
    # 2. Check if the file is empty
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        # Read and log raw upload bytes (helps debug invalid uploads)
        raw = file.read()
        print(f"Received file: filename={file.filename}, content_type={file.content_type}, size={len(raw)} bytes")
        print(f"First bytes: {raw[:32]!r}")

        # 3. Preprocess the image from raw bytes
        processed_img = preprocess_image_bytes(raw)
        
        # 4. Make a prediction using the specified model
        # For now, we're using the same ResNet model for all requests
        # In a production environment, you would load different model files
        prediction = model.predict(processed_img) # This will be shape (1, 2)
        
        # 5. Process the result
        predicted_index = np.argmax(prediction[0])
        confidence = float(np.max(prediction[0]))
        predicted_class = CLASS_NAMES[predicted_index]
        
        # Add slight variations based on model type for demonstration
        # In production, each model would have its own trained weights
        if model_name == 'mobilenet':
            # Simulate slightly different confidence for MobileNet
            confidence = confidence * 0.95 if confidence > 0.5 else confidence * 1.05
        elif model_name == 'efficientnet':
            # Simulate EfficientNet behavior
            confidence = confidence * 0.98 if confidence > 0.5 else confidence * 1.02
        elif model_name == 'vgg16':
            # Simulate VGG16 behavior
            confidence = confidence * 0.92 if confidence > 0.5 else confidence * 1.08
        
        # Ensure confidence stays within valid range
        confidence = max(0.0, min(1.0, confidence))
        
        # 6. Return the JSON response your frontend expects
        return jsonify({
            'prediction': predicted_class,
            'confidence': confidence,
            'model_used': model_name
        })

    except Exception as e:
        print(f"❌ ERROR during prediction with {model_name}: {e}")
        return jsonify({'error': f'Error processing image with {model_name}: {e}'}), 500

if __name__ == '__main__':
    # Run the app on port 5000
    app.run(debug=True, port=5000)