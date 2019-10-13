/* eslint-disable */
import React, { useState } from 'react';
import ListStudent from './ListStudent';
import store from 'store';
import { ADD_STUDENT_REQUEST } from './ducks';

export default () => {
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
      type: ADD_STUDENT_REQUEST,
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
        <button type="submit">Add Student</button>
      </form>
      <ListStudent />
    </div>
  );
};
