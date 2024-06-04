import { useEffect, useState } from "react";

interface WindowDimentions {
  width: number | undefined;
  height: number | undefined;
}
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowDimentions>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}
