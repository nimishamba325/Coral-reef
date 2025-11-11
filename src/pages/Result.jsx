import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useImage } from '../context/ImageContext';
import { getAIPrediction } from '../utils/aiApi';
import ResultCard from '../components/ResultCard';
import SuggestionCard from '../components/SuggestionCard';

const Result = () => {
  const { modelName } = useParams();
  const navigate = useNavigate();
  const { selectedImage, imageUrl } = useImage();
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Model display names
  const modelLabels = {
    resnet50: 'ResNet-50',
    mobilenet: 'MobileNet',
    efficientnet: 'EfficientNet',
    vgg16: 'VGG16'
  };

  useEffect(() => {
    // Redirect to predict page if no image is selected
    if (!selectedImage) {
      navigate('/predict');
      return;
    }

    // Start analysis when component mounts
    analyzeImage();
  }, [selectedImage, modelName]);

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setResult(null);
    setError(null);

    try {
      const aiResult = await getAIPrediction(selectedImage.name, selectedImage, modelName);
      setResult(aiResult);
    } catch (err) {
      console.error('Analysis failed:', err);
      setError(err.message || 'Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleBackToSelection = () => {
    navigate('/predict');
  };

  const handleTryAnotherModel = () => {
    navigate('/predict');
  };

  if (!selectedImage) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Analysis Results
          </h1>
          <p className="text-xl text-gray-600">
            Model Used: <span className="font-semibold text-blue-600">{modelLabels[modelName] || modelName.toUpperCase()}</span>
          </p>
        </div>

        <div className="space-y-8">
          {/* Uploaded Image Display */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Your Image
            </h2>
            <div className="flex justify-center">
              <img
                src={imageUrl}
                alt="Uploaded coral reef"
                className="max-w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Loading Spinner */}
          {isAnalyzing && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center space-y-6">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"></div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Analyzing Your Image
                  </h3>
                  <p className="text-gray-600">
                    {modelLabels[modelName]} is examining your coral reef image for health indicators...
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <div className="flex items-center">
                <span className="text-red-500 text-xl mr-3">⚠️</span>
                <div>
                  <p className="text-red-700 font-medium">Analysis Failed</p>
                  <p className="text-red-600 text-sm mt-1">{error}</p>
                </div>
              </div>
              <div className="mt-4">
                <button
                  onClick={analyzeImage}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Results */}
          {result && (
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Result and Suggestion Cards - 2 Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Result Card - Left Column */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <ResultCard result={result} />
                </motion.div>
                
                {/* Suggestion Card - Right Column */}
                <div>
                  <SuggestionCard result={result} />
                </div>
              </div>
              
              {/* Action Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <button
                  onClick={handleBackToSelection}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 shadow-lg"
                >
                  ← Back to Model Selection
                </button>
                <button
                  onClick={handleTryAnotherModel}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors duration-200 shadow-lg"
                >
                  Analyze Another Image
                </button>
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* Model Information */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
            About {modelLabels[modelName]}
          </h3>
          <div className="text-gray-600 text-center">
            {modelName === 'resnet50' && (
              <p>ResNet-50 is a deep residual network with 50 layers, known for high accuracy in image classification tasks.</p>
            )}
            {modelName === 'mobilenet' && (
              <p>MobileNet is designed for mobile and embedded applications, offering efficient performance with reduced computational requirements.</p>
            )}
            {modelName === 'efficientnet' && (
              <p>EfficientNet provides an optimal balance between model accuracy and computational efficiency through compound scaling.</p>
            )}
            {modelName === 'vgg16' && (
              <p>VGG16 is a classic convolutional neural network architecture with 16 layers, known for its simplicity and effectiveness.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
