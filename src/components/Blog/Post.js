/* eslint-disable */
import React, { useState } from 'react';
import styled from 'styled-components';
import store from 'store';
import { REMOVE_POST_REQUEST, EDIT_POST_REQUEST } from './ducks';

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 15px 0;

  > span {
    display: block;
    flex: 1;
  }

  > span:nth-child(1) {
  }
  > span:nth-child(2) {
    color: steelblue;
  }
  > span:nth-child(3) {
    text-align: right;
    button {
      cursor: pointer;
      background: rgb(44, 166, 239);
      border: none;
      padding: 5px;
      color: white;
      border-radius: 3px;
      margin-right: 5px;
      margin-top: 5px;
    }
  }

  .edit-blog {
    text-align: left;
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    padding: 3% 0;

    > div {
      background: white;
      width: 700px;
      box-shadow: 3px 3px 30px rgba(0, 0, 0, 1);
      border-radius: 5px;
      overflow-y: auto;
      max-height: 100%;
      overflow-x: hidden;

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
              color: black;
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

export default ({ post }) => {
  const [isVisibleRemove, setIsVisibleRemove] = useState(false);
  const [isVisibleEdit, setIsVisibleEdit] = useState(false);
  const [isVisibleMedia, setIsVisibleMedia] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [isVisibleTag, setIsVisibleTag] = useState(false);
  const [description, setDescription] = useState(
    post.description !== 'null' ? post.description : null,
  );
  const [images, setImages] = useState(null);
  const [displayImages, setDisplayImages] = useState(post.images);
  const [linkVideo, setLinkVideo] = useState(null);
  const [videos, setVideos] = useState(post.videos);
  const [tag, setTag] = useState(null);
  const [tags, setTags] = useState(post.tags || []);
  const [numberOfImages, setNumberOfImages] = useState(post.images.length);
  const [isPopulate, setIsPopulate] = useState(post.isPopulate);

  const onRemovePostHandler = () => {
    store.dispatch({ type: REMOVE_POST_REQUEST, payload: { id: post._id } });
  };

  const onSubmitHandler = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('isPopulate', isPopulate);
    formData.append('id', post._id);

    if (displayImages) {
      for (const image of displayImages) {
        formData.append('displayImages[]', image);
      }
    }

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
      type: EDIT_POST_REQUEST,
      payload: formData,
    });

    setIsVisibleEdit(false);
  };

  const setImagesHandler = e => {
    e.persist();
    setNumberOfImages(e.target.files.length + displayImages.length);
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
    setTags([...tags, tag]);
    setTag(null);
  };

  const onChangeTag = e => {
    setTags(tags.filter(item => item !== e.target.value));
  };

  const onRemoveImageHandler = value => {
    setNumberOfImages(numberOfImages - 1);
    setDisplayImages(displayImages.filter(img => img !== value));
  };

  return (
    <Div>
      <span>{post.title}</span>
      <span>
        {post.tags &&
          post.tags.length > 0 &&
          post.tags.map((item, index) => <span key={index.toString()}>{item}&nbsp;&nbsp;</span>)}
      </span>
      <span>
        <button type="button" onClick={() => setIsVisibleEdit(true)}>
          Edit
        </button>
        {!isVisibleRemove && (
          <button type="button" onClick={() => setIsVisibleRemove(true)}>
            Remove
          </button>
        )}
        {isVisibleRemove && (
          <span>
            <button type="button" onClick={() => onRemovePostHandler()}>
              Xóa liền
            </button>
            <button type="button" onClick={() => setIsVisibleRemove(false)}>
              Hủy
            </button>
          </span>
        )}
        {isVisibleEdit && (
          <div className="edit-blog">
            <div>
              <div>
                <div>
                  <span>Tên Bài viết: </span>
                  <button type="button" onClick={() => setIsVisibleEdit(false)} />
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
                    <button type="button" onClick={() => visibleMediaHandler(true)}>
                      Ảnh/video
                    </button>
                  </li>
                  <li>
                    <button type="button" onClick={() => visibleTagHandler(true)}>
                      Gắn thẻ
                    </button>
                  </li>
                  <li>
                    Phổ biến{' '}
                    <input
                      type="checkbox"
                      checked={isPopulate}
                      onChange={() => setIsPopulate(!isPopulate)}
                    />
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
                      <br />
                      {displayImages.map((img, index) => (
                        <span key={index.toString()}>
                          <img height="100px" src={img} />
                          <button type="button" onClick={() => onRemoveImageHandler(img)}>
                            Xóa
                          </button>
                        </span>
                      ))}
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
                        {videos.map((video, index) => (
                          <span key={index.toString()}>
                            {video}{' '}
                            <button
                              type="button"
                              onClick={() => setVideos(videos.filter(item => item !== video))}
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
                    {tags &&
                      tags.length > 0 &&
                      tags.map((item, index) => (
                        <span key={item}>
                          <input
                            key={index.toString()}
                            value={item || ''}
                            type="checkbox"
                            onChange={e => onChangeTag(e)}
                            checked={!!true}
                          />
                          &nbsp;{item}
                        </span>
                      ))}
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
                  Cập nhật
                </button>
              </div>
            </div>
          </div>
        )}
      </span>
    </Div>
  );
};
