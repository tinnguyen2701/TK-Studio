/* eslint-disable */
import React, { useState } from 'react';
import store from 'store';
import SingleTeacher from './SingleTeacher';
import { ADD_TEACHER_REQUEST } from './ducks';

export default ({ teachers }) => {
  const [name, setName] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const setAvatarHandler = e => {
    e.persist();
    setAvatar(e.target.files[0]);
  };

  const onSubmitHandler = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('avatar', avatar);

    store.dispatch({
      type: ADD_TEACHER_REQUEST,
      payload: formData,
    });

    setName(null);
    setAvatar(null);
  };

  return (
    <div>
      <form onSubmit={e => onSubmitHandler(e)}>
        name:{' '}
        <input
          type="text"
          placeholder="name.."
          value={name || ''}
          onChange={e => setName(e.target.value)}
        />
        avatar: <input type="file" onChange={e => setAvatarHandler(e)} />
        <button type="submit" disabled={!name && !avatar}>
          Add Teacher
        </button>
      </form>

      <div>
        <h3> danh sach giang vien</h3>
        {teachers.map((teacher, index) => (
          <SingleTeacher key={index.toString()} teacher={teacher} />
        ))}
      </div>
    </div>
  );
};
