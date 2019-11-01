/* eslint-disable */
import React, { useState } from 'react';
import styled from 'styled-components';
import store from 'store';
import { EDIT_VIDEO_REQUEST, REMOVE_VIDEO_REQUEST } from './ducks';

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0px;

  > a {
    color: rgb(44, 166, 239);
    padding: 0 15px;
  }

  button {
    padding: 7px;
    color: white;
    background: rgb(44, 166, 239);
    border: none;
    border-radius: 6px;
    margin-left: 15px;
    margin-top: 15px;
  }
`;

const EditVideo = styled.div`
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
    height: 85vh;
    width: 700px;
    padding: 0 10px;
    box-shadow: 3px 3px 30px rgba(0, 0, 0, 1);
    border-radius: 5px;

    > p {
      margin: 45px 0;

      > input,
      textarea {
        float: right;
        width: 375px;
        padding: 5px;
        border: 1px solid rgb(44, 166, 239);
      }

      > textarea {
        height: 185px;
      }
    }

    > p:nth-child(3) {
      display: flex;
      justify-content: space-between;
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
`;

export default ({ video }) => {
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [isConfirmEdit, setIsConfirmEdit] = useState(false);
  const [link, setLink] = useState(video.link);
  const [description, setDescription] = useState(video.description);
  const [poster, setPoster] = useState(video.poster);
  const displayPoster = video.poster;

  const setPosterHandler = e => {
    e.persist();
    setPoster(e.target.files[0]);
  };

  const onSaveHandler = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('link', link);
    formData.append('description', description);
    formData.append('poster', poster);
    formData.append('id', video._id);

    store.dispatch({
      type: EDIT_VIDEO_REQUEST,
      payload: formData,
    });

    setIsConfirmEdit(false);
  };

  return (
    <div>
      <Div>
        <img src={video.poster} alt="anh" height="200px" />
        <a href={video.link} target="_blank">
          {video.link}
        </a>
        {!isConfirmDelete && (
          <span>
            <button type="button" onClick={() => setIsConfirmDelete(true)}>
              Xóa
            </button>
            <button type="button" onClick={() => setIsConfirmEdit(true)}>
              Sửa
            </button>
          </span>
        )}
        {isConfirmDelete && (
          <span>
            <button
              type="button"
              onClick={() =>
                store.dispatch({ type: REMOVE_VIDEO_REQUEST, payload: { id: video._id } })
              }
            >
              Xóa liền
            </button>
            <button type="button" onClick={() => setIsConfirmDelete(false)}>
              Hủy bỏ
            </button>
          </span>
        )}
      </Div>
      {isConfirmEdit && (
        <EditVideo>
          <div>
            <p>
              Thêm hình đại diện cho video:
              <img src={displayPoster} alt="poster" height="100px" />
              <input type="file" onChange={e => setPosterHandler(e)} />
            </p>
            <p>
              Thêm link youtube:
              <input
                type="text"
                placeholder="link.."
                value={link || ''}
                onChange={e => setLink(e.target.value)}
              />
            </p>
            <p>
              Thêm mô tả:
              <textarea
                type="text"
                placeholder="mô tả.."
                value={description || ''}
                onChange={e => setDescription(e.target.value)}
              />
            </p>
            <p>
              <button type="button" onClick={() => setIsConfirmEdit(false)}>
                Cancel
              </button>
              <button
                type="button"
                disabled={!poster || !description || !link}
                onClick={e => onSaveHandler(e)}
              >
                Save
              </button>
            </p>
          </div>
        </EditVideo>
      )}
    </div>
  );
};
