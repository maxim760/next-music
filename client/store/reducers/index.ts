import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import { playerReducer } from "./PlayerReducer";
import { trackReducer } from "./TrackReducer";

const rootReducer = combineReducers({
  player: playerReducer,
  track: trackReducer,
});

// create your reducer
export const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    return {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    }
  } else {
    return rootReducer(state, action)
  }
}

export type RootState = ReturnType<typeof rootReducer>;
