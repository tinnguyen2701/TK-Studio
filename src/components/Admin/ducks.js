import { fork, put, call, takeLatest } from 'redux-saga/effects';
import { callApi, createAction } from 'dorothy/utils';

export const GET_CURRENT_USER_REQUEST = 'GET_CURRENT_USER_REQUEST';
export const GET_CURRENT_USER_RESPONSE = 'GET_CURRENT_USER_RESPONSE';
export const GET_CURRENT_USER_ERROR = 'GET_CURRENT_USER_ERROR';

export const UPDATE_FRAME_REQUEST = 'UPDATE_FRAME_REQUEST';
export const UPDATE_FRAME_RESPONSE = 'UPDATE_FRAME_RESPONSE';
export const UPDATE_FRAME_ERROR = 'UPDATE_FRAME_ERROR';

export const ADD_STUDENT_REQUEST = 'ADD_STUDENT_REQUEST';
export const ADD_STUDENT_RESPONSE = 'ADD_STUDENT_RESPONSE';
export const ADD_STUDENT_ERROR = 'ADD_STUDENT_ERROR';

export const ADD_TEACHER_REQUEST = 'ADD_TEACHER_REQUEST';
export const ADD_TEACHER_RESPONSE = 'ADD_TEACHER_RESPONSE';
export const ADD_TEACHER_ERROR = 'ADD_TEACHER_ERROR';

export const EDIT_STUDENT_REQUEST = 'EDIT_STUDENT_REQUEST';
export const EDIT_STUDENT_RESPONSE = 'EDIT_STUDENT_RESPONSE';
export const EDIT_STUDENT_ERROR = 'EDIT_STUDENT_ERROR';

export const EDIT_TEACHER_REQUEST = 'EDIT_TEACHER_REQUEST';
export const EDIT_TEACHER_RESPONSE = 'EDIT_TEACHER_RESPONSE';
export const EDIT_TEACHER_ERROR = 'EDIT_TEACHER_ERROR';

export const CHANGE_PASSWORD_ACCOUNT_REQUEST = 'CHANGE_PASSWORD_ACCOUNT_REQUEST';
export const CHANGE_PASSWORD_ACCOUNT_RESPONSE = 'CHANGE_PASSWORD_ACCOUNT_RESPONSE';
export const CHANGE_PASSWORD_ACCOUNT_ERROR = 'CHANGE_PASSWORD_ACCOUNT_RESPONSE';

export const UPDATE_IMAGE_STUDENT_DEFAULT_REQUEST = 'UPDATE_IMAGE_STUDENT_DEFAULT_REQUEST';
export const UPDATE_IMAGE_STUDENT_DEFAULT_RESPONSE = 'UPDATE_IMAGE_STUDENT_DEFAULT_RESPONSE';
export const UPDATE_IMAGE_STUDENT_DEFAULT_ERROR = 'UPDATE_IMAGE_STUDENT_DEFAULT_ERROR';

export const UPDATE_IMAGE_TEACHER_DEFAULT_REQUEST = 'UPDATE_IMAGE_TEACHER_DEFAULT_REQUEST';
export const UPDATE_IMAGE_TEACHER_DEFAULT_RESPONSE = 'UPDATE_IMAGE_TEACHER_DEFAULT_RESPONSE';
export const UPDATE_IMAGE_TEACHER_DEFAULT_ERROR = 'UPDATE_IMAGE_TEACHER_DEFAULT_ERROR';

export const GET_SETTING_REQUEST = 'GET_SETTING_REQUEST';
export const GET_SETTING_RESPONSE = 'GET_SETTING_RESPONSE';
export const GET_SETTING_ERROR = 'GET_SETTING_ERROR';

export const GET_ALL_USER_REQUEST = 'GET_ALL_USER_REQUEST';
export const GET_ALL_USER_RESPONSE = 'GET_ALL_USER_RESPONSE';
export const GET_ALL_USER_ERROR = 'GET_ALL_USER_ERROR';

export const REMOVE_USER_REQUEST = 'REMOVE_USER_REQUEST';
export const REMOVE_USER_RESPONSE = 'REMOVE_USER_RESPONSE';
export const REMOVE_USER_ERROR = 'REMOVE_USER_ERROR';

/* handler state for get current user */
function* requestCurrentUser() {
  try {
    const response = yield call(
      callApi,
      'GET',
      `${process.env.REACT_APP_BASE_URL}api/auth/currentUser`,
    );
    yield put(createAction(GET_CURRENT_USER_RESPONSE, response));
    yield put({ type: GET_ALL_USER_REQUEST });
    yield put({ type: GET_SETTING_REQUEST });
  } catch (error) {
    yield put(createAction(GET_CURRENT_USER_ERROR, error));
  }
}
function* watchCurrentUserRequest() {
  yield takeLatest(GET_CURRENT_USER_REQUEST, requestCurrentUser);
}
export const currentUserSaga = [fork(watchCurrentUserRequest)];

/* update frame */
function* requestFrame(action) {
  try {
    // const response = yield call(
    //   callApi,
    //   'GET',
    //   `${process.env.REACT_APP_BASE_URL}api/auth/currentUser`,
    // );
    yield put(createAction('UPDATE_TAB', action.payload));
    // yield put(createAction(GET_CURRENT_USER_RESPONSE, response));
  } catch (error) {
    // yield put(createAction(GET_CURRENT_USER_ERROR, error));
  }
}
function* watchFrameSaga() {
  yield takeLatest(UPDATE_FRAME_REQUEST, requestFrame);
}
export const frameSaga = [fork(watchFrameSaga)];

/* handler state for add user */
function* requestAddStudent(action) {
  try {
    const response = yield call(
      callApi,
      'POST',
      `${process.env.REACT_APP_BASE_URL}api/user/addStudent`,
      action.payload,
    );
    yield put(createAction(ADD_STUDENT_RESPONSE, response.data));
  } catch (error) {
    yield put(createAction(ADD_STUDENT_ERROR, error));
  }
}
function* watchAddStudentRequest() {
  yield takeLatest(ADD_STUDENT_REQUEST, requestAddStudent);
}
export const addStudentSaga = [fork(watchAddStudentRequest)];

/* handler state for add teacher */
function* requestAddTeacher(action) {
  try {
    const response = yield call(
      callApi,
      'POST',
      `${process.env.REACT_APP_BASE_URL}api/user/addTeacher`,
      action.payload,
    );
    yield put(createAction(ADD_TEACHER_RESPONSE, response.data));
  } catch (error) {
    yield put(createAction(ADD_TEACHER_ERROR, error));
  }
}
function* watchAddTeacherRequest() {
  yield takeLatest(ADD_TEACHER_REQUEST, requestAddTeacher);
}
export const addTeacherSaga = [fork(watchAddTeacherRequest)];

/* handler state for edit user */
function* requestEditStudent(action) {
  try {
    const response = yield call(
      callApi,
      'POST',
      `${process.env.REACT_APP_BASE_URL}api/user/editStudent`,
      action.payload,
    );
    yield put(createAction(EDIT_STUDENT_RESPONSE, response.data));
  } catch (error) {
    yield put(createAction(EDIT_STUDENT_ERROR, error));
  }
}
function* watchEditStudentRequest() {
  yield takeLatest(EDIT_STUDENT_REQUEST, requestEditStudent);
}
export const editStudentSaga = [fork(watchEditStudentRequest)];

/* handler state for edit user */
function* requestEditTeacher(action) {
  try {
    const response = yield call(
      callApi,
      'POST',
      `${process.env.REACT_APP_BASE_URL}api/user/editTeacher`,
      action.payload,
    );
    yield put(createAction(EDIT_TEACHER_RESPONSE, response.data));
  } catch (error) {
    yield put(createAction(EDIT_TEACHER_ERROR, error));
  }
}
function* watchEditTeacherRequest() {
  yield takeLatest(EDIT_TEACHER_REQUEST, requestEditTeacher);
}
export const editTeacherSaga = [fork(watchEditTeacherRequest)];

/* handler state for change account password */
function* requestChangePassword(action) {
  try {
    const response = yield call(
      callApi,
      'POST',
      `${process.env.REACT_APP_BASE_URL}api/auth/changePassword`,
      action.payload,
    );
    yield put(createAction(CHANGE_PASSWORD_ACCOUNT_RESPONSE, response));
  } catch (error) {
    yield put(createAction(CHANGE_PASSWORD_ACCOUNT_ERROR, error));
  }
}
function* watchChangePasswordRequest() {
  yield takeLatest(CHANGE_PASSWORD_ACCOUNT_REQUEST, requestChangePassword);
}
export const changePasswordSaga = [fork(watchChangePasswordRequest)];

/* handler state for change image student default */
function* requestChangeImageStudent(action) {
  try {
    const response = yield call(
      callApi,
      'POST',
      `${process.env.REACT_APP_BASE_URL}api/setting/changeImageStudent`,
      action.payload,
    );
    yield put(createAction(UPDATE_IMAGE_STUDENT_DEFAULT_RESPONSE, response.data));
  } catch (error) {
    yield put(createAction(UPDATE_IMAGE_STUDENT_DEFAULT_ERROR, error));
  }
}
function* watchChangeImageStudentRequest() {
  yield takeLatest(UPDATE_IMAGE_STUDENT_DEFAULT_REQUEST, requestChangeImageStudent);
}
export const changeImageStudentSaga = [fork(watchChangeImageStudentRequest)];

/* handler state for change image student default */
function* requestChangeImageTeacher(action) {
  try {
    const response = yield call(
      callApi,
      'POST',
      `${process.env.REACT_APP_BASE_URL}api/setting/changeImageTeacher`,
      action.payload,
    );
    yield put(createAction(UPDATE_IMAGE_TEACHER_DEFAULT_RESPONSE, response.data));
  } catch (error) {
    yield put(createAction(UPDATE_IMAGE_TEACHER_DEFAULT_ERROR, error));
  }
}
function* watchChangeImageTeacherRequest() {
  yield takeLatest(UPDATE_IMAGE_TEACHER_DEFAULT_REQUEST, requestChangeImageTeacher);
}
export const changeImageTeacherSaga = [fork(watchChangeImageTeacherRequest)];

/* handler state for get setting */
function* requestSetting() {
  try {
    const response = yield call(callApi, 'GET', `${process.env.REACT_APP_BASE_URL}api/setting`);
    yield put(createAction(GET_SETTING_RESPONSE, response.data));
  } catch (error) {
    yield put(createAction(GET_SETTING_ERROR, error));
  }
}
function* watchSettingRequest() {
  yield takeLatest(GET_SETTING_REQUEST, requestSetting);
}
export const settingSaga = [fork(watchSettingRequest)];

/* handler state for get all user */
function* requestAllUser(action) {
  try {
    const response = yield call(
      callApi,
      'GET',
      `${process.env.REACT_APP_BASE_URL}api/user`,
      action.payload,
    );
    yield put(createAction(GET_ALL_USER_RESPONSE, response.data));
  } catch (error) {
    yield put(createAction(GET_ALL_USER_ERROR, error));
  }
}
function* watchAllUserRequest() {
  yield takeLatest(GET_ALL_USER_REQUEST, requestAllUser);
}
export const allUserSaga = [fork(watchAllUserRequest)];

/* handler state for remove user */
function* requestRemoveUser(action) {
  try {
    const response = yield call(
      callApi,
      'POST',
      `${process.env.REACT_APP_BASE_URL}api/user/remove`,
      action.payload,
    );
    yield put(createAction(REMOVE_USER_RESPONSE, response.data));
  } catch (error) {
    yield put(createAction(REMOVE_USER_ERROR, error));
  }
}
function* watchRemoveUserRequest() {
  yield takeLatest(REMOVE_USER_REQUEST, requestRemoveUser);
}
export const removeUserSaga = [fork(watchRemoveUserRequest)];
