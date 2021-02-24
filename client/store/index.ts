import { MakeStore, createWrapper, Context } from "next-redux-wrapper";
import { createStore, applyMiddleware, Store } from "redux";
import createSagaMiddleware, { Task } from "redux-saga";
import { saga } from "./saga";
import { reducer, RootState } from "./reducers";

export interface SagaStore extends Store {
  sagaTask?: Task;
}

// create a makeStore function
const makeStore: MakeStore<RootState> = (context: Context) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducer, applyMiddleware(sagaMiddleware));

  (store as SagaStore).sagaTask = sagaMiddleware.run(saga);
  return store;
};

// export an assembled wrapper
export const wrapper = createWrapper<RootState>(makeStore, { debug: false });
