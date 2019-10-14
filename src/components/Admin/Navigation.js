import React from 'react';
import styled from 'styled-components';
import store from 'store';
import { UPDATE_FRAME_REQUEST } from './ducks';

const Wrapper = styled.div`
  width: 25%;
  border: 1px solid ${props => props.theme.color};
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
