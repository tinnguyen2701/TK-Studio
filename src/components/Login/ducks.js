import { fork, put, call, takeLatest } from 'redux-saga/effects';
import { callApi, createAction, createReducer } from 'dorothy/utils';
import { GET_CURRENT_USER_RESPONSE, GET_CURRENT_USER_ERROR } from '../Admin/ducks';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_RESPONSE = 'LOGIN_RESPONSE';
export const LOGIN_ERROR = 'LOGIN_ERROR';

/* handler state for login */
function* requestLogin(action) {
  const { username, password, history } = action.payload;
  try {
    const response = yield call(
      callApi,
      'POST',
      `${process.env.REACT_APP_BASE_URL}api/auth/login`,
      {
        username,
        password,
      },
    );

    if (response.data.success) {
      yield put(createAction(LOGIN_RESPONSE));
      window.localStorage.setItem('JWT', response.data.token);
      history.push('/dashboard');
    }
  } catch (error) {
    yield put(createAction(LOGIN_ERROR, error));
  }
}
function* watchLoginRequest() {
  yield takeLatest(LOGIN_REQUEST, requestLogin);
}

const initLogin = null;
const loginActionHandler = {
  [LOGIN_RESPONSE]: () => true,
  [LOGIN_ERROR]: () => null,
  [GET_CURRENT_USER_RESPONSE]: () => true,
  [GET_CURRENT_USER_ERROR]: () => null,
};

export const loginReducer = createReducer(initLogin, loginActionHandler);
export const loginSaga = [fork(watchLoginRequest)];

// /* handler state for get current user */
// function* requestCurrentUser(action) {
//   try {
//     const response = yield call(callApi, 'GET', `${process.env.REACT_APP_BASE_URL}api/auth`, {
//       token: action.payload,
//     });
//     yield put(createAction(GET_CURRENT_USER_RESPONSE, response));
//   } catch (error) {
//     yield put(createAction(GET_CURRENT_USER_ERROR, error));
//   }
// }
// function* watchCurrentUserRequest() {
//   yield takeLatest(GET_CURRENT_USER_REQUEST, requestCurrentUser);
// }
// export const currentUserSaga = [fork(watchCurrentUserRequest)];

// /* handler state for verify email */
// function* requestVerify(action) {
//   const { email, code, history } = action.payload;
//   try {
//     const response = yield call(
//       callApi,
//       'POST',
//       `${process.env.REACT_APP_BASE_URL}api/auth/verify`,
//       { email, code },
//     );
//     if (response.success) {
//       if (code) {
//         window.localStorage.setItem('JWT', response.token);
//         history.push('/auth/rememberPassword');
//       } else yield put(createAction(VERIFY_RESPONSE, email));
//     }
//   } catch (error) {
//     yield put(createAction(VERIFY_ERROR, error));
//   }
// }
// function* watchVerifyRequest() {
//   yield takeLatest(VERIFY_REQUEST, requestVerify);
// }

// const initVerify = { isVisible: false, isCheckInfoEmail: null };
// const verifyActionHandler = {
//   [VERIFY_RESPONSE]: state => ({
//     ...state,
//     isVisible: true,
//     isCheckInfo: true,
//   }),
//   [VERIFY_ERROR]: state => ({
//     ...state,
//     isCheckInfo: false,
//   }),
// };

// export const verifyReducer = createReducer(initVerify, verifyActionHandler);
// export const verifySaga = [fork(watchVerifyRequest)];

// /* handler state for update password */
// function* requestUpdatePassword(action) {
//   const { password, history } = action.payload;
//   try {
//     const response = yield call(
//       callApi,
//       'POST',
//       `${process.env.REACT_APP_BASE_URL}api/auth/updatePassword`,
//       { password, token: window.localStorage.getItem('JWT') },
//     );
//     if (response.success) history.push('/auth/login');
//   } catch (error) {
//     yield put(createAction(UPDATE_PASSWORD_ERROR, error));
//   }
// }
// function* watchUpdatePasswordRequest() {
//   yield takeLatest(UPDATE_PASSWORD_REQUEST, requestUpdatePassword);
// }
// export const updatePasswordSaga = [fork(watchUpdatePasswordRequest)];

// /* handler state for update user */
// function* requestEditUser(action) {
//   try {
//     const response = yield call(
//       callApi,
//       'POST',
//       `${process.env.REACT_APP_BASE_URL}api/auth/editUser`,
//       action.payload,
//     );
//     if (response.status === 403) {
//       yield put(createAction(MESSAGE, { content: response.message, success: false }));
//     } else if (response.success)
//       yield put(createAction(MESSAGE, { content: 'save profile success!', success: true }));
//   } catch (error) {
//     yield put(createAction(EDIT_USER_ERROR, error));
//   }
// }
// function* watchEditUserRequest() {
//   yield takeLatest(EDIT_USER_REQUEST, requestEditUser);
// }

// export const editUserSaga = [fork(watchEditUserRequest)];
