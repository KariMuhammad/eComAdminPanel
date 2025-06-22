import { useEffect, useState } from "react";

const useMatchMedia = (media: string) => {
  const [matched, setMatched] = useState(false);
  const handleMediaChange = (ev: MediaQueryListEvent) => {
    setMatched(ev.matches);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia(media);
    setMatched(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleMediaChange);

    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  console.log("Match Query", matched);

  return {
    matched,
  };
};

export default useMatchMedia;
