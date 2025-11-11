import { useNavigate } from 'react-router-dom';
import { useImage } from '../context/ImageContext';
import { motion } from 'framer-motion';
import UploadBox from '../components/UploadBox';
import ModelSelectionCard from '../components/ModelSelectionCard';

const Predict = () => {
  const navigate = useNavigate();
  const { selectedImage, selectImage, clearImage } = useImage();

  const handleImageSelect = (file) => {
    selectImage(file);
  };

  const handleModelSelect = (modelName) => {
    if (!selectedImage) return;
    navigate(`/result/${modelName}`);
  };

  const models = [
    { name: 'resnet50', label: 'ResNet-50', description: 'Deep residual network for high accuracy' },
    { name: 'mobilenet', label: 'MobileNet', description: 'Lightweight model for fast inference' },
    { name: 'efficientnet', label: 'EfficientNet', description: 'Balanced efficiency and accuracy' },
    { name: 'vgg16', label: 'VGG16', description: 'Classic convolutional neural network' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Coral Health Analysis
          </h1>
          <p className="text-xl text-gray-600">
            Upload a coral reef image to get an instant health assessment
          </p>
        </div>

        <div className="space-y-8">
          {/* Upload Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Upload Your Image
            </h2>
            <UploadBox onImageSelect={handleImageSelect} selectedImage={selectedImage} />
          </div>

          {/* Model Selection */}
          {selectedImage && (
            <motion.div 
              className="bg-white rounded-2xl shadow-lg p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
                  Choose Your AI Model
                </h2>
                <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                  Select from our collection of state-of-the-art neural networks, each optimized for different aspects of coral health analysis
                </p>
              </motion.div>
              
              {/* Responsive Grid: 2x2 on desktop, 1x4 on mobile */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
                {models.map((model, index) => (
                  <ModelSelectionCard
                    key={model.name}
                    model={model}
                    onSelect={handleModelSelect}
                    index={index}
                  />
                ))}
              </div>
              
              <motion.div 
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <button
                  onClick={clearImage}
                  className="inline-flex items-center text-gray-500 hover:text-gray-700 font-medium transition-colors duration-200 group"
                >
                  <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Upload Different Image
                </button>
              </motion.div>
            </motion.div>
          )}

        </div>

        {/* Instructions */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Upload Image</h4>
              <p className="text-sm text-gray-600">
                Upload a clear photo of your coral reef
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Choose Model</h4>
              <p className="text-sm text-gray-600">
                Select from four different AI models for analysis
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Get Results</h4>
              <p className="text-sm text-gray-600">
                Receive instant health assessment with confidence score
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Predict;