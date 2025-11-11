// src/utils/aiApi.js

/**
 * This function sends the image to your Flask backend and gets a real prediction.
 * It is based on the "Backend API Integration" example from your AI_INTEGRATION_GUIDE.md
 */
export async function getAIPrediction(fileName, imageFile, modelName = 'resnet50') {
  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    // Connects to your Flask server at http://localhost:5000/api/predict with model parameter
    const response = await fetch(`http://localhost:5000/api/predict?model=${modelName}`, {
      method: 'POST',
      body: formData,
    });

    // Handle errors from the backend
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Prediction failed. Check backend console.');
    }

    // Get the JSON result
    const result = await response.json();

    // Return it in the format the frontend expects
    return {
      filename: fileName,
      prediction: result.prediction, // "healthy" or "bleached"
      confidence: result.confidence, // 0.0 to 1.0
    };
  } catch (error) {
    console.error('Frontend fetch error:', error);
    throw error; // Re-throw the error so the component can catch it
  }
}