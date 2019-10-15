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

const Form = styled.form`
  width: 50%;
  p {
    display: flex;
    align-items: center;
    margin: 5px 0;
    justify-content: space-between;
  }

  input {
    background: rgb(44, 166, 239);
    color: white;
    border: none;
    border-radius: 3px;
    padding: 5px;
  }
  input::placeholder {
    color: white;
  }
  button {
    cursor: pointer;
    background: rgb(44, 166, 239);
    border: none;
    padding: 5px;
    color: white;
    border-radius: 3px;
    margin: 5px 0;
    padding: 5px 20px;
  }

  button:disabled {
    cursor: default;
    background: none;
    color: black;
    border: 1px solid black;
  }
`;

const Image = styled.img`
  width: 90px;
  height: 90px;
`;

const ImageDefault = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    cursor: pointer;
    background: rgb(44, 166, 239);
    border: none;
    padding: 5px;
    color: white;
    border-radius: 3px;
    margin: 5px 0;
    padding: 5px 20px;
  }

  button:disabled {
    cursor: default;
    background: none;
    color: black;
    border: 1px solid black;
  }
`;

const Alert = styled.p`
  background: ${props => (props.status ? 'rgb(44, 166, 239);' : 'rgb(252, 32, 3)')};
  color: white;
`;

const Setting = ({ imageStudent, imageTeacher, status }) => {
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
        <Form onSubmit={e => onChangePasswordHandler(e)}>
          {status && <Alert status={status.success}>{status.message}</Alert>}
          <p>
            mật khẩu cũ:{' '}
            <input
              type="password"
              value={oldPassword || ''}
              onChange={e => setOldPassword(e.target.value)}
              placeholder="Nhập mật khẩu cũ"
            />
          </p>
          <p>
            mật khẩu mới:{' '}
            <input
              type="password"
              value={newPassword || ''}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="Nhập mật khẩu mới"
            />
          </p>
          <p>
            <button type="submit" disabled={!oldPassword || !newPassword}>
              Đổi
            </button>
          </p>
        </Form>
      </div>
      <ImageDefault>
        ảnh mặc định cho học viên: <Image src={imageStudent} alt="student avatar" />{' '}
        <input type="file" onChange={e => setImageStudentHandler(e)} />{' '}
        <button
          type="button"
          onClick={() => onChangeImageStudent()}
          disabled={!imageDefaultStudent}
        >
          Đổi liền
        </button>
      </ImageDefault>
      <ImageDefault>
        ảnh mặc định cho giảng viên: <Image src={imageTeacher} alt="teacher avatar" />{' '}
        <input type="file" onChange={e => setImageTeacherHandler(e)} />{' '}
        <button
          type="button"
          onClick={() => onChangeImageTeacher()}
          disabled={!imageDefaultTeacher}
        >
          Đổi liền
        </button>
      </ImageDefault>
    </div>
  );
};

export default connect(state => ({
  imageStudent: state.setting.imageStudent,
  imageTeacher: state.setting.imageTeacher,
  status: state.status,
}))(Setting);
