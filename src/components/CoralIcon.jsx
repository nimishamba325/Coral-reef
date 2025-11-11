import { motion } from 'framer-motion';

const CoralIcon = ({ className = '', delay = 0, size = 'w-12 h-12' }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: [0.3, 0.6, 0.3],
        y: [0, -15, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <svg
        className={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Coral branches */}
        <path
          d="M50 20 L45 35 L50 40 L55 35 Z"
          fill="currentColor"
          opacity="0.8"
        />
        <path
          d="M50 30 L40 50 L50 55 L60 50 Z"
          fill="currentColor"
          opacity="0.8"
        />
        <path
          d="M50 50 L35 70 L50 75 L65 70 Z"
          fill="currentColor"
          opacity="0.8"
        />
        <path
          d="M50 70 L30 85 L50 90 L70 85 Z"
          fill="currentColor"
          opacity="0.8"
        />
        {/* Side branches */}
        <path
          d="M30 60 L35 70 L30 65 Z"
          fill="currentColor"
          opacity="0.7"
        />
        <path
          d="M70 60 L65 70 L70 65 Z"
          fill="currentColor"
          opacity="0.7"
        />
      </svg>
    </motion.div>
  );
};

export default CoralIcon;

