import { useState, useEffect, useCallback } from 'react';

function useScroll() {
  const [elVisible, setElVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlEl = useCallback(() => {
    if (typeof window === undefined) return;

    // Hide element on scroll down
    if (window.scrollY > lastScrollY) {
      setElVisible(false);
    } else {
      setElVisible(true);
    }

    setLastScrollY(window.scrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', controlEl);

    return () => window.removeEventListener('scroll', controlEl);
  }, [controlEl]);

  return elVisible;
}

export default useScroll;
