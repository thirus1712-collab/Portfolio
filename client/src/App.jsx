import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

export default function App() {
  useEffect(() => {
    // Optional preload of portfolio dynamic data
    fetch('/api/portfolio')
      .then((res) => res.json())
      .catch((err) => console.log('Using local client seed data:', err.message));
  }, []);

  return (
    <div className="app-wrapper">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
