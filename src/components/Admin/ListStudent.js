import React from 'react';
import styled from 'styled-components';

const Tr = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default () => {
  return (
    <div>
      <Tr>
        <div>avatar</div>
        <div>ten</div>
        <div>Other</div>
      </Tr>
    </div>
  );
};
