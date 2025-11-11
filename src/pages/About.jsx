const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About CoralGuard
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Protecting coral reefs through cutting-edge AI technology and marine conservation expertise.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                Coral reefs are the rainforests of the sea, supporting 25% of all marine life. 
                However, they face unprecedented threats from climate change, pollution, and 
                human activities. CoralGuard uses artificial intelligence to help marine 
                biologists, researchers, and conservationists monitor coral health in real-time.
              </p>
              <p className="text-lg text-gray-600">
                Our goal is to make coral reef monitoring accessible, accurate, and actionable 
                for everyone working to protect these vital ecosystems.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl p-8 text-center">
              <div className="text-6xl mb-4">🌊</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Protecting Our Oceans</h3>
              <p className="text-gray-600">
                Every coral reef matters. Together, we can make a difference.
              </p>
            </div>
          </div>
        </div>

        {/* Technology Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Technology</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧠</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Deep Learning</h3>
              <p className="text-gray-600">
                Advanced neural networks trained on thousands of coral reef images 
                to identify health patterns and bleaching indicators.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📸</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Image Analysis</h3>
              <p className="text-gray-600">
                Computer vision algorithms that analyze color, texture, 
                and structural patterns to assess coral health.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Data Insights</h3>
              <p className="text-gray-600">
                Comprehensive reporting with confidence scores and detailed 
                health assessments for informed decision-making.
              </p>
            </div>
          </div>
        </div>


        {/* Contact Section */}
        <div className="mt-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-lg text-gray-600 mb-6">
            Have questions about coral reef monitoring or want to collaborate?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:info@coralguard.com"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              Contact Us
            </a>
            <a
              href="/predict"
              className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-all duration-200"
            >
              Try CoralGuard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
