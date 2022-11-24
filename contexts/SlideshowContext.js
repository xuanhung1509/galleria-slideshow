import { useRouter } from 'next/router';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const SlideshowContext = createContext(null);

function useSlideshowContext() {
  return useContext(SlideshowContext);
}

function SlideshowProvider({ total, children }) {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);

  const navigate = useCallback(() => {
    const currId = +router.query.id;

    if (currId) {
      router.push(`${currId < total ? currId + 1 : 1}`);
    } else {
      router.push('/1');
    }
  }, [router, total]);

  const handleToggle = useCallback(() => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      navigate();
    }
  }, [isPlaying, navigate]);

  const ctxValue = useMemo(
    () => ({
      isPlaying,
      handleToggle,
    }),
    [isPlaying, handleToggle]
  );

  useEffect(() => {
    if (!isPlaying) return;

    setTimeout(navigate, 5000);
  }, [isPlaying, navigate]);

  return (
    <SlideshowContext.Provider value={ctxValue}>
      {children}
    </SlideshowContext.Provider>
  );
}

export { useSlideshowContext, SlideshowProvider };
