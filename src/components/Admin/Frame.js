import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Student from './Student';
import Teacher from './Teacher';
import Tutorial from './Tutorial';
import Setting from './Setting';
import Blog from '../Blog';

const Wrapper = styled.div`
  width: 85%;
`;

const Frame = ({ tabVisible, users }) => {
  const students = users.filter(user => user.role === 'student');
  const teachers = users.filter(user => user.role === 'teacher');

  if (tabVisible === 'student')
    return (
      <Wrapper>
        <Student students={students} />
      </Wrapper>
    );
  if (tabVisible === 'teacher')
    return (
      <Wrapper>
        <Teacher teachers={teachers} />
      </Wrapper>
    );
  if (tabVisible === 'tutorial')
    return (
      <Wrapper>
        <Tutorial />
      </Wrapper>
    );

  if (tabVisible === 'blog')
    return (
      <Wrapper>
        <Blog />
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
      {/* <Blog /> */}
    </Wrapper>
  );
};

export default connect(state => ({
  tabVisible: state.modal.tabVisible,
  users: state.users,
}))(Frame);
