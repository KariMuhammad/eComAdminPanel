import { useEffect, useState } from "react";

type ScreenSizeType = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "";

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState<ScreenSizeType>("");

  useEffect(() => {
    const handleScreenSize = () => {
      if (window.innerWidth >= 1536) setScreenSize("2xl");
      else if (window.innerWidth >= 1280) setScreenSize("xl");
      else if (window.innerWidth >= 1024) setScreenSize("lg");
      else if (window.innerWidth >= 768) setScreenSize("md");
      else if (window.innerWidth >= 640) setScreenSize("sm");
      else setScreenSize("xs");
    };

    window.addEventListener("resize", handleScreenSize);

    return () => window.removeEventListener("resize", handleScreenSize);
  }, []);

  return {
    screenSize,
  };
};

export default useScreenSize;

/**
 * const match = window.matchMedia('(min-width: 800px)')
    match.addEventListener('change', (e) => {
    const isMd = e.matches;
    // ...
});
 */
