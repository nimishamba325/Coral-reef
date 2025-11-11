import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FloatingBubble = () => {
  return (
    <>
      {/* Floating bubble trigger -> direct navigation */}
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 2.0, ease: 'easeOut' }}
        className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-40"
      >
        <Link to="/protect" aria-label="Learn how to protect coral reefs" className="block relative">
        {/* Optional small depth bubbles */}
        <div className="pointer-events-none absolute -top-6 -left-6 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-300/30 to-blue-300/30 blur-md"></div>
        <div className="pointer-events-none absolute -bottom-5 -right-5 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-200/20 to-blue-200/20 blur-lg"></div>

        {/* Main ocean bubble */}
        <motion.div
          className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full p-[2px] shadow-[0_10px_30px_rgba(34,197,247,0.35)]"
          style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.8), rgba(34,211,238,0.8))' }}
          animate={{ y: [0, -10, 0], rotate: [0, 1, -1, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        >
          <div className="rounded-full w-full h-full bg-white/20 backdrop-blur-md flex items-center justify-center relative overflow-hidden">
            {/* shimmer */}
            <motion.div
              className="absolute -top-10 -left-10 w-24 h-24 rounded-full bg-white/40"
              animate={{ x: [0, 140], y: [0, 140] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
            />
            {/* sweeping shimmer */}
            <motion.div
              className="absolute inset-y-0 -left-1/2 w-[160%]"
              style={{ background: 'linear-gradient(80deg, transparent 35%, rgba(255,255,255,0.35) 50%, transparent 65%)' }}
              animate={{ x: ['-30%', '30%', '-30%'] }}
              transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}
            />

            {/* sparkles */}
            {[
              { top: '18%', left: '22%', size: 8, d: 2.2 },
              { top: '30%', left: '70%', size: 6, d: 1.8 },
              { top: '58%', left: '28%', size: 5, d: 2.6 },
              { top: '66%', left: '62%', size: 7, d: 2.0 },
              { top: '40%', left: '45%', size: 4, d: 1.6 },
              { top: '75%', left: '38%', size: 6, d: 2.8 }
            ].map((s, i) => (
              <motion.span
                key={i}
                className="absolute rounded-full bg-white/80 shadow-[0_0_12px_rgba(255,255,255,0.6)]"
                style={{ top: s.top, left: s.left, width: s.size, height: s.size }}
                initial={{ opacity: 0.4, scale: 0.9 }}
                animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.15, 0.9] }}
                transition={{ repeat: Infinity, duration: s.d, ease: 'easeInOut', delay: i * 0.15 }}
              />
            ))}
            {/* inner glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 via-transparent to-white/10" />

            <div className="relative z-10 text-center px-4 sm:px-6">
              <p className="text-cyan-900 font-extrabold leading-snug text-base sm:text-lg md:text-xl drop-shadow">
                Click to Learn How to Protect Coral Reefs
              </p>
            </div>
          </div>
        </motion.div>
        </Link>
      </motion.div>
    </>
  );
};

export default FloatingBubble;


