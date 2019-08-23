import { applyMiddleware, compose, createStore } from 'redux';
import reduxSaga from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from './sagas';

const composeEnhancer =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = reduxSaga();
const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
