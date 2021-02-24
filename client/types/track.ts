export type ITrack = {
  _id: string;
  name: string;
  artist: string;
  text: string;
  listens: number;
  picture: string;
  audio: string;
  comments: IComment[];
};
export type IComment = {
  _id: string;
  username: string;
  text: string;
};

export enum ACCEPT {
  IMAGE = "image/*",
  AUDIO = "audio/*",
}

export type TrackState = {
  tracks: ITrack[];
  error: string
};

export enum TrackActionType {
  FETCH_TRACKS = "tracks/FETCH_TRACKS",
  SET_TRACKS = "tracks/SET_TRACKS",
  SET_TRACKS_ERROR = "tracks/FETCH_TRACKS_ERROR",
  SEARCH_TRACKS = "tracks/SEARCH_TRACKS"
}

export type FetchTracksActionInterface = {
  type: TrackActionType.FETCH_TRACKS;
};
export type SetTracksActionInterface = {
  type: TrackActionType.SET_TRACKS;
  payload: ITrack[];
};
export type SearchTracksActionInterface = {
  type: TrackActionType.SEARCH_TRACKS;
  payload: string
};
export type SetTracksErrorActionInterface = {
  type: TrackActionType.SET_TRACKS_ERROR;
  payload: string;
};

export type TrackActions =
  | FetchTracksActionInterface
  | SetTracksActionInterface
  | SearchTracksActionInterface
  | SetTracksErrorActionInterface;
