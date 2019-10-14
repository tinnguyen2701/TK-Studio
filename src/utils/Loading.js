import React from 'react';
import styled from 'styled-components';

const Span = styled.span`
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #eee;
  border-top-color: #928a8a;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;
export default () => <Span />;
