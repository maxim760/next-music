
import {
  PlayerActions,
  PlayerActionsTypes,
  PlayerState,
} from "../../types/player";

const initialState: PlayerState = {
  active: null,
  volume: 50,
  duration: 0,
  currentTime: 0,
  pause: true,
};

export const playerReducer = (
  state = initialState,
  action: PlayerActions
): PlayerState => {
  switch (action.type) {
    case PlayerActionsTypes.PLAY:
      return {
        ...state,
        pause: false,
      };
    case PlayerActionsTypes.PAUSE:
      return {
        ...state,
        pause: true,
      };
    case PlayerActionsTypes.SET_ACTIVE:
      return {
        ...state,
        active: action.payload,
        currentTime: 0,
        duration: 0,
      };
    case PlayerActionsTypes.SET_CURRENT_TIME:
      return {
        ...state,
        currentTime: action.payload,
      };
    case PlayerActionsTypes.SET_DURATION:
      return {
        ...state,
        duration: action.payload,
      };
    case PlayerActionsTypes.SET_VOLUME:
      return {
        ...state,
        volume: action.payload,
      };
    default:
      const x: never = action;
      return state;
  }
};
