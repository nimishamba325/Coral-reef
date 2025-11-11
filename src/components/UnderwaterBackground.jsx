import { motion } from 'framer-motion';

const UnderwaterBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-100 via-cyan-100 to-teal-100"
        animate={{
          background: [
            'linear-gradient(135deg, #dbeafe 0%, #cffafe 50%, #ccfbf1 100%)',
            'linear-gradient(135deg, #e0f2fe 0%, #d0f4f0 50%, #d1fae5 100%)',
            'linear-gradient(135deg, #dbeafe 0%, #cffafe 50%, #ccfbf1 100%)',
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Animated wave overlay */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
          backgroundSize: '200% 200%',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {/* Subtle light rays from surface */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

export default UnderwaterBackground;

