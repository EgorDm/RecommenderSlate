import { useSelector } from 'react-redux';
import { RootState } from "../store/types";

type Result<S> = S extends (...args: never[]) => infer R ? R : never;

export const useReduxState = <S>(
  selector: S,
  equalityFn?: (left: Result<S>, right: Result<S>) => boolean
): Result<S> => useSelector(selector as any, equalityFn);
