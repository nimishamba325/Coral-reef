import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ImageProvider } from './context/ImageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Predict from './pages/Predict';
import Result from './pages/Result';
import About from './pages/About';
import Protect from './pages/Protect';

function App() {
  return (
    <ImageProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/predict" element={<Predict />} />
              <Route path="/result/:modelName" element={<Result />} />
              <Route path="/about" element={<About />} />
              <Route path="/protect" element={<Protect />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ImageProvider>
  );
}

export default App;
