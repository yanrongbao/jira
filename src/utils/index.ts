import { useEffect, useRef, useState } from "react";

export const isFasly = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

export const cleanObject = (obj: { [key: string]: unknown }) => {
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    if (isVoid(result[key])) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounceValue;
};

export const useArray = <T>(array: T[]) => {
  const [value, setValue] = useState(array);

  const add = (item: T) => {
    const newArray = [...value, item];
    setValue(newArray);
  };

  const clear = () => {
    setValue([]);
  };

  const removeIndex = (number: number) => {
    const newArray = [...value].splice(number, 1);
    setValue(newArray);
  };

  return {
    value,
    add,
    clear,
    removeIndex,
  };
};

export const useDocumentTitle = (
  title: string,
  keepOnMount: boolean = true
) => {
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnMount) {
        document.title = oldTitle;
      }
    };
  }, [oldTitle, keepOnMount]);
};

export const resetRoute = () => (window.location.href = window.location.origin);

export const useMountRef = () => {
  const mounfRef = useRef(false);

  useEffect(() => {
    mounfRef.current = true;
    return () => {
      mounfRef.current = false;
    };
  });

  return mounfRef;
};
