import { TrackActions, TrackActionType, TrackState } from "../../types/track";

const initialState: TrackState = {
  tracks: [],
  error: "",
};

export const trackReducer = (state = initialState, action: TrackActions) => {
  switch (action.type) {
    case TrackActionType.FETCH_TRACKS:
      return {
        ...state,
        error: "",
      };
    case TrackActionType.SEARCH_TRACKS:
      return {
        ...state,
      };
    case TrackActionType.SET_TRACKS:
      return {
        ...state,
        tracks: action.payload,
      };
    case TrackActionType.SET_TRACKS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
