import { useCallback, useReducer } from "react";

const UNDO = "UNDO";
const REDO = "REDO";
const SET = "SET";
const RESET = "RESET";

type State<T> = {
  past: T[];
  feature: T[];
  present: T;
};
type Action<T> = {
  newPresent?: T;
  type: typeof UNDO | typeof REDO | typeof SET | typeof RESET;
};
const undoReducer = <T>(state: State<T>, action: Action<T>) => {
  const { past, present, feature } = state;
  const { newPresent, type } = action;
  switch (type) {
    case UNDO:
      if (past.length === 0) return state;
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      return {
        present: previous,
        past: newPast,
        feature: [present, ...feature],
      };
    case REDO:
      if (feature.length === 0) return state;
      const next = feature[0];
      const newFeature = feature.slice(1);
      return {
        present: next,
        past: [...past, present],
        feature: newFeature,
      };
    case SET:
      if (newPresent === present) return state;
      return {
        present: newPresent,
        past: [...past, present],
        feature,
      };
    case RESET:
      return {
        past: [],
        present: newPresent,
        feature: [],
      };
    default:
      break;
  }
  return state;
};

export const useUndo = <T>(initialValue: T) => {
  const [state, dispath] = useReducer(undoReducer, {
    past: [],
    present: initialValue,
    feature: [],
  } as State<T>);

  const canUndo = state.past.length !== 0;
  const canRedo = state.feature.length !== 0;

  const undo = useCallback(() => dispath({ type: UNDO }), []);

  const redo = useCallback(() => dispath({ type: REDO }), []);

  const set = useCallback(
    (newPresent: T) => dispath({ type: SET, newPresent }),
    []
  );

  const reset = useCallback((newPresent: T) => dispath({ type: RESET }), []);

  return [state, { set, undo, redo, reset, canRedo, canUndo }];
};
