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
} from './components/Admin/ducks';

export const UPDATE_TAB = 'UPDATE_TAB';

const initLogin = { tabVisible: 0 };

const loginActionHandler = {
  [UPDATE_TAB]: (state, action) => ({
    ...state,
    tabVisible: action.payload,
  }),
};

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
