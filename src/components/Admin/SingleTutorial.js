/* eslint-disable */
import React, { useState } from 'react';
import styled from 'styled-components';
import store from 'store';
import { REMOVE_TUTORIAL_REQUEST, EDIT_TUTORIAL_REQUEST } from './ducks';

const Div = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  img {
    width: 120px;
    height: 120px;
  }
`;

const Modal = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
  top: 0;
  left: 0;
  overflow: auto;

  img {
    width: 80px;
    height: 80px;
  }
`;

const Wrapper = styled.div`
  position: absolute;
  width: 50%;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 10px;

  margin-top: 450px;

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

export default ({ tutorial }) => {
  const [nameCourse, setNameCourse] = useState(tutorial.nameCourse);
  const [description, setDescription] = useState(tutorial.description);
  const [object, setObject] = useState(tutorial.object);
  const [subject, setSubject] = useState(tutorial.subject);
  const [content, setContent] = useState(tutorial.content);
  const [requirement, setRequirement] = useState(tutorial.requirement);
  const [start, setStart] = useState(tutorial.start);
  const [visibleRemove, setVisibleRemove] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [poster, setPoster] = useState(null);
  const [imageObject, setImageObject] = useState(null);
  const [imageContent, setImageContent] = useState(null);
  const [imageRequirement, setImageRequirement] = useState(null);

  const [images, setImages] = useState(null);

  const displayPoster = tutorial.poster;
  const displayImageObject = tutorial.imageObject;
  const displayImageContent = tutorial.imageContent;
  const displayImageRequirement = tutorial.imageRequirement;
  const displayImages = tutorial.images;

  const onSubmitHandler = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('id', tutorial._id);
    formData.append('nameCourse', nameCourse);
    formData.append('description', description);
    formData.append('object', object);
    formData.append('subject', subject);
    formData.append('content', content);
    formData.append('requirement', requirement);
    formData.append('start', start);
    formData.append('poster', poster);
    formData.append('imageObject', imageObject);
    formData.append('imageContent', imageContent);
    formData.append('imageRequirement', imageRequirement);

    if (images) {
      for (const image of images) {
        formData.append('images[]', image, image.name);
      }
    }

    store.dispatch({
      type: EDIT_TUTORIAL_REQUEST,
      payload: formData,
    });
    setVisibleEditModal(false);
  };

  const onRemoveHandler = id => {
    store.dispatch({ type: REMOVE_TUTORIAL_REQUEST, payload: { id } });
    setVisibleRemove(false);
  };

  const visibleEditHandler = () => {
    setVisibleEditModal(true);
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
    <Div>
      <div>{tutorial.nameCourse}</div>
      <div>
        <img src={tutorial.poster} alt="anh khoa hoc" />
      </div>
      <div>
        <button type="button" onClick={() => visibleEditHandler()}>
          Chỉnh sửa
        </button>

        {!visibleRemove ? (
          <button
            type="button"
            onClick={() => setVisibleRemove(true)}
            style={{ marginLeft: '5px' }}
          >
            Xóa
          </button>
        ) : (
          <span>
            {' '}
            <button type="button" onClick={() => onRemoveHandler(tutorial._id)}>
              Xác nhận
            </button>
            <button type="button" onClick={() => setVisibleRemove(false)}>
              Hủy
            </button>
          </span>
        )}
      </div>
      {visibleEditModal && (
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
                  cols="10"
                  rows="5"
                  type="text"
                  placeholder="mô tả.."
                  value={description || ''}
                  onChange={e => setDescription(e.target.value)}
                />
              </p>
              <div>
                Poster:{' '}
                <p className="poster">
                  <img src={displayPoster} alt="anh poster" />
                </p>
                <p>
                  <input type="file" onChange={e => setPosterHandler(e)} />
                </p>
              </div>
              <p>
                Đối tượng:{' '}
                <textarea
                  type="text"
                  placeholder="đối tượng.."
                  value={object || ''}
                  onChange={e => setObject(e.target.value)}
                />
              </p>
              <div>
                Thêm image cho đối tượng:{' '}
                <p>
                  <img src={displayImageObject} alt="anh poster object" />
                </p>
                <p>
                  <input type="file" onChange={e => setImageObjectHandler(e)} />
                </p>
              </div>
              <p>
                Nội dung:{' '}
                <textarea
                  type="text"
                  placeholder="nội dung.."
                  value={content || ''}
                  onChange={e => setContent(e.target.value)}
                />
              </p>
              <div>
                Thêm image cho nội dung:{' '}
                <p>
                  <img src={displayImageContent} alt="anh poster content" />
                </p>
                <p>
                  <input type="file" onChange={e => setContentHandler(e)} />
                </p>
              </div>
              <p>
                Yêu cầu:{' '}
                <textarea
                  type="text"
                  placeholder="yêu cầu.."
                  value={requirement || ''}
                  onChange={e => setRequirement(e.target.value)}
                />
              </p>
              <div>
                Thêm image cho yêu cầu:{' '}
                <p>
                  <img src={displayImageRequirement} alt="anh poster requirement" />
                </p>
                <p>
                  <input type="file" onChange={e => setImageRequirementHandler(e)} />
                </p>
              </div>
              <p>
                Ngày khai giảng:{' '}
                <textarea
                  type="text"
                  placeholder="ngày khai giảng.."
                  value={start || ''}
                  onChange={e => setStart(e.target.value)}
                />
              </p>
              <div>
                <p>Images (Tối đa 20 ảnh):</p>
                <div>
                  {displayImages.map((image, index) => (
                    <img
                      style={{ margin: '5px' }}
                      key={index.toString()}
                      src={image}
                      alt="anh art"
                    />
                  ))}
                </div>
                <div>
                  <input type="file" multiple onChange={e => setImagesHandler(e)} />
                </div>
              </div>
              <p>
                <button type="submit" style={{ marginRight: '5px' }}>
                  Xác nhận
                </button>
                <button type="button" onClick={() => setVisibleEditModal(false)}>
                  Hủy
                </button>
              </p>
            </form>
          </Wrapper>
        </Modal>
      )}
    </Div>
  );
};
