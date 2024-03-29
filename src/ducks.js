/* eslint no-underscore-dangle: "off" */
/* eslint no-param-reassign: "error" */
import { createReducer } from 'dorothy/utils';
import {
  UPDATE_IMAGE_STUDENT_DEFAULT_RESPONSE,
  GET_SETTING_RESPONSE,
  UPDATE_IMAGE_TEACHER_DEFAULT_RESPONSE,
  GET_ALL_USER_RESPONSE,
  ADD_STUDENT_RESPONSE,
  REMOVE_USER_RESPONSE,
  EDIT_STUDENT_RESPONSE,
  ADD_TEACHER_RESPONSE,
  EDIT_TEACHER_RESPONSE,
  GET_ALL_TUTORIAL_RESPONSE,
  ADD_TUTORIAL_RESPONSE,
  REMOVE_TUTORIAL_RESPONSE,
  EDIT_TUTORIAL_RESPONSE,
  CHANGE_PASSWORD_ACCOUNT_ERROR,
  CHANGE_PASSWORD_ACCOUNT_RESPONSE,
  GET_VIDEOS_RESPONSE,
  REMOVE_VIDEO_RESPONSE,
  ADD_VIDEO_RESPONSE,
  EDIT_VIDEO_RESPONSE,
  UPDATE_AVATAR_STUDENT_DEVICE_PHONE_RESPONSE,
} from './components/Admin/ducks';
import { GET_VIDEO_RESPONSE } from './components/About/duck';
import {
  ADD_TAG_RESPONSE,
  REMOVE_TAG_RESPONSE,
  GET_ALL_POST_RESPONSE,
  REMOVE_POST_RESPONSE,
  ADD_POST_RESPONSE,
  EDIT_POST_RESPONSE,
  GET_ALL_POST_POLULATE_RESPONSE,
  GET_LIMIT_POST_RESPONSE,
  GET_TAGS_POST_RESPONSE,
  UPDATE_POST_REQUEST,
  GET_POST_RESPONSE,
  SEARCH_RESPONSE,
} from './components/Blog/ducks';

export const UPDATE_TAB = 'UPDATE_TAB';

const initLogin = { tabVisible: 0 };

const loginActionHandler = {
  [UPDATE_TAB]: (state, action) => ({
    ...state,
    tabVisible: action.payload,
  }),
};

const initStatus = null;
const statusActionHandler = {
  [CHANGE_PASSWORD_ACCOUNT_ERROR]: (state, action) => action.payload,
  [CHANGE_PASSWORD_ACCOUNT_RESPONSE]: (state, action) => action.payload,
};
export const statusReducer = createReducer(initStatus, statusActionHandler);

const setting = { imageStudent: null, imageTeacher: null, tags: [] };

const settingActionHandler = {
  [UPDATE_IMAGE_STUDENT_DEFAULT_RESPONSE]: (state, action) => ({
    ...state,
    imageStudent: action.payload.imageStudent,
  }),
  [UPDATE_IMAGE_TEACHER_DEFAULT_RESPONSE]: (state, action) => ({
    ...state,
    imageTeacher: action.payload.imageTeacher,
  }),

  [GET_SETTING_RESPONSE]: (state, action) => ({
    ...state,
    imageStudent: action.payload.imageStudent,
    imageTeacher: action.payload.imageTeacher,
    tags: action.payload.tags,
  }),
  [ADD_TAG_RESPONSE]: (state, action) => ({
    ...state,
    tags: action.payload.tags,
  }),
  [REMOVE_TAG_RESPONSE]: (state, action) => ({
    ...state,
    tags: action.payload.tags,
  }),
  [EDIT_POST_RESPONSE]: (state, action) => ({
    ...state,
    tags: action.payload.tags,
  }),
};

export const modalReducer = createReducer(initLogin, loginActionHandler);
export const settingReducer = createReducer(setting, settingActionHandler);

const users = [];
const UsersActionHandler = {
  [GET_ALL_USER_RESPONSE]: (state, action) => action.payload,
  [REMOVE_USER_RESPONSE]: (state, action) => state.filter(user => user._id !== action.payload.id),
  [ADD_STUDENT_RESPONSE]: (state, action) => [...state, action.payload],
  [EDIT_STUDENT_RESPONSE]: (state, action) => {
    return state.map(user => {
      if (user._id === action.payload.id) {
        user.name = action.payload.name;
        user.job = action.payload.job;
        user.avatar = action.payload.avatar;
      }
      return user;
    });
  },
  [UPDATE_AVATAR_STUDENT_DEVICE_PHONE_RESPONSE]: (state, action) => {
    return state.map(user => {
      if (user._id === action.payload._id) {
        user.avatarDevicePhone = action.payload.avatarDevicePhone;
      }
      return user;
    });
  },
  [ADD_TEACHER_RESPONSE]: (state, action) => [...state, action.payload],
  [EDIT_TEACHER_RESPONSE]: (state, action) => {
    return state.map(user => {
      if (user._id === action.payload.id) {
        user.name = action.payload.name;
        user.job = action.payload.job;
        user.avatar = action.payload.avatar;
      }
      return user;
    });
  },
};
export const usersReducer = createReducer(users, UsersActionHandler);

const initTutorial = [];
const tutorialsActionHandler = {
  [GET_ALL_TUTORIAL_RESPONSE]: (state, action) => action.payload,
  [ADD_TUTORIAL_RESPONSE]: (state, action) => [...state, action.payload],
  [REMOVE_TUTORIAL_RESPONSE]: (state, action) =>
    state.filter(tutorial => tutorial._id !== action.payload.id),
  [EDIT_TUTORIAL_RESPONSE]: (state, action) => {
    return state.map(tutorial => {
      if (tutorial._id === action.payload.id) {
        tutorial.nameCourse = action.payload.nameCourse;
        tutorial.description = action.payload.description;
        tutorial.object = action.payload.object;
        tutorial.subject = action.payload.subject;
        tutorial.content = action.payload.content;
        tutorial.poster = action.payload.poster;
        tutorial.images = action.payload.images;
        tutorial.requirement = action.payload.requirement;
        tutorial.start = action.payload.start;
      }
      return tutorial;
    });
  },
};

export const tutorialsReducer = createReducer(initTutorial, tutorialsActionHandler);

const initVideos = [];
const videosActionHandler = {
  [GET_VIDEO_RESPONSE]: (state, action) => action.payload,
  [GET_VIDEOS_RESPONSE]: (state, action) => action.payload,
  [REMOVE_VIDEO_RESPONSE]: (state, action) => state.filter(item => item._id !== action.payload.id),
  [ADD_VIDEO_RESPONSE]: (state, action) => [...state, action.payload.newVideo],
  [EDIT_VIDEO_RESPONSE]: (state, action) => {
    return state.map(video => {
      if (video._id === action.payload.id) {
        video.poster = action.payload.poster;
        video.description = action.payload.description;
        video.link = action.payload.link;
      }
      return video;
    });
  },
};

export const videosReducer = createReducer(initVideos, videosActionHandler);

const initPosts = [];
const postsActionHandler = {
  [GET_ALL_POST_RESPONSE]: (state, action) => action.payload.posts,
  [GET_POST_RESPONSE]: (state, action) => [action.payload.post],
  [GET_LIMIT_POST_RESPONSE]: (state, action) => action.payload.posts,
  [GET_TAGS_POST_RESPONSE]: (state, action) => action.payload.posts,
  [ADD_POST_RESPONSE]: (state, action) => [...state, action.payload],
  [REMOVE_POST_RESPONSE]: (state, action) => state.filter(item => item._id !== action.payload.id),
  [EDIT_POST_RESPONSE]: (state, action) => {
    return state.map(post => {
      if (post._id === action.payload.post.id) {
        post.title = action.payload.post.title;
        post.description = action.payload.post.description;
        post.isPopulate = action.payload.post.isPopulate;
        post.images = action.payload.post.images;
        post.videos = action.payload.post.videos;
        post.tags = action.payload.post.tags;
      }
      return post;
    });
  },
  [UPDATE_POST_REQUEST]: (state, action) => [action.payload],
};
export const postsReducer = createReducer(initPosts, postsActionHandler);

const initPopulatePosts = [];
const populatePostsActionHandler = {
  [GET_ALL_POST_POLULATE_RESPONSE]: (state, action) => action.payload.posts,
};
export const populatePostsReducer = createReducer(initPopulatePosts, populatePostsActionHandler);

const initPostsSearch = null;
const postsSearchActionHandler = {
  [SEARCH_RESPONSE]: (state, action) => action.payload.postsSearch,
};
export const postsSearchReducer = createReducer(initPostsSearch, postsSearchActionHandler);
