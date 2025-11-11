import { motion } from 'framer-motion';

const Bubble = ({ delay = 0, left = '50%', size = 8, duration = 8 }) => {
  return (
    <motion.div
      className="absolute rounded-full bg-white opacity-20 blur-sm"
      style={{
        left,
        width: `${size}px`,
        height: `${size}px`,
        bottom: '-20px',
      }}
      animate={{
        y: [0, typeof window !== 'undefined' ? -window.innerHeight - 100 : -1000],
        x: [0, Math.random() * 40 - 20],
        opacity: [0.2, 0.4, 0.2, 0],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
};

const BubbleField = ({ count = 15 }) => {
  const bubbles = Array.from({ length: count }, (_, i) => ({
    id: i,
    delay: Math.random() * 5,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 8 + 4,
    duration: Math.random() * 5 + 6,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {bubbles.map((bubble) => (
        <Bubble
          key={bubble.id}
          delay={bubble.delay}
          left={bubble.left}
          size={bubble.size}
          duration={bubble.duration}
        />
      ))}
    </div>
  );
};

export default BubbleField;

