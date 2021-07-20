import { KNNAction } from "./actions";
import { combineReducers } from 'redux';
import * as actions from './actions';
import { KNNState } from "./types";

export const initialState: KNNState = {
  queue: []
};

export const knnReducer = (state: KNNState = initialState, action: KNNAction): KNNState => {
  switch (action.type) {
    case actions.ACTION_KNN_UPDATE:
      return {...state, ...action.payload}
    case actions.ACTION_KNN_ADD:
      return {...state, queue: [...state.queue, action.payload]}
    case actions.ACTION_KNN_CLEAR:
      return {...state, queue: []}
  }

  return state;
}

export const rootReducer = combineReducers({
  knn: knnReducer
});
