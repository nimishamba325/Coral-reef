const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-800 to-cyan-700 text-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">🌊</span>
              </div>
              <span className="font-bold text-lg">CoralGuard</span>
            </div>
            <p className="text-blue-100">
              Protecting coral reefs through AI-powered health monitoring and analysis.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-blue-100 hover:text-white transition-colors">Home</a></li>
              <li><a href="/predict" className="text-blue-100 hover:text-white transition-colors">Predict</a></li>
              <li><a href="/about" className="text-blue-100 hover:text-white transition-colors">About</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <p className="text-blue-100">
              Email: coralguard.com<br />
            </p>
          </div>
        </div>
        
        <div className="border-t border-blue-600 mt-8 pt-8 text-center">
          <p className="text-blue-100">
            © 2025 CoralGuard. All rights reserved. Protecting our oceans, one coral at a time.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
