import { HYDRATE } from "next-redux-wrapper";
import { all, call, takeLatest } from "redux-saga/effects";
import { PlayerActionsTypes } from "../types/player";
import { TrackActionType } from "../types/track";
import { trackWatcher, trackWorker } from "./sagas/TrackSaga";

export function* saga() {
  yield all([
    trackWatcher()
  ]);
}
