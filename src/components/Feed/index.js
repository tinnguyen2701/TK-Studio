/* eslint-disable */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import backgroundHeader from 'images/about/backgroundHeader.png';

import backgroundFooter from 'images/background/backgroundFooter.png';
import logo from 'images/logo/logo.png';
import logoBlack from 'images/logo/logoBlack.png';
import facebook from 'images/logo/facebook.png';
import instagram from 'images/logo/instagram.png';
import youtube from 'images/logo/youtube.png';
import { connect } from 'react-redux';
import store from 'store';
import {
  GET_ALL_POST_POLULATE_REQUEST,
  GET_LIMIT_POST_REQUEST,
  GET_TAGS_POST_REQUEST,
} from '../Blog/ducks';
import { GET_SETTING_REQUEST } from '../Admin/ducks';
import ListPost from './ListPost';

const Footer = styled.div`
  margin-top: 10%;
  position: relative;

  > img {
    width: 100%;
    vertical-align: middle;
  }
  > div {
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
    width: 100%;
    @media screen and (min-width: 800px) {
      padding: 0 5%;
    }
    @media screen and (max-width: 800px) {
      padding: 0 1%;
    }
    top: 50%;
    transform: translateY(0%);
    position: absolute;

    > div {
      flex: 1;
    }

    > div:nth-child(1) {
      @media screen and (max-width: 800px) {
        > img {
          width: 90px;
        }
      }

      @media screen and (min-width: 800px) {
        > img {
          width: 200px;
        }
      }

      position: relative;

      > div {
        position: absolute;

        @media screen and (max-width: 800px) {
          display: flex;
          left: 0;
          top: 50%;
        }

        @media screen and (min-width: 800px) {
          top: 60px;
          left: 100px;
        }
      }

      a {
        margin-left: 4px;
        @media screen and (max-width: 800px) {
          > img {
            width: 20px;
          }
        }

        @media screen and (min-width: 800px) {
          > img {
            width: 30px;
          }
        }
      }
    }

    @media screen and (max-width: 800px) {
      > div:nth-child(2) {
        p {
          margin-bottom: 5px;
          font-size: 9px;
          text-align: center;
        }
        a {
          text-decoration: none;
          color: black;
          font-weight: 600;
        }
      }

      > div:nth-child(3) {
        p {
          margin-bottom: 10px;
          font-weight: 600;
          font-size: 9px;
          text-align: center;

          > span {
            display: block;
            margin: 5px;
          }
        }
      }

      > div:nth-child(4) {
        font-weight: 600;
        font-size: 9px;
        position: relative;
        top: -4px;
      }
    }

    @media screen and (min-width: 800px) {
      > div:nth-child(2) {
        p {
          margin-bottom: 10px;
          font-size: 18px;
        }
        a {
          text-decoration: none;
          color: black;
          font-weight: 600;
        }

        a:hover {
          color: white;
          transition: 200ms all;
        }
      }

      > div:nth-child(3) {
        p {
          margin-bottom: 10px;
          font-weight: 600;
          font-size: 18px;
        }
      }

      > div:nth-child(4) {
        font-weight: 600;
        font-size: 18px;
        position: relative;
        top: -4px;
      }
    }
  }
`;

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
      width: 120px;
    }
    img.logo {
      margin: 15px 0 15px 15px;
    }
  }

  @media screen and (min-width: 800px) {
    padding: 15px 5% 0 5%;

    img {
      width: 165px;
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
      }

      button {
        background: none !important;
        border: 2px solid rgb(44, 166, 239) !important;
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
      top: 25%;
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

const Content = styled.div`
  padding: 0 5%;

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
      border: 1px solid;
    }
  }

  @media screen and (max-width: 800px) {
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
const Feed = ({ posts, setting, populatePosts, match, history }) => {
  const [isShowNavbar, setIsShowNavbar] = useState(false);
  const [valueSearch, setValueSearch] = useState(null);
  const [isGetLimit, setIsGetLimit] = useState(true);

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
  } else if (isGetLimit === true && object !== 'tags' && object !== 'page') {
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
    }
    store.dispatch({ type: GET_ALL_POST_POLULATE_REQUEST });
  }, []);

  const redirectPageHandler = numberPage => {
    setIsGetLimit(true);
    window.localStorage.setItem('page', numberPage);
    history.push(`/feed/page/${numberPage}`);
    if (numberPage > 0) store.dispatch({ type: GET_LIMIT_POST_REQUEST, payload: { numberPage } });
  };

  const redirectTagHandler = tag => {
    setIsGetLimit(true);
    history.push(`/feed/tags/${tag}`);
    store.dispatch({ type: GET_TAGS_POST_REQUEST, payload: { tag } });
  };

  const subcriptionHandler = () => {
    window.open(
      'https://forms.gle/bNtEgyX6ijdGWeL16?fbclid=IwAR36hqYi-XTc_CsdWFukFKB8CNgIhPtYGoCuSddOFi_As2x9ZGtu0BUe3vE',
      '_blank',
    );
  };

  return (
    <Wrapper>
      <Banner isShowNavbar={isShowNavbar}>
        <Navigation isShowNavbar={isShowNavbar}>
          <img src={logo} className="logo" alt="logo" />
          <button type="button" onClick={() => setIsShowNavbar(!isShowNavbar)}>
            <span />
            <span />
            <span />
          </button>
          <NavigationTablet>
            <li>
              <Link to="/">TRANG CHỦ</Link>
            </li>
            <li>
              <Link to="/gioi-thieu">GIỚI THIỆU</Link>
            </li>
            <li>
              <Link to="/feed">FEED</Link>
            </li>
            <li>
              <Link to="/khoa-hoc">KHÓA HỌC</Link>
            </li>
            <li>
              <Link to="/#" onClick={() => subcriptionHandler()}>
                ĐĂNG KÝ
              </Link>
            </li>
            <li>
              <button type="button">
                <Link to="/lien-he">LIÊN HỆ</Link>
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
              <Link to="/feed">FEED</Link>
            </li>
            <li>
              <Link to="/khoa-hoc">KHÓA HỌC</Link>
            </li>
            <li>
              <Link to="/#" onClick={() => subcriptionHandler()}>
                ĐĂNG KÝ
              </Link>
            </li>
            <li>
              <button type="button">
                <Link to="/lien-he">LIÊN HỆ</Link>
              </button>
            </li>
          </NavigationPhone>
        </Navigation>
        <h1>TKSTUDIO BLOG</h1>
      </Banner>
      <Content>
        <div>
          <div>nav cho muc luc</div>
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
            <button type="button">Tìm kiếm</button>
          </p>
          {posts && (
            <div>
              <ListPost posts={posts} />

              {object === 'page' &&
                match.params !== undefined &&
                window.location.href.split('/')[window.location.href.split('/').length - 1] > 1 && (
                  <button
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
                    Back
                  </button>
                )}

              {object === 'page' && (
                <button
                  type="button"
                  onClick={() =>
                    redirectPageHandler(
                      parseInt(
                        window.location.href.split('/')[window.location.href.split('/').length - 1],
                      ) + 1,
                    )
                  }
                >
                  Next
                </button>
              )}
              {window.location.href
                .split('/')
                [window.location.href.split('/').length - 1].toLowerCase() === 'feed' && (
                <button type="button" onClick={() => redirectPageHandler(2)}>
                  Next
                </button>
              )}
            </div>
          )}
          <div></div>
        </div>
        <div>
          <div>
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
          <div>
            <p>PHỔ BIẾN</p>
            <hr />
            {populatePosts &&
              populatePosts.length > 0 &&
              populatePosts.map((item, index) => <div key={index.toString()}>{item.title}</div>)}
          </div>
        </div>
      </Content>

      <Footer>
        <img src={backgroundFooter} alt="footer background" />
        <div>
          <div>
            <img src={logoBlack} alt="logo black" />
            <div>
              <a href="https://www.facebook.com/TonKhoaStudio/" target="_blank">
                <img src={facebook} alt="logo facebook" />
              </a>
              <a href="https://www.instagram.com/tonkhoastudio/" target="_blank">
                <img src={instagram} alt="logo instagram" />
              </a>
              <a href="/">
                <img src={youtube} alt="logo youtube" />
              </a>
            </div>
          </div>
          <div>
            <p>
              <Link to="/">TRANG CHỦ</Link>
            </p>
            <p>
              <Link to="/gioi-thieu">GIỚI THIỆU</Link>
            </p>
            <p>
              <Link to="/feed">FEED</Link>
            </p>
            <p>
              <Link to="/khoa-hoc">KHÓA HỌC</Link>
            </p>
          </div>
          <div>
            <p>
              ĐĂNG KÝ <span /> LIÊN HỆ
            </p>
            <p>0702450542</p>
          </div>
          <div>
            <p>tonkhoastudio@gmail.com</p>
            <p>Cs1: 69 Lê Trung Định, TP.Huế</p>
            <p>
              Cs2: Tổ dân phố Hòa Tây - Thị Trấn Phú Đa - Thành Phố Huế (Cách THPT Nguyễn Sinh Cung
              500m)
            </p>
          </div>
        </div>
      </Footer>
    </Wrapper>
  );
};

export default connect(state => ({
  posts: state.posts,
  setting: state.setting,
  populatePosts: state.populatePosts,
}))(Feed);
