import { useEffect, useRef } from 'react';

const useIntersectionObserver = (callback: () => void) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const ref = useRef<HTMLDivElement | null>(null);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      },
      { threshold: 1 },
    );
    observer.observe(ref.current!);
    return () => observer.disconnect();
  }, []);
  return { ref };
};

export default useIntersectionObserver;
