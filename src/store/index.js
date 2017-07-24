import { applyMiddleware, compose, createStore, } from "redux";
import createSagaMiddleware from "redux-saga";
import reducers from "./reducers";
import { fromJS, } from "immutable";
import { combineReducers, } from 'redux-immutable';



const sagaMiddleware = createSagaMiddleware({});

let preloadedState = {};

let middleWare = applyMiddleware(sagaMiddleware);

if (global.window) {
  if (window.__PRELOADED_STATE__) {
    preloadedState = window.__PRELOADED_STATE__;
    delete window.__PRELOADED_STATE__;
  }
  const dev = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
  if (dev) {
    middleWare = compose(applyMiddleware(sagaMiddleware), dev);
  } else {
    middleWare = applyMiddleware(sagaMiddleware);
  }
}

const reducer = combineReducers({
  ...reducers,
});

export const store = createStore(
  reducer,
  fromJS(preloadedState),
  middleWare
);


export const runSaga = function (task) {
  sagaMiddleware.run(task);
};
