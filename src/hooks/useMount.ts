import { isNil } from "lodash";
import { DependencyList, useEffect, useRef } from "react";
import useMediaQuery from "./useMediaQuery";

const useMount = (callback: () => void, deps?: DependencyList) => {
  const deviceType = useMediaQuery();
  const isMount = useRef(false);

  useEffect(
    () => {
      if (isNil(deviceType)) {
        return;
      }
      if (isMount.current) {
        return;
      }

      isMount.current = true;

      callback();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    isNil(deps) ? [] : [...deps]
  );
};

export default useMount;
