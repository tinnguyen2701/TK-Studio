/* eslint-disable */
import React, { useState } from 'react';
import styled from 'styled-components';
import store from 'store';
import { REMOVE_USER_REQUEST, EDIT_STUDENT_REQUEST } from './ducks';

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
`;

export default ({ student }) => {
  const [visibleRemove, setVisibleRemove] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [name, setName] = useState(student.name || '');
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
    formData.append('reAvatar', reAvatar);

    store.dispatch({
      type: EDIT_STUDENT_REQUEST,
      payload: formData,
    });

    setReAvatar(null);
    setVisibleEdit(false);
  };

  return (
    <Tr>
      <div>
        <img src={student.avatar} alt="avatar student" />{' '}
        {visibleEdit && <input type="file" onChange={e => setReAvatarHandler(e)} />}
      </div>
      <div>
        {visibleEdit ? (
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
        ) : (
          student.name
        )}
      </div>
      <div>
        {!visibleEdit ? (
          <button type="button" onClick={() => setVisibleEdit(true)}>
            Chỉnh sửa
          </button>
        ) : (
          <span>
            <button type="button" onClick={() => onEditHandler(student._id)}>
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
            <button type="button" onClick={() => onRemoveHandler(student._id)}>
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
