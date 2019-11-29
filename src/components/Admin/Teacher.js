/* eslint-disable */
import React, { useState } from 'react';
import styled from 'styled-components';
import store from 'store';
import SingleTeacher from './SingleTeacher';
import { ADD_TEACHER_REQUEST } from './ducks';

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

export default ({ teachers }) => {
  const [name, setName] = useState(null);
  const [job, setJob] = useState(null);
  const [avatar, setAvatar] = useState(null);

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
      type: ADD_TEACHER_REQUEST,
      payload: formData,
    });

    setName(null);
    setJob(null);
    setAvatar(null);
  };

  return (
    <div>
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
          Add Teacher
        </button>
      </Form>

      <div>
        <h3> danh sach giang vien</h3>
        {teachers.map((teacher, index) => (
          <SingleTeacher key={index.toString()} teacher={teacher} />
        ))}
      </div>
    </div>
  );
};
