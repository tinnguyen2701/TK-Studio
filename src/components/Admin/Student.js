/* eslint-disable */
import React, { useState } from 'react';
import store from 'store';
import SingleStudent from './SingleStudent';
import { ADD_STUDENT_REQUEST } from './ducks';

export default ({ students }) => {
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
        <button type="submit" disabled={!name && !avatar}>
          Add Student
        </button>
      </form>

      <div>
        <h3> danh sach hoc vien</h3>
        {students.map((student, index) => (
          <SingleStudent key={index.toString()} student={student} />
        ))}
      </div>
    </div>
  );
};
