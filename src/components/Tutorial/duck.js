import { fork, put, call, takeLatest } from 'redux-saga/effects';
import { callApi, createAction, createReducer } from 'dorothy/utils';

export const GET_TUTORIAL_REQUEST = 'GET_TUTORIAL_REQUEST';
export const GET_TUTORIAL_RESPONSE = 'GET_TUTORIAL_RESPONSE';
export const GET_TUTORIAL_ERROR = 'GET_TUTORIAL_ERROR';

/* handler state for get tutorial */
function* requestTutorial(action) {
  try {
    const response = yield call(
      callApi,
      'GET',
      `${process.env.REACT_APP_BASE_URL}api/tutorial/${action.payload}`,
    );
    yield put(createAction(GET_TUTORIAL_RESPONSE, response.data[0]));
  } catch (error) {
    yield put(createAction(GET_TUTORIAL_ERROR, error));
  }
}
function* watchTutorialRequest() {
  yield takeLatest(GET_TUTORIAL_REQUEST, requestTutorial);
}

const initTutorial = null;
const tutorialActionHandler = {
  GET_TUTORIAL_RESPONSE: (state, action) => action.payload,
};

export const tutorialReducer = createReducer(initTutorial, tutorialActionHandler);
export const tutorialSaga = [fork(watchTutorialRequest)];
