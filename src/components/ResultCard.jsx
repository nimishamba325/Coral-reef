import HealthChart from './HealthChart';

const ResultCard = ({ result }) => {
  if (!result) return null;

  const isHealthy = result.prediction === 'healthy';
  const confidence = (result.confidence * 100).toFixed(1);
  const healthyPercent = isHealthy ? Number(confidence) : 100 - Number(confidence);

  return (
    <div className="w-full mx-auto">
      <div className={`rounded-2xl shadow-xl p-8 transition-all duration-500 ${
        isHealthy 
          ? 'bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-200' 
          : 'bg-gradient-to-br from-red-50 to-orange-100 border-2 border-red-200'
      }`}>
        <div className="text-center space-y-6">
          <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${
            isHealthy ? 'bg-green-100' : 'bg-red-100'
          }`}>
            <span className="text-5xl">
              {isHealthy ? '🌿' : '⚠️'}
            </span>
          </div>
          
          <div>
            <h3 className={`text-4xl font-bold mb-3 ${
              isHealthy ? 'text-green-800' : 'text-red-800'
            }`}>
              {isHealthy ? 'Healthy Coral' : 'Bleached Coral'}
            </h3>
            <p className={`text-2xl font-semibold ${
              isHealthy ? 'text-green-600' : 'text-red-600'
            }`}>
              Confidence: {confidence}%
            </p>
          </div>
          
          <div className={`p-6 rounded-xl ${
            isHealthy 
              ? 'bg-green-200 text-green-800' 
              : 'bg-red-200 text-red-800'
          }`}>
            <p className="font-semibold text-lg leading-relaxed">
              {isHealthy 
                ? 'This coral appears to be in good health with vibrant colors and structure.'
                : 'This coral shows signs of bleaching and may need immediate attention.'
              }
            </p>
          </div>

          <div className="rounded-2xl p-6 bg-green-50 shadow-md">
            <HealthChart healthyPercent={healthyPercent} data={{ healthy: healthyPercent, bleached: 100 - healthyPercent }} />
          </div>
          
          <div className="text-base text-gray-600 space-y-1">
            <p className="font-medium">File: {result.filename}</p>
            <p className="font-medium">Analysis completed at: {new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
