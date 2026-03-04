import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShow(false);
            onComplete?.();
          }, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="loading-screen"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          data-testid="loading-screen"
        >
          <svg width="280" height="100" viewBox="0 0 280 100" className="overflow-visible">
            <text
              x="50%"
              y="65"
              textAnchor="middle"
              className="loading-logo-text"
              fill="none"
              stroke="#B8860B"
              strokeWidth="1"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '72px',
                fontStyle: 'italic',
                strokeDasharray: 600,
                strokeDashoffset: 600,
                animation: 'dash 2s ease-in-out forwards',
              }}
            >
              kkemi
            </text>
            <text
              x="50%"
              y="65"
              textAnchor="middle"
              className="loading-logo-text"
              fill="#FAF8F5"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '72px',
                fontStyle: 'italic',
                opacity: progress > 60 ? 1 : 0,
                transition: 'opacity 0.6s ease',
              }}
            >
              kkemi
            </text>
          </svg>
          <div className="loading-progress">
            <div
              className="loading-progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
