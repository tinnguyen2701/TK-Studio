/* eslint-disable */
import React, { useState } from 'react';
import styled from 'styled-components';
import store from 'store';
import { ADD_TUTORIAL_REQUEST } from './ducks';
import { connect } from 'react-redux';
import SingleTutorial from './SingleTutorial';

const Modal = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
  top: 0;
  left: 0;
  overflow: auto;
`;

const Wrapper = styled.div`
  position: absolute;
  width: 50%;
  height: auto;
  top: 50%;
  left: 50%;
  background: white;
  padding: 10px;
  transform: translate(-50%, -50%);
  border: 1px solid black;

  margin-top: 200px;

  form p {
    textarea {
      width: 100%;
      height: 100px;
      border: 1px solid rgb(44, 166, 239);
      padding: 5px;
    }

    input {
      border: 1px solid rgb(44, 166, 239);
      padding: 5px;
    }
  }
`;

const WrapperTutorial = styled.div`
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

const Tutorials = ({ tutorials }) => {
  const [nameCourse, setNameCourse] = useState(null);
  const [description, setDescription] = useState(null);
  const [poster, setPoster] = useState(null);
  const [object, setObject] = useState(null);
  const [subject, setSubject] = useState(null);
  const [content, setContent] = useState(null);
  const [requirement, setRequirement] = useState(null);
  const [start, setStart] = useState(null);
  const [images, setImages] = useState(null);
  const [visible, setVisible] = useState(false);
  const [imageObject, setImageObject] = useState(null);
  const [imageContent, setImageContent] = useState(null);
  const [imageRequirement, setImageRequirement] = useState(null);

  const onSubmitHandler = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nameCourse', nameCourse);
    formData.append('description', description);
    formData.append('poster', poster);
    formData.append('imageObject', imageObject);
    formData.append('imageContent', imageContent);
    formData.append('imageRequirement', imageRequirement);
    formData.append('object', object);
    formData.append('subject', subject);
    formData.append('content', content);
    formData.append('requirement', requirement);
    formData.append('start', start);

    if (images) {
      for (const image of images) {
        formData.append('images[]', image, image.name);
      }
    }

    store.dispatch({
      type: ADD_TUTORIAL_REQUEST,
      payload: formData,
    });

    setNameCourse(null);
    setDescription(null);
    setPoster(null);
    setObject(null);
    setSubject(null);
    setContent(null);
    setRequirement(null);
    setStart(null);
    setImages(null);
  };

  const setPosterHandler = e => {
    e.persist();
    setPoster(e.target.files[0]);
  };

  const setImageObjectHandler = e => {
    e.persist();
    setImageObject(e.target.files[0]);
  };

  const setContentHandler = e => {
    e.persist();
    setImageContent(e.target.files[0]);
  };

  const setImageRequirementHandler = e => {
    e.persist();
    setImageRequirement(e.target.files[0]);
  };

  const setImagesHandler = e => {
    e.persist();
    setImages(e.target.files);
  };

  return (
    <WrapperTutorial>
      <button type="button" onClick={() => setVisible(true)}>
        Thêm khóa học
      </button>
      {visible && (
        <Modal>
          <Wrapper>
            <form onSubmit={e => onSubmitHandler(e)}>
              <p>
                Tên khóa học:{' '}
                <input
                  type="text"
                  placeholder="tên khóa.."
                  value={nameCourse || ''}
                  onChange={e => setNameCourse(e.target.value)}
                />
              </p>
              <p>
                Chủ đề:{' '}
                <textarea
                  type="text"
                  placeholder="chủ đề.."
                  value={subject || ''}
                  onChange={e => setSubject(e.target.value)}
                />
              </p>
              <p>
                Mô tả:{' '}
                <textarea
                  type="text"
                  placeholder="mô tả.."
                  value={description || ''}
                  onChange={e => setDescription(e.target.value)}
                />
              </p>
              <p>
                Ảnh cho khóa học:
                <input
                  type="file"
                  placeholder="ảnh cho khóa học.."
                  onChange={e => setPosterHandler(e)}
                />
              </p>{' '}
              <p>
                Đối tượng:{' '}
                <textarea
                  type="text"
                  placeholder="đối tượng.."
                  value={object || ''}
                  onChange={e => setObject(e.target.value)}
                />
              </p>
              <p>
                Ảnh cho đối tượng:
                <input
                  type="file"
                  placeholder="ảnh cho đối tượng.."
                  onChange={e => setImageObjectHandler(e)}
                />
              </p>
              <p>
                Nội dung:{' '}
                <textarea
                  type="text"
                  placeholder="nội dung.."
                  value={content || ''}
                  onChange={e => setContent(e.target.value)}
                />
              </p>
              <p>
                Ảnh cho nội dung:
                <input
                  type="file"
                  placeholder="ảnh cho nội dung.."
                  onChange={e => setContentHandler(e)}
                />
              </p>
              <p>
                Yêu cầu:{' '}
                <textarea
                  type="text"
                  placeholder="yêu cầu.."
                  value={requirement || ''}
                  onChange={e => setRequirement(e.target.value)}
                />
              </p>
              <p>
                Ảnh cho yêu cầu:
                <input
                  type="file"
                  placeholder="ảnh cho yêu cầu.."
                  onChange={e => setImageRequirementHandler(e)}
                />
              </p>
              <p>
                Ngày khai giảng:{' '}
                <textarea
                  type="text"
                  placeholder="ngày khai giảng.."
                  value={start || ''}
                  onChange={e => setStart(e.target.value)}
                />
              </p>
              <p>
                Images (Tối đa 20 ảnh):
                <input type="file" multiple onChange={e => setImagesHandler(e)} />
              </p>
              <p>
                <button
                  type="submit"
                  style={{ marginRight: '5px' }}
                  disabled={
                    !nameCourse ||
                    !description ||
                    !poster ||
                    !object ||
                    !content ||
                    !requirement ||
                    !start ||
                    !images ||
                    !imageObject ||
                    !imageContent ||
                    !imageRequirement
                  }
                >
                  Thêm khóa học
                </button>
                <button type="button" onClick={() => setVisible(false)}>
                  Hủy bỏ
                </button>
              </p>
            </form>
          </Wrapper>
        </Modal>
      )}

      <h3>Danh sách các khóa học: </h3>
      {tutorials.map((tutorial, index) => (
        <SingleTutorial key={index.toString()} tutorial={tutorial} />
      ))}
    </WrapperTutorial>
  );
};

export default connect(state => ({
  tutorials: state.tutorials,
}))(Tutorials);
