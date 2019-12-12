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
  addTutorialSaga,
  allTutorialSaga,
  removeTutorialSaga,
  editTutorialSaga,
  addVideoSaga,
  RemoveVideoSaga,
  EditVideoSaga,
  updateAvatarDevicePhoneSaga,
} from './components/Admin/ducks';
import {
  modalReducer as modal,
  settingReducer as setting,
  usersReducer as users,
  tutorialsReducer as tutorials,
  statusReducer as status,
  videosReducer as videos,
  postsReducer as posts,
  populatePostsReducer as populatePosts,
  postsSearchReducer as postsSearch,
} from './ducks';
import { tutorialSaga, tutorialReducer as tutorial } from './components/Tutorial/duck';
import { allVideosSaga } from './components/About/duck';
import {
  addTagSaga,
  removeTagSaga,
  addPostSaga,
  getAllPostSaga,
  removePostSaga,
  editPostSaga,
  getAllPostPopulateSaga,
  getLimitPostSaga,
  getTagsPostSaga,
  getPostSaga,
  searchSaga,
} from './components/Blog/ducks';

export const rootReducer = combineReducers({
  login,
  modal,
  setting,
  users,
  tutorials,
  status,
  tutorial,
  videos,
  posts,
  populatePosts,
  postsSearch,
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
    ...editTutorialSaga,
    ...addTutorialSaga,
    ...changePasswordSaga,
    ...changeImageStudentSaga,
    ...changeImageTeacherSaga,
    ...settingSaga,
    ...allUserSaga,
    ...allTutorialSaga,
    ...removeUserSaga,
    ...removeTutorialSaga,
    ...tutorialSaga,
    ...addVideoSaga,
    ...RemoveVideoSaga,
    ...EditVideoSaga,
    ...allVideosSaga,
    ...addTagSaga,
    ...removeTagSaga,
    ...addPostSaga,
    ...getAllPostSaga,
    ...removePostSaga,
    ...editPostSaga,
    ...getAllPostPopulateSaga,
    ...getLimitPostSaga,
    ...getTagsPostSaga,
    ...getPostSaga,
    ...searchSaga,
    ...updateAvatarDevicePhoneSaga,
  ]);
};

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
