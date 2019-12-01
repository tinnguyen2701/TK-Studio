/* eslint-disable */
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import backgroundHeader from 'images/about/backgroundHeader.png';
import logoWhite from 'images/logo/logoWhite.png';
import logo from 'images/logo/logo.png';
import logoBlack from 'images/logo/logoBlack.png';
import { connect } from 'react-redux';
import store from 'store';
import { createAction } from 'dorothy/utils';
import {
  GET_ALL_POST_POLULATE_REQUEST,
  GET_LIMIT_POST_REQUEST,
  GET_TAGS_POST_REQUEST,
  UPDATE_POST_REQUEST,
  GET_POST_REQUEST,
  SEARCH_REQUEST,
} from '../Blog/ducks';
import { GET_SETTING_REQUEST } from '../Admin/ducks';
import ListPost from './ListPost';

const Navigation = styled.div`
  position: absolute;
  width: 100%;
  flex-flow: wrap;

  ${props => props.isShowNavbar && 'background: rgba(0, 0, 0, 0.6);'}
  > ul.navigation-phone {
    height: ${props => (props.isShowNavbar ? 'auto' : 0)};
    padding: 0 auto;

    li {
      display: ${props => (props.isShowNavbar ? 'block' : 'none')};
    }
  }

  @media screen and (max-width: 800px) {
    > button {
      display: block;
      margin-right: 15px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      border: none;
      background: none;

      > span {
        margin: 2px;
        display: block;
        position: relative;
        background: ${props => (props.isShowNavbar ? 'white' : 'rgba(0,0,0,.6);')};
        width: 22px;
        height: 4px;
        border-radius: 2px;

        ::after {
          content: '';
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          top: 0;
          left: -10px;
          background: ${props => (props.isShowNavbar ? 'white' : 'rgba(0,0,0,.6);')};
        }
      }
    }
    img {
      width: 48px;
    }
    img.logo {
      margin: 15px 0 15px 15px;
    }
  }

  @media screen and (min-width: 800px) {
    padding: 15px 5% 0 5%;

    img {
      width: 73px;
    }

    > button {
      display: none;
    }
  }

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavigationTablet = styled.ul`
  @media screen and (max-width: 800px) {
    display: none !important;
  }

  @media screen and (min-width: 800px) {
    list-style: none;
    display: flex;

    > li:hover a {
      color: white;
      transition: 200ms all;
    }

    > li {
      margin: 10px;
    }

    > li {
      a {
        text-decoration: none;
        color: black;
        font-weight: 600;
        font-size: 16px;
      }

      button {
        background: none !important;
        border: none;
        border-radius: 12px;
        padding: 5px 10px;
        margin-top: -5px;
        transition: 200ms all;
        > a {
          font-family: font_strong;
          transition: 200ms all;
          color: black important;
        }
      }

      button:hover {
        background: rgb(44, 166, 239) !important;
        > a {
          color: white !important;
        }
      }
    }
  }
`;

const NavigationPhone = styled.ul`
  @media screen and (min-width: 800px) {
    display: none !important;
  }
  @media screen and (max-width: 800px) {
    z-index: 9;
    width: 100%;
    padding: 0% 5%;
    list-style: none;

    li {
      margin: 15px 0 !important;
    }

    a {
      color: white !important;
      font-size: 14px;
      text-decoration: none;
    }

    button {
      background: rgb(44, 166, 239);
      border: none;
      border-radius: 12px;
      padding: 5px 10px;
      margin-top: -5px;

      > a {
        font-family: font_strong;
        color: white;
      }
    }
  }
`;

const Banner = styled.div`
  background-image: url(${backgroundHeader});
  background-repeat: none;
  background-size: cover;
  background-position: 35% 50%;
  position: relative;

  @media screen and (max-width: 800px) {
    height: 350px;
  }

  @media screen and (min-width: 800px) {
    margin-bottom: 50px;
    height: 550px;
  }

  overflow: hidden;

  @media (min-width: 1620px) {
    height: 700px;
  }

  > img {
    width: calc(100% + 145px);
    top: -300px;
    position: relative;
    left: -145px;
  }

  @media screen and (max-width: 800px) {
    > h1 {
      width: 100%;
      font-size: 30px;
      text-align: center;
      top: 30%;
    }
  }

  @media screen and (min-width: 800px) {
    > h1 {
      top: 33%;
      font-size: 42px;
    }
  }

  > h1 {
    color: ${props => (props.isShowNavbar ? 'rgba(255,255,255,.2)' : 'white')};
    position: absolute;
    left: 50%;
    transform: translate(-50%);
  }
`;

const moveControlRight = keyframes`
  0%{
    opacity: 0;

  }
  50%{
    opacity: 1;
    
  }
  100% {
      transform: translateX(10px);
    opacity: 0;
  }
`;

const moveControlLeft = keyframes`
  0%{
    opacity: 0;

  }
  50%{
    opacity: 1;
    
  }
  100% {
      transform: translateX(-10px);
    opacity: 0;
  }
`;

const Content = styled.div`
  padding: 0 5%;

  > div:nth-child(2) {
    .pagination-control {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 50px;

      > a {
        width: 55px;
        height: 55px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        text-decoration: none;
        margin: 0 10px;
        transition: 300ms;
        background: rgb(44, 166, 239);
        color: white;

        :hover {
          box-shadow: 1px 3px 7px rgba(0, 0, 0, 0.5), -1px 3px 7px rgba(0, 0, 0, 0.5),
            0px -3px 7px rgba(0, 0, 0, 0.5);
          width: 60px;
          height: 60px;
        }
      }

      > .back-control,
      .next-control {
        border: none;
        background: none;
        display: flex;
        outline: none;
        cursor: pointer;

        > span > span {
          width: 15px;
          height: 15px;
          display: block;
          border: 3px solid rgb(44, 166, 239);
          border-right: none;
          border-top: none;
        }
      }

      > .back-control {
        > span > span {
          transform: rotate(45deg);
        }

        :hover > span {
          position: relative;
          animation: ${moveControlLeft} 700ms linear infinite;
        }
      }

      > .next-control {
        > span > span {
          transform: rotate(-135deg);
        }

        :hover > span {
          position: relative;
          animation: ${moveControlRight} 700ms linear infinite;
        }
      }
    }

    > p {
      margin-bottom: 20px;
    }

    .posts-search {
      > p {
        font-size: 18px;
      }
      > div {
        display: flex;
        align-items: center;
        margin: 15px 0;
        cursor: pointer;

        > span:nth-child(1) {
          flex: 2;
          border: 1px solid rgba(0, 0, 0, 0.2);
          border-radius: 2px;
          padding: 5px;
          > img {
            width: 100%;
          }
        }
        > span:nth-child(2) {
          flex: 7;
          padding-left: 20px;
          font-size: 20px;
          color: #798a9c;
        }
        > span:nth-child(3) {
          flex: 2;
          text-align: right;
        }
      }
    }
  }

  @media screen and (min-width: 800px) {
    display: flex;

    > div:nth-child(1) {
      display: none;
    }

    > div:nth-child(2) {
      flex: 2.5;
      padding-right: 7%;
    }
    > div:nth-child(3) {
      flex: 1;

      .tags-category {
        margin-top: 10%;
        > p:nth-child(1) {
          font-size: 20px;
          font-weight: bold;
          color: rgb(44, 166, 239);
        }
        > hr {
          height: 3px;
          background: rgb(44, 166, 239);
          width: 50px;
          border: none;
          margin-top: 10px;
        }
        > p:nth-child(3) {
          background: rgb(44, 166, 238);
          color: white;
          margin: 10px 0;
          padding: 7px 10px;
        }
        > button {
          width: 100%;
          margin: 5px 0;
          font-weight: bold;
          padding: 7px 10px;
          text-align: left;
          background: white;
          color: #798a9c;
          border-radius: 2px;
          border: 1px solid #798a9c;
          cursor: pointer;
          transition: 200ms all;
          :hover {
            box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.5);
          }
        }
      }

      .populate-category {
        margin-top: 10%;

        > p:nth-child(1) {
          font-size: 20px;
          font-weight: bold;
          color: rgb(44, 166, 239);
        }
        > hr {
          height: 3px;
          background: rgb(44, 166, 239);
          width: 50px;
          border: none;
          margin-top: 10px;
        }
        > div {
          display: flex;
          align-items: center;
          cursor: pointer;
          margin-top: 10px;
          border-bottom: 2px solid rgb(44, 166, 239);
          padding-bottom: 10px;

          > div > p {
            margin-bottom: 3px;
            color: #798a9c;
          }

          > div > p:nth-child(1) {
            font-weight: bold;
          }

          > img {
            width: 90px;
            margin-right: 10px;
            border: 1px solid #798a9c;
            padding: 3px;
            border-radius: 2px;
          }
        }
      }
    }
  }

  @media screen and (max-width: 800px) {
    > div:nth-child(1) {
      .tags-category {
        margin-bottom: 3%;
        > p {
          background: rgb(44, 166, 239);
          color: white;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 5px 15px 5px 5px;
          font-size: 18px;

          > span {
            display: block;
            width: 12px;
            height: 12px;
            border: 4px solid white;
            border-left: none;
            transform: ${props =>
              props.visibleTagsCategory
                ? 'rotate(-135deg) translate(-20%,15%)'
                : 'rotate(45deg) translateY(-40%);'};

            border-top: none;
          }
        }

        > div {
          display: ${props => (props.visibleTagsCategory ? 'block' : 'none')};
          > button {
            width: 100%;
            background: white;
            border: 1px solid rgba(0, 0, 0, 0.2);
            margin: 3px 0;
            color: #798a9c;
            text-align: left;
            padding: 3px 5px;
            font-weight: bold;
          }
        }
      }

      .populate-category {
        margin-bottom: 3%;

        > p {
          background: rgb(44, 166, 239);
          color: white;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 5px 15px 5px 5px;
          font-size: 18px;

          > span {
            display: block;
            width: 12px;
            height: 12px;
            border: 4px solid white;
            border-left: none;
            transform: ${props =>
              props.visiblePopulateCategory
                ? 'rotate(-135deg) translate(-20%,15%)'
                : 'rotate(45deg) translateY(-40%);'};

            border-top: none;
          }
        }

        > div {
          display: ${props => (props.visiblePopulateCategory ? 'block' : 'none')};

          > div {
            display: flex;
            align-items: center;
            margin: 7px 0;
            border-bottom: 1px solid rgb(44, 166, 239);
            padding-bottom: 5px;

            > img {
              width: 85px;
              margin-right: 6px;
            }
            > div > p:nth-child(1) {
              font-size: 15px;
              font-weight: bold;
              color: #798a9c;
            }
            > div > p:nth-child(2) {
              font-size: 13px;
            }
          }
        }
      }
    }
    > div:nth-child(2) {
      .posts-search {
        > div {
          > span:nth-child(2) {
            font-size: 16px;
          }
          > span:nth-child(3) {
            flex: 5;
          }
        }
      }
    }
    > div:nth-child(3) {
      display: none;
    }
  }

  .posts {
    > p {
      display: flex;
      position: relative;

      > i {
        position: absolute;
        left: 5px;
        top: 50%;
        transform: translateY(-50%);
        color: rgb(44, 166, 239);
      }

      > input {
        padding: 5px 0;
        font-size: 13px;
        width: 100%;
        padding-left: 20px;
        padding-right: 75px;
        border-radius: 15px;
        border: 1px solid darkgrey;
        outline: none;
        transition: 300ms all;

        :hover {
          box-shadow: 1px 1px 3px rgba(44, 166, 239), -1px 1px 3px rgba(44, 166, 239),
            0px -1px 3px rgba(44, 166, 239);
        }
      }

      > button {
        position: absolute;
        right: 0;
        width: 75px;
        height: 100%;
        border-radius: 15px;
        background: rgb(44, 166, 239);
        color: white;
        font-weight: bold;
        border: 1px solid darkgray;
        cursor: pointer;
        transition: 300ms all;
        outline: none;

        :hover {
          background: white;
          color: #798a9c;
          border: 1px solid rgba(44, 166, 239);
        }
      }

      @media screen and (min-width: 800px) {
        > input {
          padding: 10px 0;
          font-size: 16px;
          border-radius: 20px;
          padding-left: 30px;
          padding-right: 100px;
        }
        > i {
          left: 10px;
          font-size: 18px;
        }
        > button {
          width: 100px;
          border-radius: 20px;
          font-size: 16px;
        }
      }
    }
  }
`;

const Wrapper = styled.div``;
const Feed = ({ posts, setting, populatePosts, postsSearch, match, history }) => {
  const [isShowNavbar, setIsShowNavbar] = useState(false);
  const [valueSearch, setValueSearch] = useState(null);
  const [isGetLimit, setIsGetLimit] = useState(true);
  const [visiblePosts, setVisiblePost] = useState(true);
  const [visibleTagsCategory, setVisibleTagsCategory] = useState(false);
  const [visiblePopulateCategory, setVisiblePopulatesCategory] = useState(false);

  const { numberPage } = match.params;
  const object = window.location.href.split('/')[window.location.href.split('/').length - 2];

  if (
    object === 'page' &&
    numberPage !== undefined &&
    numberPage != window.localStorage.getItem('page')
  ) {
    window.localStorage.setItem('page', numberPage);

    store.dispatch({
      type: GET_LIMIT_POST_REQUEST,
      payload: { numberPage: numberPage },
    });
  } else if (isGetLimit === true && object !== 'tags' && object !== 'page' && object !== 'post') {
    store.dispatch({
      type: GET_LIMIT_POST_REQUEST,
      payload: {
        numberPage: 1,
      },
    });
    setIsGetLimit(false);
  }

  useEffect(() => {
    store.dispatch({ type: GET_SETTING_REQUEST });

    if (object === 'page' && numberPage > 0) {
      store.dispatch({
        type: GET_LIMIT_POST_REQUEST,
        payload: {
          numberPage: numberPage === undefined ? 1 : numberPage,
        },
      });
    } else if (object === 'tags') {
      store.dispatch({
        type: GET_TAGS_POST_REQUEST,
        payload: {
          tag: window.location.href.split('/')[window.location.href.split('/').length - 1],
        },
      });
    } else if (object === 'post') {
      store.dispatch({
        type: GET_POST_REQUEST,
        payload: {
          id: window.location.href.split('/')[window.location.href.split('/').length - 1],
        },
      });
    }
    store.dispatch({ type: GET_ALL_POST_POLULATE_REQUEST });
  }, []);

  const redirectPageHandler = numberPage => {
    window.scrollTo({ top: 330, behavior: 'smooth' });
    setIsGetLimit(true);
    window.localStorage.setItem('page', numberPage);
    if (numberPage > 0) store.dispatch({ type: GET_LIMIT_POST_REQUEST, payload: { numberPage } });
    history.push(`/feed/page/${numberPage}`);
  };

  const redirectTagHandler = tag => {
    window.scrollTo({ top: 330, behavior: 'smooth' });
    setVisibleTagsCategory(false);
    setValueSearch(null);
    setIsGetLimit(true);
    store.dispatch({ type: GET_TAGS_POST_REQUEST, payload: { tag } });
    setVisiblePost(true);
    history.push(`/feed/tags/${tag}`);
  };

  const redirectPagePopulateHandler = item => {
    window.scrollTo({ top: 330, behavior: 'smooth' });
    setVisiblePopulatesCategory(false);
    setValueSearch(null);
    setVisiblePost(true);
    setIsGetLimit(true);
    store.dispatch(createAction(UPDATE_POST_REQUEST, item));
    history.push(`/feed/post/${item._id}`);
  };

  const redirectPageFeedHandler = e => {
    window.scrollTo({ top: 330, behavior: 'smooth' });
    setValueSearch(null);
    e.preventDefault();
    setVisiblePost(true);
    history.push('/feed');
  };

  const searchHandler = () => {
    setVisiblePost(false);
    store.dispatch({
      type: SEARCH_REQUEST,
      payload: valueSearch ? { valueSearch } : { valueSearch: null },
    });
  };

  const subcriptionHandler = () => {
    window.open(
      'https://forms.gle/bNtEgyX6ijdGWeL16?fbclid=IwAR36hqYi-XTc_CsdWFukFKB8CNgIhPtYGoCuSddOFi_As2x9ZGtu0BUe3vE',
      '_blank',
    );
  };

  const contactHandler = e => {
    e.preventDefault();
    window.scrollTo({ top: window.document.body.offsetHeight, behavior: 'smooth' });
  };

  return (
    <Wrapper>
      <Banner isShowNavbar={isShowNavbar}>
        <Navigation isShowNavbar={isShowNavbar}>
          <img src={logoWhite} className="logo" alt="logo" />
          <button type="button" onClick={() => setIsShowNavbar(!isShowNavbar)}>
            <span />
            <span />
            <span />
          </button>
          <NavigationTablet>
            <li>
              <button type="button">
                <Link to="/">TRANG CHỦ</Link>
              </button>
            </li>
            <li>
              <button type="button">
                <Link to="/gioi-thieu">GIỚI THIỆU</Link>
              </button>
            </li>
            <li>
              <button type="button">
                <Link to="/khoa-hoc">KHÓA HỌC</Link>
              </button>
            </li>
            <li>
              <button type="button">
                <Link to="/feed" onClick={e => redirectPageFeedHandler(e)}>
                  BLOG
                </Link>
              </button>
            </li>
            <li>
              <button type="button">
                <Link to="/#" onClick={() => subcriptionHandler()}>
                  ĐĂNG KÝ
                </Link>
              </button>
            </li>
            <li>
              <button type="button" className="btn-contact">
                <Link to="/lien-he" onClick={e => contactHandler(e)}>
                  LIÊN HỆ
                </Link>
              </button>
            </li>
          </NavigationTablet>
          <NavigationPhone className="navigation-phone">
            <li>
              <Link to="/">TRANG CHỦ</Link>
            </li>
            <li>
              <Link to="/gioi-thieu">GIỚI THIỆU</Link>
            </li>
            <li>
              <Link to="/khoa-hoc">KHÓA HỌC</Link>
            </li>
            <li>
              <Link to="/feed" onClick={e => redirectPageFeedHandler(e)}>
                BLOG
              </Link>
            </li>
            <li>
              <Link to="/#" onClick={() => subcriptionHandler()}>
                ĐĂNG KÝ
              </Link>
            </li>
            <li>
              <button type="button">
                <Link to="/lien-he" onClick={e => contactHandler(e)}>
                  LIÊN HỆ
                </Link>
              </button>
            </li>
          </NavigationPhone>
        </Navigation>
        <h1>TKSTUDIO BLOG</h1>
      </Banner>
      <Content
        visibleTagsCategory={visibleTagsCategory}
        visiblePopulateCategory={visiblePopulateCategory}
      >
        <div>
          <div className="tags-category">
            <p onClick={() => setVisibleTagsCategory(!visibleTagsCategory)}>
              MỤC LỤC <span />
            </p>
            <div>
              {setting &&
                setting.tags.length > 0 &&
                setting.tags.map((item, index) => (
                  <button onClick={() => redirectTagHandler(item)} key={index.toString()}>
                    {item}
                  </button>
                ))}
            </div>
          </div>
          <div className="populate-category">
            <p onClick={() => setVisiblePopulatesCategory(!visiblePopulateCategory)}>
              PHỔ BIẾN <span />
            </p>
            <div>
              {populatePosts &&
                populatePosts.length > 0 &&
                populatePosts.map((item, index) => (
                  <div key={index.toString()} onClick={() => redirectPagePopulateHandler(item)}>
                    <img alt="logo" src={logoBlack} />
                    <div>
                      <p>{item.title}</p>
                      <p>{item.created_at.substring(0, 10)}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="posts">
          <p>
            <i className="fa fa-search" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={valueSearch || ''}
              onChange={e => setValueSearch(e.target.value)}
            />
            <button type="button" onClick={() => searchHandler()}>
              Tìm kiếm
            </button>
          </p>
          {posts && visiblePosts === true && (
            <div>
              {posts.length > 0 && <ListPost posts={posts} />}
              <div className="pagination-control">
                {object === 'page' &&
                  match.params !== undefined &&
                  window.location.href.split('/')[window.location.href.split('/').length - 1] >
                    1 && (
                    <button
                      className="back-control"
                      type="button"
                      onClick={() =>
                        redirectPageHandler(
                          parseInt(
                            window.location.href.split('/')[
                              window.location.href.split('/').length - 1
                            ],
                          ) - 1,
                        )
                      }
                    >
                      <span>
                        <span />
                      </span>
                      <span>
                        <span />
                      </span>
                      <span>
                        <span />
                      </span>
                    </button>
                  )}

                {(object === 'page' ||
                  window.location.href.split('/')[window.location.href.split('/').length - 1] ===
                    'feed') && (
                  <Link to="/feed" title="Trở về trang Feed">
                    FEED
                  </Link>
                )}
                {object === 'page' && posts && posts.length === 5 && (
                  <button
                    className="next-control"
                    type="button"
                    onClick={() =>
                      redirectPageHandler(
                        parseInt(
                          window.location.href.split('/')[
                            window.location.href.split('/').length - 1
                          ],
                        ) + 1,
                      )
                    }
                  >
                    <span>
                      <span />
                    </span>
                    <span>
                      <span />
                    </span>
                    <span>
                      <span />
                    </span>
                  </button>
                )}
                {window.location.href
                  .split('/')
                  [window.location.href.split('/').length - 1].toLowerCase() === 'feed' &&
                  posts &&
                  posts.length === 5 && (
                    <button
                      className="next-control"
                      type="button"
                      onClick={() => redirectPageHandler(2)}
                    >
                      <span>
                        <span />
                      </span>
                      <span>
                        <span />
                      </span>
                      <span>
                        <span />
                      </span>
                    </button>
                  )}
              </div>
            </div>
          )}
          {visiblePosts === false && (
            <div className="posts-search">
              {postsSearch && postsSearch.length === 0 ? (
                <p>Không Tìm Thấy Bài Viết này!</p>
              ) : (
                <p>Kết quả tìm kiếm</p>
              )}
              {postsSearch &&
                postsSearch.length !== 0 &&
                postsSearch.map((post, index) => (
                  <div key={index.toString()} onClick={() => redirectPagePopulateHandler(post)}>
                    <span>
                      <img alt="logo" src={logoBlack} />
                    </span>
                    <span>{post.title}</span>
                    <span>{post.created_at.substring(0, 10)}</span>
                  </div>
                ))}
            </div>
          )}
        </div>
        <div>
          <div className="tags-category">
            <p>MỤC LỤC</p>
            <hr />
            <p>Tất cả</p>
            {setting &&
              setting.tags.length > 0 &&
              setting.tags.map((item, index) => (
                <button onClick={() => redirectTagHandler(item)} key={index.toString()}>
                  {item}
                </button>
              ))}
          </div>
          <div className="populate-category">
            <p>PHỔ BIẾN</p>
            <hr />
            {populatePosts &&
              populatePosts.length > 0 &&
              populatePosts.map((item, index) => (
                <div key={index.toString()} onClick={() => redirectPagePopulateHandler(item)}>
                  <img alt="logo" src={logoBlack} />
                  <div>
                    <p>{item.title}</p>
                    <p>{item.created_at.substring(0, 10)}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Content>
    </Wrapper>
  );
};

export default connect(state => ({
  posts: state.posts,
  setting: state.setting,
  populatePosts: state.populatePosts,
  postsSearch: state.postsSearch,
}))(Feed);
