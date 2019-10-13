/* eslint-disable */
import React, { useState } from 'react';
import store from 'store';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
  CHANGE_PASSWORD_ACCOUNT_REQUEST,
  UPDATE_IMAGE_STUDENT_DEFAULT_REQUEST,
  UPDATE_IMAGE_TEACHER_DEFAULT_REQUEST,
} from './ducks';

const Image = styled.img`
  width: 90px;
  height: 90px;
`;

const Setting = ({ imageStudent, imageTeacher }) => {
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [imageDefaultStudent, setImageDefaultStudent] = useState(null);
  const [imageDefaultTeacher, setImageDefaultTeacher] = useState(null);

  const onChangePasswordHandler = e => {
    e.preventDefault();

    store.dispatch({
      type: CHANGE_PASSWORD_ACCOUNT_REQUEST,
      payload: { oldPassword, newPassword },
    });
  };

  const setImageStudentHandler = e => {
    e.persist();
    setImageDefaultStudent(e.target.files[0]);
  };

  const onChangeImageStudent = () => {
    const formData = new FormData();
    formData.append('imageStudent', imageDefaultStudent);

    store.dispatch({
      type: UPDATE_IMAGE_STUDENT_DEFAULT_REQUEST,
      payload: formData,
    });

    setImageDefaultStudent(null);
  };

  const setImageTeacherHandler = e => {
    e.persist();
    setImageDefaultTeacher(e.target.files[0]);
  };

  const onChangeImageTeacher = () => {
    const formData = new FormData();
    formData.append('imageTeacher', imageDefaultTeacher);

    store.dispatch({
      type: UPDATE_IMAGE_TEACHER_DEFAULT_REQUEST,
      payload: formData,
    });

    setImageDefaultTeacher(null);
  };

  return (
    <div>
      <div>
        <form onSubmit={e => onChangePasswordHandler(e)}>
          <p>
            mật khẩu cũ:{' '}
            <input
              type="password"
              value={oldPassword || ''}
              onChange={e => setOldPassword(e.target.value)}
            />
          </p>
          <p>
            mật khẩu mới:{' '}
            <input
              type="password"
              value={newPassword || ''}
              onChange={e => setNewPassword(e.target.value)}
            />
          </p>
          <p>
            <button type="submit">Đổi</button>
          </p>
        </form>
      </div>
      <div>
        ảnh mặc định cho học viên: <Image src={imageStudent} alt="student avatar" />{' '}
        <input type="file" onChange={e => setImageStudentHandler(e)} />{' '}
        <button type="button" onClick={() => onChangeImageStudent()}>
          Đổi liền
        </button>
      </div>
      <div>
        ảnh mặc định cho giảng viên: <Image src={imageTeacher} alt="teacher avatar" />{' '}
        <input type="file" onChange={e => setImageTeacherHandler(e)} />{' '}
        <button type="button" onClick={() => onChangeImageTeacher()}>
          Đổi liền
        </button>
      </div>
    </div>
  );
};

export default connect(state => ({
  imageStudent: state.setting.imageStudent,
  imageTeacher: state.setting.imageTeacher,
}))(Setting);
