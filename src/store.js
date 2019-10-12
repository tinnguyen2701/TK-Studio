import { combineReducers, createStore, applyMiddleware } from 'redux';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import { loginSaga, loginReducer as login } from './components/Login/ducks';
import { currentUserSaga } from './components/Admin/ducks';

export const rootReducer = combineReducers({
  login,
});

const rootSaga = function* rootSaga() {
  yield all([...loginSaga, ...currentUserSaga]);
};

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
