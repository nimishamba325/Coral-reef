import { motion } from 'framer-motion';

const SuggestionCard = ({ result }) => {
  if (!result) return null;

  const isHealthy = result.prediction === 'healthy';
  
  const suggestionData = {
    healthy: {
      title: "Keep Up the Great Work! 🌿",
      subtitle: "Your coral is thriving - let's keep it that way",
      gradient: "from-emerald-100 via-teal-100 to-cyan-100",
      borderColor: "border-emerald-200",
      icon: "🌊",
      tips: [
        {
          icon: "🚫",
          title: "Avoid Harmful Chemicals",
          description: "Use reef-safe sunscreen and avoid products with oxybenzone"
        },
        {
          icon: "🌡️",
          title: "Monitor Water Temperature",
          description: "Keep water temperatures stable to prevent thermal stress"
        },
        {
          icon: "🐠",
          title: "Support Marine Life",
          description: "Maintain healthy fish populations that clean and protect corals"
        },
        {
          icon: "📸",
          title: "Document & Share",
          description: "Take photos to track coral health and inspire others"
        }
      ],
      actionText: "Continue monitoring this healthy coral ecosystem",
      actionColor: "bg-emerald-600 hover:bg-emerald-700"
    },
    bleached: {
      title: "Urgent Action Needed 🆘",
      subtitle: "This coral needs immediate care - every moment counts",
      gradient: "from-red-100 via-orange-100 to-amber-100",
      borderColor: "border-red-200",
      icon: "⚠️",
      tips: [
        {
          icon: "🌡️",
          title: "Reduce Heat Stress",
          description: "Provide shade or improve water circulation immediately"
        },
        {
          icon: "💧",
          title: "Improve Water Quality",
          description: "Test and adjust pH, salinity, and nutrient levels"
        },
        {
          icon: "🔬",
          title: "Monitor Closely",
          description: "Check daily for signs of recovery or further deterioration"
        },
        {
          icon: "🏥",
          title: "Consider Intervention",
          description: "Consult marine biologists for potential treatment options"
        }
      ],
      actionText: "Take immediate action to save this coral",
      actionColor: "bg-red-600 hover:bg-red-700"
    }
  };

  const data = isHealthy ? suggestionData.healthy : suggestionData.bleached;

  return (
    <motion.div
      className={`bg-gradient-to-br ${data.gradient} rounded-2xl shadow-lg border-2 ${data.borderColor} p-6 h-full`}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="text-6xl mb-4">{data.icon}</div>
          <h3 className="text-4xl font-bold text-gray-800 mb-4">
            {data.title}
          </h3>
          <p className="text-gray-700 font-semibold text-xl">
            {data.subtitle}
          </p>
        </div>

        {/* Tips Section */}
        <div className="space-y-6">
          <h4 className="text-2xl font-bold text-gray-800 text-center">
            {isHealthy ? "Preservation Tips" : "Recovery Actions"}
          </h4>
          
          <div className="space-y-5">
            {data.tips.map((tip, index) => (
              <motion.div
                key={index}
                className="bg-white/70 rounded-xl p-6 backdrop-blur-sm border border-white/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
              >
                <div className="flex items-start space-x-5">
                  <span className="text-4xl flex-shrink-0">{tip.icon}</span>
                  <div>
                    <h5 className="font-bold text-gray-800 text-lg mb-3">
                      {tip.title}
                    </h5>
                    <p className="text-gray-700 text-base leading-relaxed">
                      {tip.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>


        {/* Additional Info */}
        <motion.div
          className="bg-white/50 rounded-xl p-6 text-center border border-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.4 }}
        >
          <p className="text-base text-gray-700 font-semibold">
            {isHealthy 
              ? "Healthy corals support 25% of all marine species 🐠" 
              : "Coral bleaching affects 50% of shallow-water corals globally 🌍"
            }
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SuggestionCard;
