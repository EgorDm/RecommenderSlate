import { RootState } from "./types";

const s = (state: RootState) => state.knn;

export const selectKnnQueue = (state: RootState) => s(state).queue;
