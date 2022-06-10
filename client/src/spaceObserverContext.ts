import { createContext, Dispatch } from 'react';
import {
  Phase, Park, State,
} from './types/types';

interface SpaceObserverState {
  phase: Phase,
  wishList: Park[],
  visited: Park[],
  currentState: State,
  parks: Park[],
}

export const initialState: SpaceObserverState = {
  phase: 'INPUT',
  wishList: [],
  visited: [],
  currentState: 'AL',
  parks: [],
};

type SpaceObserverAction =
| { type: 'SET_PHASE'; phase: Phase }
| { type: 'SET_WISHLIST'; park: Park }
| { type: 'SET_VISITED'; park: Park }
| { type: 'SET_STATE'; currentState: State }
| { type: 'SET_PARKS'; parks: Park[] };

const wishListReducer = (state: SpaceObserverState, action: SpaceObserverAction) => {
  const { wishList } = state;
  const updatedList = [...wishList];
  if (action.type === 'SET_WISHLIST') {
    if (!updatedList.includes(action.park)) {
      updatedList.push(action.park);
    } else {
      updatedList.splice(updatedList.indexOf(action.park), 1);
    }
  }

  return { ...state, wishList: updatedList };
};

const visitedReducer = (state: SpaceObserverState, action: SpaceObserverAction) => {
  const { visited } = state;
  const updatedList = [...visited];
  if (action.type === 'SET_VISITED') {
    if (!updatedList.includes(action.park)) {
      updatedList.push(action.park);
    } else {
      updatedList.splice(updatedList.indexOf(action.park), 1);
    }
  }

  return { ...state, visited: updatedList };
};

export const reducer = (state: SpaceObserverState, action: SpaceObserverAction) => {
  switch (action.type) {
    case 'SET_PHASE':
      return { ...state, phase: action.phase };
    case 'SET_WISHLIST':
      return wishListReducer(state, action);
    case 'SET_VISITED':
      return visitedReducer(state, action);
    case 'SET_STATE':
      return { ...state, currentState: action.currentState };
    case 'SET_PARKS':
      return { ...state, parks: action.parks };
    default:
      return state;
  }
};

export interface SpaceObserverContext {
  state: SpaceObserverState;
  dispatch: Dispatch<SpaceObserverAction>;
}

export const mainContext = createContext<SpaceObserverContext>({
  state: initialState,
  dispatch: () => {},
});
