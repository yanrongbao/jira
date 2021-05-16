import { useState, useCallback, useReducer } from "react";
import { useMountRef } from "utils";
interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}
const defaultInitialState: State<null> = {
  error: null,
  data: null,
  stat: "idle",
};
const defaultConfig = {
  throwOnError: false,
};
const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountRef = useMountRef();
  return useCallback(
    (...args: T[]) => (mountRef.current ? dispatch(...args) : void 0),
    [mountRef, dispatch]
  );
};
export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };
  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
    {
      ...defaultInitialState,
      ...initialState,
    }
  );
  const safeDispatch = useSafeDispatch(dispatch);
  const [retry, setRetry] = useState(() => () => {});

  const setData = useCallback(
    (data: D) =>
      safeDispatch({
        data,
        stat: "success",
        error: null,
      }),
    [safeDispatch]
  );

  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        data: null,
        error,
        stat: "error",
      }),
    [safeDispatch]
  );

  const run = useCallback(
    (
      promise?: Promise<D>,
      runConfig?: {
        retry: () => Promise<D>;
      }
    ) => {
      if (!promise || !promise.then) {
        throw new Error("请传入 Promise 类型数据");
      }
      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig);
        }
      });
      safeDispatch({ stat: "loading" });
      return promise
        .then((data) => {
          setData(data);
          return data;
        })
        .catch((error) => {
          setError(error);
          if (config.throwOnError) return Promise.reject(error);
          return error;
        });
    },
    [config.throwOnError, safeDispatch, setData, setError]
  );
  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isSuccess: state.stat === "success",
    isError: state.stat === "error",
    run,
    retry,
    setData,
    setError,
    ...state,
  };
};
