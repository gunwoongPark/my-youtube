import { useState, useEffect } from "react";

export interface UseMediaQueriesProps {
  breakpoint: number;
}

const useMediaQueries = ({ breakpoint }: UseMediaQueriesProps) => {
  const [mediaQuery, setmediaQuery] = useState<Partial<MediaQueryListEvent>>({
    matches: window.innerWidth < breakpoint ? true : false,
    media: "",
  });

  useEffect(() => {
    const mediaQueryList = matchMedia(`(max-width: ${breakpoint}px)`);

    const changeHandler = (e: MediaQueryListEvent) => {
      setmediaQuery(e);
    };

    // for chrome, firefox and modern browsers
    try {
      mediaQueryList.addEventListener("change", changeHandler);
    } catch (error) {
      console.error(error);
    }

    return () => {
      mediaQueryList.removeEventListener("change", changeHandler);
    };
  }, []);

  return {
    mediaQuery,
  };
};

export default useMediaQueries;
