import { PlayerActionsTypes } from "../../types/player";
import { FetchTracksActionInterface, ITrack, SearchTracksActionInterface, SetTracksActionInterface, SetTracksErrorActionInterface, TrackActionType } from "../../types/track";

export const setTracks = (payload: ITrack[]): SetTracksActionInterface => ({
  type: TrackActionType.SET_TRACKS,
  payload: payload
})
export const fetchTracks = (): FetchTracksActionInterface => ({
  type: TrackActionType.FETCH_TRACKS,
})
export const searchTracks = (query: string): SearchTracksActionInterface => ({
  type: TrackActionType.SEARCH_TRACKS,
  payload: query
})
export const setTracksError = (payload: string): SetTracksErrorActionInterface => ({
  type: TrackActionType.SET_TRACKS_ERROR,
  payload: payload
})
