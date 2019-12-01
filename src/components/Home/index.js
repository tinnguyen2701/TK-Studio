/* eslint-disable */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import store from 'store';
import { connect } from 'react-redux';
import bannerBackground from 'images/banner/bannerBackground.png';
import bannerBackgroundPhone from 'images/banner/bannerBackgroundPhone.png';
import cup from 'images/banner/cup.png';
import boom from 'images/banner/boom.png';
import doiNgu from 'images/home/doi-ngu.png';
import logoWhite from 'images/logo/logoWhite.png';
import nguoive from 'images/person/nguoive.png';
import lamp from 'images/home/lamp.png';
import { GET_ALL_USER_REQUEST } from '../Admin/ducks';

const Navigation = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
    img.nguoi-ve,
    img.boom,
    img.cup {
      display: none;
    }
  }

  @media screen and (min-width: 800px) {
    padding: 15px 5% 0 5%;

    > button {
      display: none;
    }

    img.logo {
      width: 73px;
    }

    img.nguoi-ve {
      position: absolute;
      top: 220%;
      left: 54%;
      transform: scale(0.6);
      @media (min-width: 1225px) {
        animation: move1 10s linear alternate infinite;
      }
      @media (min-width: 1348px) {
        animation: move2 10s linear alternate infinite;
      }
      @media (min-width: 1497px) {
        animation: move3 10s linear alternate infinite;
      }
      @media (min-width: 1685px) {
        animation: move4 10s linear alternate infinite;
      }
    }

    img.boom {
      position: absolute;
      top: 49%;
      left: 87%;
      animation: updown 3s linear infinite;
    }

    img.cup {
      position: absolute;
      transform: scale(0.6);
      animation: shaky 3s linear infinite;
      top: 126%;
      left: 67%;
    }
  }

  @media (min-width: 1225px) {
    img.boom {
      top: 79%;
      left: 81%;
    }
    img.cup {
      top: 220%;
      left: 65%;
    }
  }
  @media (min-width: 1348px) {
    img.boom {
      top: 113%;
      left: 79%;
    }
    img.cup {
      left: 64%;
      top: 230%;
    }
  }

  @media (min-width: 1497px) {
    img.boom {
      top: 130%;
      left: 78%;
    }
    img.cup {
      top: 250%;
      left: 64%;
    }
  }

  @media (min-width: 1685px) {
    img.boom {
      top: 155%;
      left: 76%;
    }
    img.cup {
      top: 260%;
      left: 63%;
    }
  }

  @media (min-width: 1797px) {
    img.boom {
      top: 170%;
      left: 75%;
    }
    img.cup {
      top: 270%;
      left: 63%;
    }
  }

  @keyframes move4 {
    50% {
      top: 430%;
      left: 39%;
    }
    75% {
      top: 470%;
      left: 34%;
      transform: scale(0.6) skewX(6deg);
    }
    100% {
      top: 420%;
      left: 39%;
      transform: scale(0.6) skewX(6deg);
    }
  }

  @keyframes move3 {
    50% {
      top: 400%;
      left: 38%;
    }
    75% {
      top: 430%;
      left: 32%;
      transform: scale(0.6) skewX(6deg);
    }
    100% {
      top: 390%;
      left: 38%;
      transform: scale(0.6) skewX(6deg);
    }
  }

  @keyframes move2 {
    50% {
      top: 350%;
      left: 38%;
    }
    75% {
      top: 390%;
      left: 33%;
      transform: scale(0.6) skewX(6deg);
    }
    100% {
      top: 350%;
      left: 38%;
      transform: scale(0.6) skewX(6deg);
    }
  }

  @keyframes move1 {
    50% {
      top: 375%;
      left: 35%;
    }
    75% {
      top: 335%;
      left: 36%;
      transform: scale(0.6) skewX(6deg);
    }
    100% {
      top: 380%;
      left: 30%;
      transform: scale(0.6) skewX(6deg);
    }
  }

  @keyframes shaky {
    0% {
      transform: scale(0.55) rotate(0);
    }
    25% {
      transform: scale(0.55) rotate(-15deg);
    }
    50% {
      transform: scale(0.55) rotate(0deg);
    }
    75% {
      transform: scale(0.55) rotate(15deg);
    }
    100% {
      transform: scale(0.55) rotate(0deg);
    }
  }

  @keyframes updown {
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0px);
    }
  }
`;

const NavigationTablet = styled.ul`
  @media screen and (max-width: 800px) {
    display: none;
  }
  @media screen and (min-width: 800px) {
    list-style: none;
    display: flex;

    > li:hover a {
      color: white;
      transition: 200ms all;
    }

    > li:hover button {
      background: rgb(44, 166, 239);
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2), -1px -1px 2px rgba(0, 0, 0, 0.2);
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
        background: none;
        border: none;
        border-radius: 12px;
        padding: 5px 10px;
        margin-top: -5px;
        transition: 200ms all;

        > a {
          font-family: font_strong;
          color: black;
        }
      }
    }
  }
`;

const NavigationPhone = styled.ul`
  @media screen and (min-width: 800px) {
    display: none;
  }
  @media screen and (max-width: 800px) {
    width: 100%;
    padding: 0% 5%;
    list-style: none;

    li {
      margin: 15px 0;
    }

    a {
      color: white;
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
  position: relative;

  @media screen and (max-width: 800px) {
    background-image: url(${bannerBackgroundPhone});
    background-size: contain;
    background-repeat: no-repeat;
  }

  @media screen and (min-width: 800px) {
    background-image: url(${bannerBackground});
    background-repeat: none;
    background-size: cover;
    background-position: center;
  }

  div:nth-child(2) {
    @media screen and (max-width: 800px) {
      color: black;
      font-size: 16px;
      padding-bottom: 10%;
      padding-top: 260px;
      width: 100%;
    }

    @media screen and (min-width: 800px) {
      color: white;
      padding-bottom: 30%;
      font-size: 20px;
      position: relative;
      top: 70px;
    }
    padding: 0 5%;
    width: 35%;
    font-size: 20px;
    padding-top: 10%;

    button {
      background: none;
      border: 2px solid rgb(10, 199, 244);
      border-radius: 20px;
      padding: 10px 8px;
      transition: 200ms all;

      > a {
        transition: 200ms all;
        font-weight: bold;
        color: black;
        font-family: font_strong;
        text-decoration: none;
      }
    }

    button:hover {
      background: rgb(10, 199, 244);
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2), -1px -1px 2px rgba(0, 0, 0, 0.2);
      > a {
        color: white;
      }
    }
  }
`;

const Wrapper = styled.div`
  > div:nth-child(2) {
    @media screen and (max-width: 800px) {
      h1 {
        text-align: center;
        font-size: 20px !important;
      }
    }

    display: flex;
    margin-top: 3%;
    margin-bottom: 50px;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    img {
      width: 40%;
    }

    button {
      background: none;
      border: 2px solid rgb(10, 199, 244);
      border-radius: 20px;
      padding: 10px 10px;
      transition: 200ms all;
      margin-top: 20px;

      > a {
        color: black;
        font-family: font_strong;
        transition: 200ms all;
        text-decoration: none;
        font-weight: bold;
      }
    }

    button:hover {
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2), -1px -1px 2px rgba(0, 0, 0, 0.2);
      background: rgb(10, 199, 244);
      > a {
        color: white;
      }
    }
  }

  > div:nth-child(3) {
    @media screen and (max-width: 800px) {
      h1 {
        text-align: center;
        font-size: 20px !important;
        margin-bottom: 0 !important;
      }
      img.background-doi-ngu {
        display: none;
      }
    }

    position: relative;
    margin-top: 3%;

    > div {
      @media screen and (min-width: 800px) {
        position: absolute;
        text-align: center;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
        width: 100%;
        height: 100%;

        > h1 {
          transform: translateY(100%);
        }
      }

      > div {
        display: flex;
        flex-flow: wrap;
        justify-content: center;
        width: 100%;
        @media screen and (min-width: 800px) {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          > div {
            margin: 0px 50px 50px 50px;
          }
        }
        @media screen and (max-width: 800px) {
          > div {
            margin: 15px 50px 15px 50px;
          }
        }
      }
    }
  }

  > div:nth-child(4) {
    @media screen and (max-width: 800px) {
      h1 {
        text-align: center;
        font-size: 20px !important;
      }
    }

    padding: 0 5%;
    text-align: center;

    div {
      border-radius: 10px;
      overflow: hidden;

      > img {
        height: 100%;
      }
    }

    > div {
      @media screen and (min-width: 800px) {
        display: flex;
        justify-content: center;

        > div:nth-child(1) {
          > div {
            margin: 10px;
            background: rgb(223, 236, 243);
          }

          > div:nth-child(1) {
            width: 400px;
            height: 400px;
          }
          > div:nth-child(2) {
            width: 400px;
            height: 200px;
            margin-top: 20px;
          }
        }

        > div:nth-child(2) {
          > div {
            margin: 10px;
          }

          > div:nth-child(1) {
            width: 400px;
            height: 200px;
            background: rgb(223, 236, 243);
          }

          > div:nth-child(2) {
            @media screen and (min-width: 800px) {
              display: flex;
            }

            > div:nth-child(1) {
              width: 200px;
              height: 400px;
              background: rgb(223, 236, 243);
              margin-top: 10px;
              margin-right: 10px;
            }

            > div:nth-child(2) {
              > div {
                width: 190px;
                height: 190px;
                background: rgb(223, 236, 243);
                margin-top: 10px;
              }

              > div:nth-child(2) {
                margin-top: 20px;
              }
            }
          }
        }
      }
    }
  }
`;

const AvatarStudent = styled.div`
  @media screen and (max-width: 800px) {
    box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.2);
    display: inline-block;
    margin: 10px;
    width: 130px;
    height: 130px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  > span {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    color: white;
    transition: 350ms all;
    padding: 5px;
    > span {
      width: 100%;
      transition: 350ms all;
      display: flex;
      flex-direction: column;
      align-items: center;
      bottom: 2%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      opacity: 0;

      > span:first-child {
        font-size: 21px;
        text-transform: uppercase;
        @media screen and (max-width: 800px) {
          font-size: 15px;
        }
      }

      > hr {
        transition: 500ms all;
        width: 0%;
        display: block;
        margin: 15px;
      }

      > span:last-child {
        font-size: 18px;
        @media screen and (max-width: 800px) {
          font-size: 12px;
        }
      }
    }
    :hover {
      background: rgba(0, 0, 0, 0.3);

      > span {
        opacity: 1;
        bottom: 5%;

        > hr {
          width: 35%;
        }
      }
    }
  }
`;

const FlipBox = styled.div`
  width: 260px;
  height: 260px;
  @media screen and (max-width: 800px) {
    width: 210px;
    height: 210px;
  }
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #dfecf4;
  .flip-box {
    background-color: rgb(240, 247, 247);
    width: 230px;
    height: 230px;
    @media screen and (max-width: 800px) {
      width: 180px;
      height: 180px;
    }
    perspective: 1000px;
    border-radius: 50%;
    position: relative;
    ::after {
      content: '';
      position: absolute;
      width: 88%;
      height: 88%;
      @media screen and (max-width: 800px) {
        width: 85%;
        height: 85%;
      }
      border: 14px solid rgba(255, 255, 255, 0.2);
      top: 0;
      left: 0;
      border-radius: 50%;
    }
  }
  .flip-box-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.5s;
    transform-style: preserve-3d;
  }

  .flip-box:hover .flip-box-inner {
    transform: rotateY(180deg);
  }

  .flip-box-front,
  .flip-box-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 50%;
  }

  .flip-box-front {
    background-color: #bbb;
    color: black;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .flip-box-back {
    background: rgb(44, 166, 239);
    color: white;
    transform: rotateY(180deg);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 30px;

    > p:first-child {
      font-size: 21px;
      @media screen and (max-width: 800px) {
        font-size: 19px;
      }
      width: 100%;
      text-transform: uppercase;
    }

    > hr {
      width: 60%;
      padding: 1px;
      background: rgba(255, 255, 255, 0.7);
      border: none;
      display: block;
      margin: 15px;
    }
    > p:last-child {
      font-size: 17px;
      @media screen and (max-width: 800px) {
        font-size: 13px;
      }
    }
  }
`;

const Home = ({ users }) => {
  useEffect(() => {
    store.dispatch({ type: GET_ALL_USER_REQUEST });
  }, []);

  const [isShowNavbar, setIsShowNavbar] = useState(false);

  window.scrollTo({ top: 0, behavior: 'smooth' });

  const students = users.filter(user => user.role === 'student');

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
      <Banner>
        <Navigation isShowNavbar={isShowNavbar}>
          <img src={logoWhite} className="logo" alt="logo" />
          <img src={nguoive} className="nguoi-ve" alt="nguoi ve" />
          <img src={cup} className="cup" alt="cup" />
          <img src={boom} className="boom" alt="boom" />
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
                <Link to="/feed">BLOG</Link>
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
              <Link to="/feed">BLOG</Link>
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

        <div>
          <h1>TKStudio</h1>
          <br />
          <p>Là trung tâm luyện thi Kiến trúc - Mỹ thuật</p>
          <p>Chất lượng hàng đầu trên địa bàn tỉnh Thừa Thiên Huế.</p>
          <p>
            Với tiêu chí &quot;thi là đậu&quot;, TK-Studio sẽ là điểm đến tin cậy đến các bạn có nhu
            cầu luyện thi nói riêng và nhu cầu ...
          </p>
          <br />
          <button type="button">
            <Link to="/gioi-thieu">XEM THÊM</Link>
          </button>
        </div>
      </Banner>
      <div>
        <h1>CÁC KHÓA HỌC Ở TKSTUDIO</h1>
        <br />
        <img src={lamp} alt="lamp" />
        <button type="button">
          <Link to="/khoa-hoc">XEM THÊM</Link>
        </button>
      </div>
      <div>
        <img className="background-doi-ngu" alt="anh test" src={doiNgu} style={{ width: '100%' }} />
        <div>
          <h1>ĐỘI NGŨ GIẢNG VIÊN</h1>
          <div>
            {users &&
              users.map(
                (user, index) =>
                  user.role === 'teacher' && (
                    <FlipBox key={index.toString()}>
                      <div className="flip-box">
                        <div className="flip-box-inner">
                          <div className="flip-box-front">
                            <img src={user.avatar} alt={user.name} />
                          </div>
                          <div className="flip-box-back">
                            <p>{user.name}</p>
                            <hr />
                            <p>{user.job}</p>
                          </div>
                        </div>
                      </div>
                    </FlipBox>
                  ),
              )}
          </div>
        </div>
      </div>
      <div>
        <h1>HỌC VIÊN TIÊU BIỂU</h1>
        {window.innerWidth > 800 ? (
          <div>
            <div>
              <AvatarStudent>
                {students[0] && <img src={students[0].avatar} alt={students[0].name} />}
                <span>
                  <span>
                    <span>{students[0] && students[0].name}</span>
                    <hr /> <span>{students[0] && students[0].job}</span>
                  </span>
                </span>
              </AvatarStudent>
              <AvatarStudent>
                {students[1] && <img src={students[1].avatar} alt={students[1].name} />}
                <span>
                  <span>
                    <span>{students[1] && students[1].name}</span>
                    <hr /> <span>{students[1] && students[1].job}</span>
                  </span>
                </span>
              </AvatarStudent>
            </div>
            <div>
              <AvatarStudent>
                {students[2] && <img src={students[2].avatar} alt={students[2].name} />}
                <span>
                  <span>
                    <span>{students[2] && students[2].name}</span>
                    <hr /> <span>{students[2] && students[2].job}</span>
                  </span>
                </span>
              </AvatarStudent>
              <div>
                <AvatarStudent>
                  {students[3] && <img src={students[3].avatar} alt={students[3].name} />}
                  <span>
                    <span>
                      <span>{students[3] && students[3].name}</span>
                      <hr /> <span>{students[3] && students[3].job}</span>
                    </span>
                  </span>
                </AvatarStudent>
                <div>
                  <AvatarStudent>
                    {students[4] && <img src={students[4].avatar} alt={students[4].name} />}
                    <span>
                      <span>
                        <span>{students[4] && students[4].name}</span>
                        <hr /> <span>{students[4] && students[4].job}</span>
                      </span>
                    </span>
                  </AvatarStudent>
                  <AvatarStudent>
                    {students[5] && <img src={students[5].avatar} alt={students[5].name} />}
                    <span>
                      <span>
                        <span>{students[5] && students[5].name}</span>
                        <hr /> <span>{students[5] && students[5].job}</span>
                      </span>
                    </span>
                  </AvatarStudent>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {students[0] && (
              <AvatarStudent>
                {students[0] && <img src={students[0].avatar} alt={students[0].name} />}
                <span>
                  <span>
                    <span>{students[0] && students[0].name}</span>
                    <hr /> <span>{students[0] && students[0].job}</span>
                  </span>
                </span>
              </AvatarStudent>
            )}
            {students[1] && (
              <AvatarStudent>
                {students[1] && <img src={students[1].avatar} alt={students[1].name} />}
                <span>
                  <span>
                    <span>{students[1] && students[1].name}</span>
                    <hr /> <span>{students[1] && students[1].job}</span>
                  </span>
                </span>
              </AvatarStudent>
            )}
            {students[2] && (
              <AvatarStudent>
                {students[2] && <img src={students[2].avatar} alt={students[2].name} />}
                <span>
                  <span>
                    <span>{students[2] && students[2].name}</span>
                    <hr /> <span>{students[2] && students[2].job}</span>
                  </span>
                </span>
              </AvatarStudent>
            )}
            {students[3] && (
              <AvatarStudent>
                {students[3] && <img src={students[3].avatar} alt={students[3].name} />}
                <span>
                  <span>
                    <span>{students[3] && students[3].name}</span>
                    <hr /> <span>{students[3] && students[3].job}</span>
                  </span>
                </span>
              </AvatarStudent>
            )}
            {students[4] && (
              <AvatarStudent>
                {students[4] && <img src={students[4].avatar} alt={students[4].name} />}
                <span>
                  <span>
                    <span>{students[4] && students[4].name}</span>
                    <hr /> <span>{students[4] && students[4].job}</span>
                  </span>
                </span>
              </AvatarStudent>
            )}
            {students[5] && (
              <AvatarStudent>
                {students[5] && <img src={students[5].avatar} alt={students[5].name} />}
                <span>
                  <span>
                    <span>{students[5] && students[5].name}</span>
                    <hr /> <span>{students[5] && students[5].job}</span>
                  </span>
                </span>
              </AvatarStudent>
            )}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default connect(state => ({
  users: state.users,
}))(Home);
