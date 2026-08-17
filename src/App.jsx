import React, { useEffect, useState } from 'react'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import ServiceSummary from './sections/ServiceSummary'
import Services from './sections/Services'
import About from './sections/About'
import ReactLenis from 'lenis/react'
import Works from './sections/Works'
import ContactSummary from './sections/ContactSummary'
import Contact from './sections/Contact'
import ProjectShowcase from './components/ProjectShowcase'
import CurtainLoader from './components/CurtainLoader'
import { useProgress } from '@react-three/drei'

const App = () => {
  const { progress } = useProgress();
  const [isReady, setIsReady] = useState(false);
  const [loaderFinished, setLoaderFinished] = useState(false);
  const [activeShowcase, setActiveShowcase] = useState(null);

  useEffect(() => {
    if (progress === 100) {
      setIsReady(true);
    }
  }, [progress]);

  // Handle URL hash changes for showcase navigation e.g. #showcase/expomind
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#showcase/')) {
        const id = hash.replace('#showcase/', '');
        setActiveShowcase(id);
      } else {
        setActiveShowcase(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const openShowcase = (id) => {
    setActiveShowcase(id);
    window.location.hash = `#showcase/${id}`;
  };

  const closeShowcase = () => {
    setActiveShowcase(null);
    if (window.location.hash.startsWith('#showcase/')) {
      window.history.pushState('', document.title, window.location.pathname + window.location.search);
    }
  };

  return (
    <ReactLenis root className='relative w-screen min-h-screen overflow-x-auto'>
      {!loaderFinished && (
        <CurtainLoader
          progress={progress}
          isReady={isReady}
          onComplete={() => setLoaderFinished(true)}
        />
      )}

      <div className="opacity-100">
        <Navbar />
        <Hero />
        <ServiceSummary />
        <Works onOpenShowcase={openShowcase} />
        <Services />
        <About />
        <ContactSummary />
        <Contact />
      </div>

      {activeShowcase && (
        <ProjectShowcase showcaseId={activeShowcase} onClose={closeShowcase} />
      )}
    </ReactLenis>
  )
}

export default App