/* eslint-disable */
import React, { useState } from 'react';
import store from 'store';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
  CHANGE_PASSWORD_ACCOUNT_REQUEST,
  UPDATE_IMAGE_STUDENT_DEFAULT_REQUEST,
  UPDATE_IMAGE_TEACHER_DEFAULT_REQUEST,
  ADD_VIDEO_REQUEST,
} from './ducks';
import Video from './Video';

const Form = styled.form`
  width: 50%;
  p {
    display: flex;
    align-items: center;
    margin: 5px 0;
    justify-content: space-between;
  }

  input {
    background: rgb(44, 166, 239);
    color: white;
    border: none;
    border-radius: 3px;
    padding: 5px;
  }
  input::placeholder {
    color: white;
  }
  button {
    cursor: pointer;
    background: rgb(44, 166, 239);
    border: none;
    padding: 5px;
    color: white;
    border-radius: 3px;
    margin: 5px 0;
    padding: 5px 20px;
  }

  button:disabled {
    cursor: default;
    background: none;
    color: black;
    border: 1px solid black;
  }
`;

const Image = styled.img`
  width: 90px;
  height: 90px;
`;

const ImageDefault = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    cursor: pointer;
    background: rgb(44, 166, 239);
    border: none;
    padding: 5px;
    color: white;
    border-radius: 3px;
    margin: 5px 0;
    padding: 5px 20px;
  }

  button:disabled {
    cursor: default;
    background: none;
    color: black;
    border: 1px solid black;
  }
`;

const Alert = styled.p`
  background: ${props => (props.status ? 'rgb(44, 166, 239);' : 'rgb(252, 32, 3)')};
  color: white;
`;

const VideoContainer = styled.div`
  padding-top: 100px;
  > button {
    padding: 7px;
    color: white;
    background: rgb(44, 166, 239);
    border: none;
    border-radius: 6px;
  }
  > .add-video {
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
      height: 70vh;
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
  }
`;

const Setting = ({ imageStudent, imageTeacher, status, videos }) => {
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [imageDefaultStudent, setImageDefaultStudent] = useState(null);
  const [imageDefaultTeacher, setImageDefaultTeacher] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [link, setLink] = useState(null);
  const [description, setDescription] = useState(null);
  const [poster, setPoster] = useState(null);

  const onChangePasswordHandler = e => {
    e.preventDefault();

    store.dispatch({
      type: CHANGE_PASSWORD_ACCOUNT_REQUEST,
      payload: { oldPassword, newPassword },
    });
  };

  const setImageStudentHandler = e => {
    e.persist();
    setImageDefaultStudent(e.target.files[0]);
  };

  const onChangeImageStudent = () => {
    const formData = new FormData();
    formData.append('imageStudent', imageDefaultStudent);

    store.dispatch({
      type: UPDATE_IMAGE_STUDENT_DEFAULT_REQUEST,
      payload: formData,
    });

    setImageDefaultStudent(null);
  };

  const setImageTeacherHandler = e => {
    e.persist();
    setImageDefaultTeacher(e.target.files[0]);
  };

  const onChangeImageTeacher = () => {
    const formData = new FormData();
    formData.append('imageTeacher', imageDefaultTeacher);

    store.dispatch({
      type: UPDATE_IMAGE_TEACHER_DEFAULT_REQUEST,
      payload: formData,
    });

    setImageDefaultTeacher(null);
  };

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

    store.dispatch({
      type: ADD_VIDEO_REQUEST,
      payload: formData,
    });

    setPoster(null);
    setLink(null);
    setDescription(null);
  };

  return (
    <div>
      <div>
        <Form onSubmit={e => onChangePasswordHandler(e)}>
          {status && <Alert status={status.success}>{status.message}</Alert>}
          <p>
            mật khẩu cũ:{' '}
            <input
              type="password"
              value={oldPassword || ''}
              onChange={e => setOldPassword(e.target.value)}
              placeholder="Nhập mật khẩu cũ"
            />
          </p>
          <p>
            mật khẩu mới:{' '}
            <input
              type="password"
              value={newPassword || ''}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="Nhập mật khẩu mới"
            />
          </p>
          <p>
            <button type="submit" disabled={!oldPassword || !newPassword}>
              Đổi
            </button>
          </p>
        </Form>
      </div>
      <ImageDefault>
        ảnh mặc định cho học viên: <Image src={imageStudent} alt="student avatar" />{' '}
        <input type="file" onChange={e => setImageStudentHandler(e)} />{' '}
        <button
          type="button"
          onClick={() => onChangeImageStudent()}
          disabled={!imageDefaultStudent}
        >
          Đổi liền
        </button>
      </ImageDefault>
      <ImageDefault>
        ảnh mặc định cho giảng viên: <Image src={imageTeacher} alt="teacher avatar" />{' '}
        <input type="file" onChange={e => setImageTeacherHandler(e)} />{' '}
        <button
          type="button"
          onClick={() => onChangeImageTeacher()}
          disabled={!imageDefaultTeacher}
        >
          Đổi liền
        </button>
      </ImageDefault>
      <VideoContainer>
        <button type="button" onClick={() => setIsVisible(true)}>
          Thêm video
        </button>
        {isVisible && (
          <div className="add-video">
            <div>
              <p>
                Thêm hình đại diện cho video:
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
                <button type="button" onClick={() => setIsVisible(false)}>
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
          </div>
        )}
        <div className="show-video">
          Các video hiện có:
          {videos.map((video, index) => (
            <Video key={index.toString()} video={video} />
          ))}
        </div>
      </VideoContainer>
    </div>
  );
};

export default connect(state => ({
  imageStudent: state.setting.imageStudent,
  imageTeacher: state.setting.imageTeacher,
  status: state.status,
  videos: state.videos,
}))(Setting);
