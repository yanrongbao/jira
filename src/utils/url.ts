import { cleanObject } from "utils";
import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [seaechParams] = useSearchParams();
  const setSearchParams = useSetUrlSearchParams();
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
      return setSearchParams(params);
    },
  ] as const;
};

export const useSetUrlSearchParams = () => {
  const [searchParams, setSearchPatams] = useSearchParams();
  return (params: { [key in string]: unknown }) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    return setSearchPatams(o);
  };
};
