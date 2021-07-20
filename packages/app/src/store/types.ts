
export interface KNNState {
  queue: (string | number)[]
}

export interface RootState {
  knn: KNNState
}
