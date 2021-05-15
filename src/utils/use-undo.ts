import { useCallback } from "react";
import { useState } from "react";

export const useUndo = <T>(initialValue: T) => {
  const [past, setPast] = useState<T[]>([]);
  const [present, setPresent] = useState(initialValue);
  const [feature, setFeature] = useState<T[]>([]);

  const [state, setState] = useState<{
    past: T[];
    feature: T[];
    present: T;
  }>({
    past: [],
    present: initialValue,
    feature: [],
  });

  const canUndo = past.length !== 0;
  const canRedo = feature.length !== 0;

  const undo = useCallback(() => {
    setState((prevState) => {
      const { past, present, feature } = prevState;

      if (past.length === 0) return prevState;
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      return {
        present: previous,
        past: newPast,
        feature: [present, ...feature],
      };
    });
  }, []);

  const redo = useCallback(() => {
    setState((prevState) => {
      const { past, present, feature } = prevState;

      if (feature.length === 0) return prevState;
      const next = feature[0];
      const newFeature = feature.slice(1);
      return {
        present: next,
        past: [...past, present],
        feature: newFeature,
      };
    });
  }, []);

  const set = useCallback((newPresent: T) => {
    setState((prevState) => {
      const { past, present, feature } = prevState;

      if (newPresent === present) return prevState;
      return {
        present: newPresent,
        past: [...past, present],
        feature,
      };
    });
  }, []);

  const reset = useCallback((newPresent: T) => {
    setPast([]);
    setPresent(newPresent);
    setFeature([]);
    return {
      past: [],
      present: newPresent,
      feature: [],
    };
  }, []);

  return [
    { past, present, feature },
    { set, undo, redo, reset, canRedo, canUndo },
  ];
};
