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
  allUserSaga,
  removeUserSaga,
  editStudentSaga,
  addTeacherSaga,
  editTeacherSaga,
} from './components/Admin/ducks';
import { modalReducer as modal, settingReducer as setting, usersReducer as users } from './ducks';

export const rootReducer = combineReducers({
  login,
  modal,
  setting,
  users,
});

const rootSaga = function* rootSaga() {
  yield all([
    ...loginSaga,
    ...currentUserSaga,
    ...frameSaga,
    ...addStudentSaga,
    ...editStudentSaga,
    ...addTeacherSaga,
    ...editTeacherSaga,
    ...changePasswordSaga,
    ...changeImageStudentSaga,
    ...changeImageTeacherSaga,
    ...settingSaga,
    ...allUserSaga,
    ...removeUserSaga,
  ]);
};

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
