import { useEffect, useState } from "react";
import { DeviceType } from "../types/type";

const useMediaQuery = () => {
  // state
  const [deviceType, setDeviceType] = useState<DeviceType | null>(null);

  // useEffect
  useEffect(() => {
    const innerWidth = window.innerWidth;

    if (376 > innerWidth) setDeviceType("MOBILE");
    else if (innerWidth > 376 && 1024 > innerWidth) setDeviceType("TABLET");
    else setDeviceType("PC");

    window.addEventListener("resize", onResizeWindow);

    return () => window.removeEventListener("resize", onResizeWindow);
  }, []);

  // function
  const onResizeWindow = (e: UIEvent) => {
    const target = e.target as Window;

    if (target.innerWidth < 376) setDeviceType("MOBILE");
    else if (target.innerWidth > 375 && 769 > target.innerWidth)
      setDeviceType("TABLET");
    else setDeviceType("PC");
  };

  return deviceType;
};

export default useMediaQuery;
