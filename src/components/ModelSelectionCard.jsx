import { motion } from 'framer-motion';
import { useState } from 'react';

const ModelSelectionCard = ({ model, onSelect, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const modelIcons = {
    resnet50: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    mobilenet: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
        <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2"/>
        <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    efficientnet: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" stroke="currentColor" strokeWidth="2" fill="none"/>
        <polygon points="12,7 18,10.5 18,13.5 12,17 6,13.5 6,10.5" stroke="currentColor" strokeWidth="2" fill="none"/>
      </svg>
    ),
    vgg16: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
        <rect x="7" y="7" width="10" height="10" rx="1" ry="1" stroke="currentColor" strokeWidth="2"/>
        <rect x="9" y="9" width="6" height="6" rx="1" ry="1" stroke="currentColor" strokeWidth="2"/>
      </svg>
    )
  };

  const modelGradients = {
    resnet50: 'from-blue-200 via-purple-200 to-pink-200',
    mobilenet: 'from-emerald-200 via-cyan-200 to-blue-200',
    efficientnet: 'from-amber-200 via-orange-200 to-rose-200',
    vgg16: 'from-violet-200 via-fuchsia-200 to-pink-200'
  };

  const modelDescriptions = {
    resnet50: {
      title: 'Deep Residual Network',
      description: 'State-of-the-art architecture with skip connections for training very deep networks. Excellent for high-accuracy image classification.',
      features: ['50 layers deep', 'Skip connections', 'High accuracy', 'Robust performance']
    },
    mobilenet: {
      title: 'Mobile-Optimized Network',
      description: 'Lightweight architecture designed for mobile and edge devices. Fast inference with minimal computational requirements.',
      features: ['Lightweight design', 'Fast inference', 'Mobile-optimized', 'Low memory usage']
    },
    efficientnet: {
      title: 'Efficient Scaling Network',
      description: 'Compound scaling method that uniformly scales network width, depth, and resolution for optimal efficiency.',
      features: ['Compound scaling', 'Balanced efficiency', 'SOTA accuracy', 'Resource efficient']
    },
    vgg16: {
      title: 'Visual Geometry Group',
      description: 'Classic deep CNN architecture with small receptive fields. Simple yet effective for image classification tasks.',
      features: ['16 weight layers', 'Simple architecture', 'Proven reliability', 'Transfer learning']
    }
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.button
        onClick={() => onSelect(model.name)}
        className={`relative w-full h-52 rounded-2xl bg-gradient-to-br ${modelGradients[model.name]} p-8 text-gray-700 shadow-xl overflow-hidden group focus:outline-none focus:ring-4 focus:ring-gray-300/50`}
        whileHover={{ 
          scale: 1.05,
          y: -8,
          transition: { type: "spring", stiffness: 300, damping: 20 }
        }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-12">
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white transform translate-x-10 -translate-y-10"></div>
          <div className="absolute bottom-0 left-0 w-30 h-30 rounded-full bg-white transform -translate-x-5 translate-y-5"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="text-gray-600 transform scale-125">
              {modelIcons[model.name]}
            </div>
            <motion.div
              className={`${
                model.name === 'resnet50' ? 'text-blue-600' :
                model.name === 'mobilenet' ? 'text-emerald-600' :
                model.name === 'efficientnet' ? 'text-amber-600' :
                'text-violet-600'
              }`}
              animate={{ rotate: isHovered ? 45 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg className="w-8 h-8" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.div>
          </div>

          <div className="text-left">
            <h3 className="text-2xl font-bold mb-2 text-gray-800">{model.label}</h3>
            <p className="text-gray-600 text-base font-semibold">{model.description}</p>
          </div>
        </div>

        {/* Shine Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
          initial={{ x: '-100%' }}
          animate={{ x: isHovered ? '100%' : '-100%' }}
          transition={{ duration: 0.6 }}
        />
      </motion.button>

      {/* Hover Description Popup */}
      <motion.div
        className="absolute z-50 top-full left-1/2 transform -translate-x-1/2 mt-6 w-[420px] bg-white rounded-2xl shadow-2xl border border-gray-200 p-8"
        initial={{ opacity: 0, y: 15, scale: 0.9 }}
        animate={{ 
          opacity: isHovered ? 1 : 0, 
          y: isHovered ? 0 : 15,
          scale: isHovered ? 1 : 0.9
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ pointerEvents: isHovered ? 'auto' : 'none' }}
      >
        {/* Arrow */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-l border-t border-gray-200 rotate-45"></div>
        
        <div className="space-y-5">
          <div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">
              {modelDescriptions[model.name].title}
            </h4>
            <p className="text-gray-600 text-base leading-relaxed">
              {modelDescriptions[model.name].description}
            </p>
          </div>
          
          <div>
            <h5 className="text-base font-semibold text-gray-800 mb-3">Key Features:</h5>
            <div className="grid grid-cols-2 gap-3">
              {modelDescriptions[model.name].features.map((feature, idx) => (
                <div key={idx} className="flex items-center text-sm text-gray-600">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${modelGradients[model.name]} mr-3 flex-shrink-0`}></div>
                  {feature}
                </div>
              ))}
            </div>
          </div>
          
          <div className="pt-3 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center font-medium">
              Click to analyze with {model.label}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ModelSelectionCard;
