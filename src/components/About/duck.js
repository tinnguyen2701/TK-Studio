import { fork, put, call, takeLatest } from 'redux-saga/effects';
import { callApi, createAction } from 'dorothy/utils';

export const GET_VIDEO_REQUEST = 'GET_VIDEO_REQUEST';
export const GET_VIDEO_RESPONSE = 'GET_VIDEO_RESPONSE';
export const GET_VIDEO_ERROR = 'GET_VIDEO_ERROR';

/* handler state for get videp */
function* requestVideo() {
  try {
    const response = yield call(
      callApi,
      'GET',
      `${process.env.REACT_APP_BASE_URL}api/setting/videos`,
    );
    yield put(createAction(GET_VIDEO_RESPONSE, response.data));
  } catch (error) {
    yield put(createAction(GET_VIDEO_ERROR, error));
  }
}
function* watchVideoRequest() {
  yield takeLatest(GET_VIDEO_REQUEST, requestVideo);
}

export const allVideosSaga = [fork(watchVideoRequest)];
