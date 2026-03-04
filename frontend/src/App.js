import { useState, useCallback } from 'react';
import '@/App.css';
import { LanguageProvider } from '@/context/LanguageContext';
import LoadingScreen from '@/components/LoadingScreen';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import About from '@/components/About';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Occasions from '@/components/Occasions';
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import CookieBanner from '@/components/CookieBanner';

function App() {
  const [loaded, setLoaded] = useState(false);
  const handleLoadComplete = useCallback(() => setLoaded(true), []);

  return (
    <LanguageProvider>
      <div className="App" data-testid="app-root">
        <LoadingScreen onComplete={handleLoadComplete} />

        {loaded && (
          <>
            <CustomCursor />
            <ScrollProgress />
            <div className="grain-overlay" />
            <Navbar />
            <main>
              <Hero />
              <Marquee />
              <About />
              <Services />
              <Portfolio />
              <Occasions />
              <Process />
              <Testimonials />
              <Contact />
            </main>
            <Footer />
            <WhatsAppButton />
            <CookieBanner />
          </>
        )}
      </div>
    </LanguageProvider>
  );
}

export default App;
