import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Student from './Student';
import Teacher from './Teacher';
import Tutorial from './Tutorial';
import Setting from './Setting';

const Wrapper = styled.div`
  width: 75%;
  border: 1px solid ${props => props.theme.color};
`;

const Frame = ({ tabVisible }) => {
  if (tabVisible === 'student')
    return (
      <Wrapper>
        <Student />
      </Wrapper>
    );
  if (tabVisible === 'teacher')
    return (
      <Wrapper>
        <Teacher />
      </Wrapper>
    );
  if (tabVisible === 'tutorial')
    return (
      <Wrapper>
        <Tutorial />
      </Wrapper>
    );
  if (tabVisible === 'setting')
    return (
      <Wrapper>
        <Setting />
      </Wrapper>
    );

  return (
    <Wrapper>
      <h1>T K ____ S T U D I O ____ A R T</h1>
    </Wrapper>
  );
};

export default connect(state => ({
  tabVisible: state.modal.tabVisible,
}))(Frame);
