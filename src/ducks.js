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
} from './components/Admin/ducks';

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

const setting = { imageStudent: null, imageTeacher: null };

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
        user.avatar = action.payload.avatar;
      }
      return user;
    });
  },
  [ADD_TEACHER_RESPONSE]: (state, action) => [...state, action.payload],
  [EDIT_TEACHER_RESPONSE]: (state, action) => {
    return state.map(user => {
      if (user._id === action.payload.id) {
        user.name = action.payload.name;
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
