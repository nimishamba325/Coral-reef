import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg relative overflow-hidden">
      {/* Animated background waves */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="wave-animation"></div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-blue-600 font-bold text-xl animate-pulse">🌊</span>
              </div>
              <span className="text-white font-bold text-2xl group-hover:text-cyan-200 transition-colors duration-300">
                CoralGuard
              </span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <Link
                to="/"
                className={`relative px-4 py-3 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                  location.pathname === '/' 
                    ? 'text-white bg-white/20 shadow-lg' 
                    : 'text-white hover:bg-white/10 hover:text-cyan-100'
                }`}
              >
                <span className="relative z-10">Home</span>
                {location.pathname === '/' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-cyan-400/20 rounded-lg animate-pulse"></div>
                )}
              </Link>
              <Link
                to="/predict"
                className={`relative px-4 py-3 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                  location.pathname === '/predict' 
                    ? 'text-white bg-white/20 shadow-lg' 
                    : 'text-white hover:bg-white/10 hover:text-cyan-100'
                }`}
              >
                <span className="relative z-10">Predict</span>
                {location.pathname === '/predict' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-cyan-400/20 rounded-lg animate-pulse"></div>
                )}
              </Link>
              <Link
                to="/about"
                className={`relative px-4 py-3 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                  location.pathname === '/about' 
                    ? 'text-white bg-white/20 shadow-lg' 
                    : 'text-white hover:bg-white/10 hover:text-cyan-100'
                }`}
              >
                <span className="relative z-10">About</span>
                {location.pathname === '/about' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-cyan-400/20 rounded-lg animate-pulse"></div>
                )}
              </Link>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-white hover:text-cyan-200 focus:outline-none focus:text-cyan-200 transition-colors duration-300 transform hover:scale-110">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
