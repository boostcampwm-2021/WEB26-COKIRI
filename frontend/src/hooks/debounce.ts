import { DependencyList, useEffect, useRef } from 'react';

const useDebounce = (callback: VoidFunction, delay: number, deps: DependencyList) => {
  const timer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => {
    if (+timer.current! !== 0) {
      clearTimeout(timer.current!);
    }
    timer.current = setTimeout(() => {
      callback();
    }, delay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useDebounce;
