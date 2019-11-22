/* eslint-disable */
import React, { useState } from 'react';
import styled from 'styled-components';
import store from 'store';
import { ADD_TAG_REQUEST, REMOVE_TAG_REQUEST, ADD_POST_REQUEST } from './ducks';
import { connect } from 'react-redux';

const Div = styled.form`
  > button {
    cursor: pointer;
    background: rgb(44, 166, 239);
    border: none;
    padding: 5px;
    color: white;
    border-radius: 3px;
  }

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
      width: 700px;
      box-shadow: 3px 3px 30px rgba(0, 0, 0, 1);
      border-radius: 5px;

      > div:nth-child(1) {
        margin-bottom: 20px;

        > input {
          width: 100%;
          padding: 5px;
          font-size: 17px;
          outline: none;
        }

        > div {
          padding: 5px 0 0 5px;
          font-size: 16px;
          display: flex;
          justify-content: space-between;
          background: #f5f6f7;

          > button {
            position: relative;
            width: 30px;
            height: 30px;
            border: none;
            background: none;

            ::after,
            ::before {
              content: '';
              position: absolute;
              width: 23px;
              height: 2px;
              background: black;
              border-radius: 1px;
            }
            ::after {
              bottom: 60%;
              left: 2px;
              transform: rotate(135deg) translateY(-50%);
            }
            ::before {
              top: 40%;
              left: 2px;
              transform: rotate(45deg) translateY(-50%);
            }
          }
        }
      }

      > div:nth-child(2) {
        padding: 5px 0 0 5px;
        background: #f5f6f7;
        font-size: 16px;
      }

      > div:nth-child(3) {
        margin-bottom: 10px;
        > textarea {
          width: 100%;
          height: auto;
          min-height: 200px;
          border: none;
          border-bottom: 1px solid #f6f7f8;
          outline: none;
          padding: 5px 0 0 5px;
          font-size: 18px;
        }
        > ul {
          padding: 5px 5px 0 5px;
          display: flex;
          list-style: none;
          justify-content: space-between;

          li:nth-child(1),
          li:nth-child(2) {
            button {
              border: none;
              background: #f2f3f5;
              padding: 5px;
              border-radius: 4px;
              cursor: pointer;
            }
          }
        }
        > button {
          border: none;
          background: rgb(66, 103, 178);
          color: white;
          text-align: center;
          width: 100%;
          padding: 5px;
          font-weight: bold;
          cursor: pointer;
        }

        .media {
          margin-bottom: 20px;

          p {
            margin: 10px 5px;
          }

          button {
            border: none;
            padding: 8px;
            border-radius: 5px;
            margin-left: 10px;
            cursor: pointer;
          }

          input {
            width: 65%;
            padding: 5px;
            font-size: 15px;
            margin-left: 20px;
          }

          .list-video {
            display: block;
            font-size: 14px;
            color: steelblue;

            > span {
              display: block;
              padding-left: 15px;
              margin: 5px 0;
            }
          }

          .hidden {
            opacity: 0;
            height: 0;
            width: 0;
          }

          label {
            background: #f5f6f7;
            font-size: 14px;
            margin-left: 10px;
            padding: 4px;
            border-radius: 2px;
          }
        }

        .tag {
          padding: 10px 5px;
          font-size: 14px;

          > span {
            padding: 5px 10px;
          }

          > p {
            margin: 10px 0;
          }
          > p > input {
            margin-left: 15px;
            width: 40%;
            padding: 3px;
            font-size: 16px;
          }

          button {
            cursor: pointer;
            border: none;
            padding: 8px;
            border-radius: 5px;
            margin-left: 10px;
          }
        }
      }
    }
  }
`;

const AddBlog = ({ displayTags }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleMedia, setIsVisibleMedia] = useState(false);
  const [isVisibleTag, setIsVisibleTag] = useState(false);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [images, setImages] = useState(null);
  const [linkVideo, setLinkVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [tag, setTag] = useState(null);
  const [tags, setTags] = useState([]);
  const [numberOfImages, setNumberOfImages] = useState(0);

  const [isPopulate, setIsPopulate] = useState(false);

  const onSubmitHandler = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('isPopulate', isPopulate);

    if (videos) {
      for (const video of videos) {
        formData.append('videos[]', video);
      }
    }

    if (tags) {
      for (const tag of tags) {
        formData.append('tags[]', tag);
      }
    }

    if (images) {
      for (const image of images) {
        formData.append('images[]', image, image.name);
      }
    }

    store.dispatch({
      type: ADD_POST_REQUEST,
      payload: formData,
    });

    setTitle(null);
    setDescription(null);
    setVideos([]);
    setTags([]);
    setIsPopulate(false);
    setImages(null);
  };

  const setImagesHandler = e => {
    e.persist();
    setNumberOfImages(e.target.files.length);
    setImages(e.target.files);
  };

  const onLinkVideoHandler = () => {
    setVideos([...videos, linkVideo]);
    setLinkVideo(null);
  };

  const visibleMediaHandler = () => {
    setIsVisibleMedia(true);
    setIsVisibleTag(false);
  };

  const visibleTagHandler = () => {
    setIsVisibleMedia(false);
    setIsVisibleTag(true);
  };

  const addTagHandler = () => {
    store.dispatch({ type: ADD_TAG_REQUEST, payload: { tag: tag } });
    setTag(null);
  };

  const onChangeTag = e => {
    if (tags.includes(e.target.value)) {
      setTags(tags.filter(tag => tag != e.target.value));
    } else {
      setTags([...tags, e.target.value]);
    }
  };

  const removeTagsHandler = () => {
    store.dispatch({ type: REMOVE_TAG_REQUEST, payload: { tags: tags } });
    setTags([]);
  };

  return (
    <Div>
      <button type="button" onClick={() => setIsVisible(true)}>
        Thêm blog
      </button>
      {isVisible && (
        <div className="add-blog">
          <div>
            <div>
              <div>
                <span>Tên Bài viết: </span>
                <button type="button" onClick={() => setIsVisible(false)} />
              </div>

              <input
                type="text"
                placeholder="Tên Bài viết.."
                value={title || ''}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            <div>Viết: </div>
            <div>
              <textarea
                type="text"
                placeholder="Mô tả.."
                value={description || ''}
                onChange={e => setDescription(e.target.value)}
              />
              <ul>
                <li>
                  <button type="button" onClick={() => visibleMediaHandler()}>
                    Ảnh/video
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => visibleTagHandler()}>
                    Gắn thẻ
                  </button>
                </li>
                <li>
                  Phổ biến <input type="checkbox" onChange={() => setIsPopulate(!isPopulate)} />
                </li>
              </ul>
              {isVisibleMedia && (
                <div className="media">
                  <p>
                    Thêm các ảnh:
                    <label htmlFor="files">Select files</label>
                    <input
                      type="file"
                      id="files"
                      className="hidden"
                      multiple
                      onChange={e => setImagesHandler(e)}
                    />
                    <i>{numberOfImages} ảnh được chọn</i>
                  </p>
                  <p>
                    Thêm các video:
                    <input
                      type="text"
                      placeholder="link video.."
                      value={linkVideo || ''}
                      onChange={e => setLinkVideo(e.target.value)}
                    />
                    <button type="button" onClick={() => onLinkVideoHandler()}>
                      Thêm
                    </button>
                    <span className="list-video">
                      {videos &&
                        videos.length > 0 &&
                        videos.map((video, index) => (
                          <span key={index.toString()}>
                            {video}{' '}
                            <button
                              type="button"
                              onClick={() => setVideos(videos.filter(item => item != video))}
                            >
                              Xóa
                            </button>
                          </span>
                        ))}
                    </span>
                  </p>
                </div>
              )}
              {isVisibleTag && (
                <div className="tag">
                  {displayTags.length > 0 &&
                    displayTags.map(tag => (
                      <span key={tag}>
                        <input
                          value={tag || ''}
                          type="checkbox"
                          onChange={e => onChangeTag(e)}
                          checked={tags.includes(tag)}
                        />
                        &nbsp;{tag}
                      </span>
                    ))}
                  {tags.length > 0 && (
                    <p>
                      <button type="button" onClick={() => removeTagsHandler()}>
                        Xóa tag
                      </button>
                    </p>
                  )}
                  <p>
                    Thêm tag :
                    <input
                      type="text"
                      placeholder="tag.."
                      value={tag || ''}
                      onChange={e => setTag(e.target.value)}
                    />
                    <button type="button" onClick={() => addTagHandler()}>
                      Thêm
                    </button>
                  </p>
                </div>
              )}
              <button disabled={!title} type="button" onClick={e => onSubmitHandler(e)}>
                Đăng
              </button>
            </div>
          </div>
        </div>
      )}
    </Div>
  );
};

export default connect(state => ({
  displayTags: state.setting.tags,
}))(AddBlog);
