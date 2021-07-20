import { ActionsUnion, createAction } from "@martin_hotell/rex-tils";
import { KNNState } from "./types";

export const ACTION_KNN_UPDATE = 'KNN.UPDATE';
export const ACTION_KNN_ADD = 'KNN.ADD';
export const ACTION_KNN_CLEAR = 'KNN.CLEAR';

export const KNNActions = {
  update: (options: Partial<KNNState>) => createAction(ACTION_KNN_UPDATE, options),
  add: (options: string | number) => createAction(ACTION_KNN_ADD, options),
  clearQueue: () => createAction(ACTION_KNN_CLEAR),
}

export type KNNAction = ActionsUnion<typeof KNNActions>;
