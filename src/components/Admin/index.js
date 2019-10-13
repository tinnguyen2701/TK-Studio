import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { GET_CURRENT_USER_REQUEST } from './ducks';
import Navigation from './Navigation';
import Frame from './Frame';

const Div = styled.div`
  display: flex;
  padding: 3% 8%;
`;

const Dashboard = ({ isAuthenticate, dispatch }) => {
  useEffect(() => {
    if (window.localStorage.getItem('JWT')) {
      dispatch({ type: GET_CURRENT_USER_REQUEST });
    } else {
      window.location.href = `${process.env.REACT_APP_BASE_URL}login`;
    }
  }, []);

  const signOut = () => {
    window.localStorage.removeItem('JWT');
    window.location.href = `${process.env.REACT_APP_BASE_URL}login`;
  };

  return (
    isAuthenticate && (
      <div>
        <Link to="/">Home </Link>
        <button type="button" onClick={() => signOut()}>
          Sign out
        </button>
        <Div>
          <Navigation />
          <Frame />
        </Div>
      </div>
    )
  );
};

export default connect(state => ({
  isAuthenticate: state.login,
}))(Dashboard);
