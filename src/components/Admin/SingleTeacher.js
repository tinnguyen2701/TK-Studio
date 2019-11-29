/* eslint-disable */
import React, { useState } from 'react';
import styled from 'styled-components';
import store from 'store';
import { REMOVE_USER_REQUEST, EDIT_TEACHER_REQUEST } from './ducks';

const Div = styled.div`
  display: flex;
  align-items: center;
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
`;

const Tr = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
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
    margin-left: 5px;
  }
`;

export default ({ teacher }) => {
  const [visibleRemove, setVisibleRemove] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [name, setName] = useState(teacher.name || '');
  const [job, setJob] = useState(teacher.job || '');
  const [reAvatar, setReAvatar] = useState(null);

  const setReAvatarHandler = e => {
    e.persist();
    setReAvatar(e.target.files[0]);
  };

  const onRemoveHandler = id => {
    store.dispatch({ type: REMOVE_USER_REQUEST, payload: { id } });
    setVisibleRemove(false);
  };

  const onEditHandler = id => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', name);
    formData.append('job', job);
    formData.append('reAvatar', reAvatar);

    store.dispatch({
      type: EDIT_TEACHER_REQUEST,
      payload: formData,
    });

    setReAvatar(null);
    setVisibleEdit(false);
  };

  return (
    <Tr>
      <Div>
        <img src={teacher.avatar} alt="avatar teacer" />{' '}
        {visibleEdit && <input type="file" onChange={e => setReAvatarHandler(e)} />}
      </Div>
      <Div>
        {visibleEdit ? (
          <span>
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
            &nbsp; &nbsp;
            <input type="text" value={job} onChange={e => setJob(e.target.value)} />
          </span>
        ) : (
          teacher.name
        )}
      </Div>
      <div>
        {!visibleEdit ? (
          <button type="button" onClick={() => setVisibleEdit(true)}>
            Chỉnh sửa
          </button>
        ) : (
          <span>
            <button type="button" onClick={() => onEditHandler(teacher._id)}>
              Xác nhận
            </button>
            <button type="button" onClick={() => setVisibleEdit(false)}>
              Hủy
            </button>
          </span>
        )}

        {!visibleRemove ? (
          <button type="button" onClick={() => setVisibleRemove(true)}>
            Xóa
          </button>
        ) : (
          <span>
            {' '}
            <button type="button" onClick={() => onRemoveHandler(teacher._id)}>
              Xác nhận
            </button>
            <button type="button" onClick={() => setVisibleRemove(false)}>
              Hủy
            </button>
          </span>
        )}
      </div>
    </Tr>
  );
};
