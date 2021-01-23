import { useEffect, useRef } from 'react';

// Clever bit of code from: https://stackoverflow.com/a/53446665/2303432
export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
