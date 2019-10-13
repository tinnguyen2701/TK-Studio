import { createReducer } from 'dorothy/utils';
import {
  UPDATE_IMAGE_STUDENT_DEFAULT_RESPONSE,
  GET_SETTING_RESPONSE,
  UPDATE_IMAGE_TEACHER_DEFAULT_RESPONSE,
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
