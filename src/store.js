import { combineReducers, createStore, applyMiddleware } from 'redux';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import { loginSaga, loginReducer as login } from './components/Login/ducks';
import {
  currentUserSaga,
  frameSaga,
  addStudentSaga,
  changePasswordSaga,
  changeImageStudentSaga,
  settingSaga,
  changeImageTeacherSaga,
} from './components/Admin/ducks';
import { modalReducer as modal, settingReducer as setting } from './ducks';

export const rootReducer = combineReducers({
  login,
  modal,
  setting,
});

const rootSaga = function* rootSaga() {
  yield all([
    ...loginSaga,
    ...currentUserSaga,
    ...frameSaga,
    ...addStudentSaga,
    ...changePasswordSaga,
    ...changeImageStudentSaga,
    ...changeImageTeacherSaga,
    ...settingSaga,
  ]);
};

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
