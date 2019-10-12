import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { GET_CURRENT_USER_REQUEST } from './ducks';

const Div = styled.div`
  display: flex;
  padding: 3% 8%;

  > div:nth-child(1) {
    width: 25%;
    border: 1px solid ${props => props.theme.color};
  }

  > div:nth-child(2) {
    width: 75%;
    border: 1px solid ${props => props.theme.color};
  }
`;

const Dashboard = ({ isAuthenticate, dispatch }) => {
  useEffect(() => {
    if (window.localStorage.getItem('JWT')) {
      dispatch({ type: GET_CURRENT_USER_REQUEST });
    } else {
      window.location.href = `${process.env.REACT_APP_BASE_URL}login`;
    }
  }, []);

  return (
    isAuthenticate && (
      <Div>
        <div>
          <p>
            <button type="button">teacher</button>
          </p>
          <p>
            <button type="button">student</button>
          </p>
          <p>
            <button type="button">tutorial</button>
          </p>
        </div>
        <div>frame</div>
      </Div>
    )
  );
};

export default connect(state => ({
  isAuthenticate: state.login,
}))(Dashboard);
