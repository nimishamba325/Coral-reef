import { motion } from 'framer-motion';

const FishIcon = ({ className = '', delay = 0, size = 'w-16 h-16', color = 'text-blue-400' }) => {
  return (
    <motion.div
      className={`${className} ${color}`}
      initial={{ opacity: 0, x: -50 }}
      animate={{
        opacity: [0.2, 0.4, 0.2],
        x: [0, 20, 0],
        y: [0, -10, 0],
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <svg
        className={size}
        viewBox="0 0 100 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Fish body */}
        <ellipse cx="50" cy="30" rx="30" ry="15" fill="currentColor" opacity="0.6" />
        {/* Fish tail */}
        <path
          d="M20 30 L5 20 L5 25 L20 30 Z"
          fill="currentColor"
          opacity="0.6"
        />
        <path
          d="M20 30 L5 35 L5 40 L20 30 Z"
          fill="currentColor"
          opacity="0.6"
        />
        {/* Fish eye */}
        <circle cx="65" cy="25" r="4" fill="white" opacity="0.8" />
        <circle cx="66" cy="24" r="2" fill="currentColor" opacity="0.9" />
      </svg>
    </motion.div>
  );
};

export default FishIcon;

