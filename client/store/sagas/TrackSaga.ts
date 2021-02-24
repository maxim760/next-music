import { put, takeLatest, call } from "redux-saga/effects";
import { TrackApi } from "../../services/track";
import { SearchTracksActionInterface, TrackActionType } from "../../types/track";
import { setTracks, setTracksError } from "../actions/track";

export function* trackWatcher() {
  yield takeLatest(TrackActionType.FETCH_TRACKS, trackWorker);
  yield takeLatest(TrackActionType.SEARCH_TRACKS, trackSearchWorker);
}

export function* trackWorker() {
  try {
    const tracks = yield call(TrackApi.fetchTracks);
    
    yield put(
      setTracks(tracks)
    );
  } catch (error) {
    yield put(setTracksError("error"));
  }
}
export function* trackSearchWorker({payload}: SearchTracksActionInterface) {
  try {
    const tracks = yield call(TrackApi.searchTracks, payload);

    yield put(
      setTracks(tracks)
    );
  } catch (error) {
    yield put(setTracksError("error"));
  }
}
