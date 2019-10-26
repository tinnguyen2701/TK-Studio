import React from 'react';
import styled from 'styled-components';
import store from 'store';
import { UPDATE_FRAME_REQUEST } from './ducks';

const Wrapper = styled.div`
  width: 25%;

  > p > button {
    cursor: pointer;
    background: rgb(44, 166, 239);
    border: none;
    padding: 5px;
    color: white;
    border-radius: 3px;
    margin: 10px 0;
    padding: 5px 20px;
  }
`;

export default () => {
  const onClickSettingHandler = () => {
    store.dispatch({ type: UPDATE_FRAME_REQUEST, payload: 'setting' });
  };
  return (
    <Wrapper>
      <p>
        <button
          type="button"
          onClick={() => store.dispatch({ type: UPDATE_FRAME_REQUEST, payload: 'student' })}
        >
          student
        </button>
      </p>
      <p>
        <button
          type="button"
          onClick={() => store.dispatch({ type: UPDATE_FRAME_REQUEST, payload: 'teacher' })}
        >
          teacher
        </button>
      </p>
      <p>
        <button
          type="button"
          onClick={() => store.dispatch({ type: UPDATE_FRAME_REQUEST, payload: 'tutorial' })}
        >
          tutorial
        </button>
      </p>
      <p>
        <button type="button" onClick={() => onClickSettingHandler()}>
          setting
        </button>
      </p>
    </Wrapper>
  );
};
