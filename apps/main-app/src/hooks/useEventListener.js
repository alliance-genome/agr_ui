import { useEffect } from 'react';

export default function useEventListener(ref, type, listener) {
  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener(type, listener);
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener(type, listener);
      }
    };
  }, [ref, type, listener]);
}
