import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import UnderwaterBackground from '../components/UnderwaterBackground';
import BubbleField from '../components/Bubble';
import CoralIcon from '../components/CoralIcon';
import FishIcon from '../components/FishIcon';

const Protect = () => {
  const handleButtonClick = (e) => {
    const ripple = document.createElement('span');
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add('ripple');
    
    e.currentTarget.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  };

  const healthyTips = [
    'Reduce nutrient runoff: use eco‑friendly fertilizers and manage waste.',
    'Limit physical contact: avoid anchoring or stepping on reefs.',
    'Support marine protected areas and responsible tourism.',
    'Minimize carbon footprint to reduce ocean warming.',
    'Report invasive species or coral disease sightings.',
  ];

  const bleachedTips = [
    'Reduce local stressors: control pollution and sedimentation.',
    'Temporarily restrict fishing and boating near affected areas.',
    'Monitor temperature and bleaching extent to guide action.',
    'Support coral gardening and restoration initiatives.',
    'Engage community education to prevent further damage.',
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Underwater Background */}
      <UnderwaterBackground />
      
      {/* Bubble particles */}
      <BubbleField count={20} />
      
      {/* Background coral and fish decorations */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <CoralIcon 
          className="absolute top-20 left-10 text-cyan-300 opacity-20" 
          delay={0} 
          size="w-24 h-24"
        />
        <CoralIcon className="absolute top-40 right-16 text-blue-300 opacity-15" delay={1} size="w-20 h-20" />
        <CoralIcon className="absolute bottom-32 left-20 text-teal-300 opacity-20" delay={2} size="w-28 h-28" />
        <CoralIcon className="absolute bottom-20 right-24 text-cyan-300 opacity-15" delay={1.5} size="w-22 h-22" />
        <FishIcon className="absolute top-1/3 left-1/4 text-blue-400 opacity-15" delay={0.5} size="w-20 h-12" />
        <FishIcon className="absolute bottom-1/3 right-1/3 text-cyan-400 opacity-12" delay={2.5} size="w-24 h-14" />
        <FishIcon className="absolute top-1/2 right-1/4 text-teal-400 opacity-10" delay={1.2} size="w-18 h-10" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 bg-clip-text text-transparent drop-shadow-lg">
            Protecting Coral Reefs
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 text-lg md:text-xl text-blue-900/80 font-medium"
          >
            Practical guidance for maintaining healthy reefs and helping bleached reefs recover.
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2 mb-12">
          {/* Healthy Coral Reefs Card */}
          <motion.section
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative group"
          >
            {/* Card Glow Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 rounded-3xl opacity-0 group-hover:opacity-75 blur-xl transition-opacity duration-500" />
            
            {/* Glassmorphism Card */}
            <div className="relative rounded-3xl p-6 sm:p-8 backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl">
              {/* Coral Icon Above */}
              <div className="flex justify-center mb-4">
                <CoralIcon 
                  className="text-cyan-400" 
                  delay={0} 
                  size="w-16 h-16"
                />
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4 text-center">
                For Healthy Coral Reefs
              </h2>
              <p className="text-blue-800/90 mb-6 text-center font-medium">Tips to Maintain Coral Health</p>
              
              <ul className="space-y-3">
                {healthyTips.map((tip, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="flex items-start text-blue-900/90"
                  >
                    <span className="text-cyan-500 mr-3 mt-1.5">🐠</span>
                    <span className="leading-relaxed">{tip}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.section>

          {/* Bleached Coral Reefs Card */}
          <motion.section
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative group"
          >
            {/* Card Glow Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 rounded-3xl opacity-0 group-hover:opacity-75 blur-xl transition-opacity duration-500" />
            
            {/* Glassmorphism Card */}
            <div className="relative rounded-3xl p-6 sm:p-8 backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl">
              {/* Coral Icon Above */}
              <div className="flex justify-center mb-4">
                <CoralIcon 
                  className="text-teal-400" 
                  delay={1} 
                  size="w-16 h-16"
                />
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-teal-900 mb-4 text-center">
                For Bleached Coral Reefs
              </h2>
              <p className="text-teal-800/90 mb-6 text-center font-medium">Steps to Help Coral Recovery</p>
              
              <ul className="space-y-3">
                {bleachedTips.map((tip, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="flex items-start text-teal-900/90"
                  >
                    <span className="text-teal-500 mr-3 mt-1.5">🌊</span>
                    <span className="leading-relaxed">{tip}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.section>
        </div>

        {/* Back to Home Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex justify-center"
        >
          <Link
            to="/"
            onClick={handleButtonClick}
            className="relative inline-block overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500/80 via-cyan-500/80 to-teal-500/80 backdrop-blur-md text-white px-8 py-4 font-bold text-lg shadow-2xl border border-white/30 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(59,130,246,0.8)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              ← Back to Home
            </span>
            
            {/* Ripple effect styles */}
            <style>{`
              .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple-animation 0.6s ease-out;
                pointer-events: none;
              }
              @keyframes ripple-animation {
                to {
                  transform: scale(4);
                  opacity: 0;
                }
              }
            `}</style>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Protect;


