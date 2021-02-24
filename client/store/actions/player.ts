import { PlayerActionsTypes } from "../../types/player";
import { ITrack } from "../../types/track";

export const pauseTrack = () => ({
  type: PlayerActionsTypes.PAUSE,
});
export const playTrack = () => ({
  type: PlayerActionsTypes.PLAY,
});
export const setVolume = (payload: number) => ({
  type: PlayerActionsTypes.SET_VOLUME,
  payload,
});
export const setActive = (payload: ITrack) => ({
  type: PlayerActionsTypes.SET_ACTIVE,
  payload,
});
export const setCurrentTime = (payload: number) => ({
  type: PlayerActionsTypes.SET_CURRENT_TIME,
  payload,
});
export const setDuration = (payload: number) => ({
  type: PlayerActionsTypes.SET_DURATION,
  payload,
});
