import React, { useState } from 'react';
import styled from 'styled-components';

const Div = styled.div`
  .add-blog {
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;

    > div {
      background: white;
      height: 90vh;
      width: 90%;
      padding: 0 10px;
      box-shadow: 3px 3px 30px rgba(0, 0, 0, 1);
      border-radius: 5px;

      > div.body-blog {
        display: flex;
        padding: 2% 0;

        > div:nth-child(1) {
          flex: 3;
          border: 1px solid;
        }
        > div:nth-child(2) {
          flex: 1;
          border: 1px solid;
        }
      }

      > p:nth-child(4) {
        > button {
          float: right;
          margin-left: 12px;
          padding: 7px;
          color: white;
          background: rgb(44, 166, 239);
          border: none;
          border-radius: 6px;
        }

        > button:disabled {
          color: black;
          background: none;
          border: 1px solid black;
        }
      }
    }
  }
`;

export default () => {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <Div>
      <button type="button" onClick={() => setIsVisible(true)}>
        Thêm blog
      </button>
      {isVisible && (
        <div className="add-blog">
          <div>
            <div className="body-blog">
              <div>
                <div>
                  <p>Tên Post</p>
                  <input type="text" />
                </div>
                <div>
                  <p>Thêm </p>
                </div>
              </div>
              <div>ADD tag</div>
            </div>
            <p>
              <button type="button" onClick={() => setIsVisible(false)}>
                Cancel
              </button>
              <button type="button">Save</button>
            </p>
          </div>
        </div>
      )}
    </Div>
  );
};
