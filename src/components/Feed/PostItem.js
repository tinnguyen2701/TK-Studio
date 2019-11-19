/* eslint-disable */
import React, { useState } from 'react';
import styled from 'styled-components';

const Div = styled.div`
  > div {
    border-bottom: 2px solid rgb(44, 166, 239);
    padding-bottom: 25px;
    margin-bottom: 35px;
    > p:first-child {
      color: rgb(44, 166, 239);
      font-size: 35px;
      font-weight: bold;
      letter-spacing: 1px;
    }
    > div {
      color: #798a9c;
      margin: 10px 0;

      .divide {
        margin: 0 15px;
      }

      @media screen and (max-width: 800px) {
        .divide {
          margin: 0 5px;
        }
      }
    }
    > pre {
      white-space: pre-line;
      font-family: font_strong;
      margin-bottom: 20px;
      font-size: 19px;

      ${props =>
        !props.isShowMore &&
        'text-overflow: ellipsis; -webkit-line-clamp: 4; display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden; max-height: 95px'};
    }

    > img {
      display: ${props => (props.isShowMore ? 'block' : 'none')};
      max-width: 100%;
      margin: 10px 0;

      :hover {
        box-shadow: 1px 1px 3px rgb(0, 0, 0, 0.2), -1px -1px 3px rgb(0, 0, 0, 0.2);
      }
    }

    > iframe {
      display: ${props => (props.isShowMore ? 'block' : 'none')};
      width: 100%;
      height: 400px;
      margin: 15px 0;
    }

    > p:last-child {
      padding: 5px 0;
      > button {
        display: flex;
        align-items: center;
        background: none;
        border: none;
        cursor: pointer;
        outline: none;

        > span {
          display: block;
          color: #798a9c;
          position: relative;
          transition: 250ms all;
        }
        > span:nth-child(1) {
          width: 0;
          opacity: 0;
          height: 3px;
          background: #798a9c;
        }
        > span:nth-child(2),
        span:nth-child(4) {
          > span {
            width: 10px;
            height: 10px;
            display: block;
            border-right: 3px solid #798a9c;
            border-bottom: 3px solid #798a9c;
            transform: rotate(-45deg) translateY(-1px);
          }
        }
        > span:nth-child(2) {
          opacity: 0;
          width: 0;
          transform: translateX(-10px);
        }
        > span:nth-child(3) {
          font-size: 16px;
          margin-right: 3px;
        }
        :hover {
          > span:nth-child(1) {
            width: 30px;
            opacity: 1;
          }
          > span:nth-child(2) {
            opacity: 1;
            width: 10px;
          }
          > span:nth-child(4) {
            opacity: 0;
            transform: translateX(10px);
          }
        }
      }
    }
  }
`;

export default ({ post }) => {
  const [isShowMore, setIsShowMore] = useState(false);

  return (
    <Div isShowMore={isShowMore}>
      <div>
        <p>{post.title}</p>
        <div>
          <span>TKStudio</span>
          <span className="divide">|</span>
          <span className="date">{post.created_at.substring(0, 10)}</span>
          <span className="divide">|</span>
          <span>
            {post.tags &&
              post.tags.length > 0 &&
              post.tags.map((tag, indexTag) => <span key={indexTag.toString()}>#{tag}&nbsp;</span>)}
          </span>
        </div>
        <pre>{post.description}</pre>
        {post.images &&
          post.images.length > 0 &&
          post.images.map(
            (image, indexImage) =>
              image && <img key={indexImage.toString()} alt={post.title} src={image} />,
          )}
        {post.videos &&
          post.videos.length > 0 &&
          post.videos.map((video, videoIndex) => (
            <iframe
              key={videoIndex.toString()}
              src={`https://www.youtube.com/embed/${video.substring(video.search('=') + 1)}`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ))}
        <p>
          <button type="button" onClick={() => setIsShowMore(!isShowMore)}>
            <span />
            <span>
              <span />
            </span>
            <span>{isShowMore ? 'Thu nhỏ' : 'Xem thêm'}</span>
            <span>
              <span />
            </span>
          </button>
        </p>
      </div>
    </Div>
  );
};
