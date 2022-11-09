import { useCallback, useEffect, useState } from "react";
import { DeviceType } from "../types/device";

const useMediaQuery = () => {
  const [deviceType, setDeviceType] = useState<DeviceType | null>(null);

  // init
  useEffect(() => {
    const innerWidth = window.innerWidth;

    if (376 > innerWidth) setDeviceType("MOBILE");
    else if (innerWidth > 376 && 1024 > innerWidth) setDeviceType("TABLET");
    else setDeviceType("PC");
  }, []);

  // media queries
  const mobileMediaQueryList = window.matchMedia(
    "screen and (max-width: 375px)"
  );
  const tabletMediaQueryList = window.matchMedia(
    "screen and (min-width: 376px) and (max-width: 768px)"
  );
  const pcMediaQueryList = window.matchMedia("screen and (min-width: 769px)");

  // function
  const onChangeMobile = useCallback((e: MediaQueryListEvent) => {
    if (e.matches) {
      setDeviceType("MOBILE");
    }
  }, []);
  const onChangeTablet = useCallback((e: MediaQueryListEvent) => {
    if (e.matches) {
      setDeviceType("TABLET");
    }
  }, []);
  const onChangePc = useCallback((e: MediaQueryListEvent) => {
    if (e.matches) {
      setDeviceType("PC");
    }
  }, []);

  // add event
  useEffect(() => {
    mobileMediaQueryList.addEventListener("change", onChangeMobile);
    tabletMediaQueryList.addEventListener("change", onChangeTablet);
    pcMediaQueryList.addEventListener("change", onChangePc);

    return () => {
      mobileMediaQueryList.removeEventListener("change", onChangeMobile);
      tabletMediaQueryList.removeEventListener("change", onChangeTablet);
      pcMediaQueryList.removeEventListener("change", onChangePc);
    };
  }, [mobileMediaQueryList, pcMediaQueryList, tabletMediaQueryList]);

  return deviceType;
};

export default useMediaQuery;
