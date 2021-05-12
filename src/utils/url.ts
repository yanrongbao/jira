import { cleanObject } from "utils";
import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [seaechParams, setSearchParams] = useSearchParams();
  console.log(seaechParams.get("name"));
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { [key]: seaechParams.get(key) || "", ...prev };
        }, {} as { [key in K]: string }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [seaechParams]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      const o = cleanObject({
        ...Object.fromEntries(seaechParams),
        ...params,
      }) as URLSearchParamsInit;
      setSearchParams(o);
    },
  ] as const;
};
