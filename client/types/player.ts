import { ITrack } from "./track";

export type PlayerState = {
  active: null | ITrack;
  volume: number;
  duration: number;
  currentTime: number;
  pause: boolean;
};

export enum PlayerActionsTypes {
  PLAY = "player/PLAY",
  PAUSE = "player/PAUSE",
  SET_ACTIVE = "player/SET_ACTIVE",
  SET_DURATION = "player/SET_DURATION",
  SET_CURRENT_TIME = "player/SET_CURRENT_TIME",
  SET_VOLUME = "player/SET_VOLUME",
}

export type PlayActionInterface = {
  type: PlayerActionsTypes.PLAY;
};
export type PauseActionInterface = {
  type: PlayerActionsTypes.PAUSE;
};
export type SetActiveActionInterface = {
  type: PlayerActionsTypes.SET_ACTIVE;
  payload: ITrack;
};
export type SetDurationActionInterface = {
  type: PlayerActionsTypes.SET_DURATION;
  payload: number;
};
export type SetCurrentTimeActionInterface = {
  type: PlayerActionsTypes.SET_CURRENT_TIME;
  payload: number;
};
export type SetVolumeActionInterface = {
  type: PlayerActionsTypes.SET_VOLUME;
  payload: number;
};

export type PlayerActions =
  | PlayActionInterface
  | PauseActionInterface
  | SetActiveActionInterface
  | SetDurationActionInterface
  | SetCurrentTimeActionInterface
  | SetVolumeActionInterface;
