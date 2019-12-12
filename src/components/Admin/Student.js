/* eslint-disable */
import React, { useState } from 'react';
import styled from 'styled-components';
import store from 'store';
import SingleStudent from './SingleStudent';
import positionStudent from 'images/positionStudent.jpg';
import { ADD_STUDENT_REQUEST, UPDATE_AVATAR_STUDENT_DEVICE_PHONE_REQUEST } from './ducks';

const Form = styled.form`
  display: flex;
  align-items: center;
  margin: 5px 0;
  justify-content: space-between;

  input:nth-child(1),
  input:nth-child(2) {
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

export default ({ students }) => {
  const [name, setName] = useState(null);
  const [job, setJob] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const [ImagePhone, setImagePhone] = useState(null);

  const setAvatarHandler = e => {
    e.persist();
    setAvatar(e.target.files[0]);
  };

  const onSubmitHandler = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('job', job);
    formData.append('avatar', avatar);

    store.dispatch({
      type: ADD_STUDENT_REQUEST,
      payload: formData,
    });

    setName(null);
    setJob(null);
    setAvatar(null);
  };

  const setAvatarDevicePhoneHandler = e => {
    e.persist();
    setImagePhone(e.target.files[0]);
  };

  const onUpdateImageDevicePhone = (e, number) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('number', number);
    formData.append('avatarDevicePhone', ImagePhone);

    store.dispatch({
      type: UPDATE_AVATAR_STUDENT_DEVICE_PHONE_REQUEST,
      payload: formData,
    });

    setImagePhone(null);
  };

  return (
    <div>
      {students.length < 7 && (
        <Form onSubmit={e => onSubmitHandler(e)}>
          name:{' '}
          <input
            type="text"
            placeholder="name.."
            value={name || ''}
            onChange={e => setName(e.target.value)}
          />
          job:{' '}
          <input
            type="text"
            placeholder="job.."
            value={job || ''}
            onChange={e => setJob(e.target.value)}
          />
          avatar: <input type="file" onChange={e => setAvatarHandler(e)} />
          <button type="submit" disabled={!name}>
            Add Student
          </button>
        </Form>
      )}
      <div>
        <h3> danh sach hoc vien</h3>
        {students.map((student, index) => (
          <div key={student._id}>
            {index + 1} <SingleStudent student={student} />
          </div>
        ))}
      </div>

      <p style={{ marginTop: '100px' }}>
        ảnh hiện thị dành riêng cho điện thoại (kích thước chọn là hình vuông!)
      </p>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          2{' '}
          <img
            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            src={students[1] && students[1].avatarDevicePhone}
          />
          <input type="file" onChange={e => setAvatarDevicePhoneHandler(e)} />
          <button type="button" onClick={e => onUpdateImageDevicePhone(e, 2)}>
            Cập nhật
          </button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          3{' '}
          <img
            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            src={students[2] && students[2].avatarDevicePhone}
          />
          <input type="file" onChange={e => setAvatarDevicePhoneHandler(e)} />
          <button type="button" onClick={e => onUpdateImageDevicePhone(e, 3)}>
            Cập nhật
          </button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          4{' '}
          <img
            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            src={students[3] && students[3].avatarDevicePhone}
          />
          <input type="file" onChange={e => setAvatarDevicePhoneHandler(e)} />
          <button type="button" onClick={e => onUpdateImageDevicePhone(e, 4)}>
            Cập nhật
          </button>
        </div>
      </div>

      <img src={positionStudent} alt="position" />
    </div>
  );
};
