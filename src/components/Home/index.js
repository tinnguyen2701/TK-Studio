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
import backgroundFooter from 'images/background/backgroundFooter.png';
import doiNgu from 'images/home/doi-ngu.png';
import logo from 'images/logo/logo.png';
import logoBlack from 'images/logo/logoBlack.png';
import facebook from 'images/logo/facebook.png';
import instagram from 'images/logo/instagram.png';
import youtube from 'images/logo/youtube.png';

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
      width: 120px;
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
      width: 165px;
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

      button.btn-contact {
        border: 2px solid rgb(10, 199, 244);
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

        > h1 {
          transform: translateY(250%);
        }
      }

      h1 {
        margin-bottom: 300px;
      }

      @media (min-width: 1620px) {
        margin-bottom: 450px;
      }

      > div {
        @media screen and (max-width: 800px) {
          display: flex;
          flex-flow: wrap;
          justify-content: center;
        }

        > div {
          @media screen and (min-width: 800px) {
            width: 180px;
            height: 180px;
            margin: 50px 100px;
            ::before {
              width: calc(100% + 50px);
              height: calc(100% + 50px);
            }
            ::after {
              width: calc(100% + 20px);
              height: calc(100% + 20px);
            }
          }
          @media screen and (max-width: 800px) {
            width: 100px;
            height: 100px;
            margin: 20px 20px;
            ::before {
              width: calc(100% + 20px);
              height: calc(100% + 20px);
            }
            ::after {
              width: calc(100% + 10px);
              height: calc(100% + 10px);
            }
          }

          border-radius: 50%;
          position: relative;
          z-index: 1;
          display: inline-block;

          @media (min-width: 1620px) {
            width: 250px;
            height: 250px;
          }

          > img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            z-index: 9;
          }
          ::after {
            content: '';
            position: absolute;
            background: rgb(244, 244, 238);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 50%;
            z-index: -1;
          }

          ::before {
            content: '';
            position: absolute;
            background: rgb(233, 235, 243);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 50%;
            z-index: -2;
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

    padding: 5% 5%;
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

const Footer = styled.div`
  margin-top: 10%;
  position: relative;

  > img {
    width: 100%;
    @media screen and (max-width: 800px) {
      height: 175px;
    }
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
        position: relative;
        transform: translateX(-7px);
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
        position: relative;
        transform: translateX(-13px);
        .subscription {
          word-break: break-word;
        }
        p {
          margin-bottom: 4px;
          font-weight: 600;
          font-size: 9px;
          word-break: break-all;

          > span {
            display: block;
            margin: 5px;
          }
        }
      }

      > div:nth-child(4) {
        transform: translateX(-7px);
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
        .subscription {
          cursor: pointer;
          transition: 200ms all;
          :hover {
            color: white;
          }
        }
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

  return (
    <Wrapper>
      <Banner>
        <Navigation isShowNavbar={isShowNavbar}>
          <img src={logo} className="logo" alt="logo" />
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
                <Link to="/lien-he">LIÊN HỆ</Link>
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
                    <div key={index.toString()}>
                      <img src={user.avatar} alt={user.name} />
                    </div>
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
              </AvatarStudent>
              <AvatarStudent>
                {students[1] && <img src={students[1].avatar} alt={students[1].name} />}
              </AvatarStudent>
            </div>
            <div>
              <AvatarStudent>
                {students[2] && <img src={students[2].avatar} alt={students[2].name} />}
              </AvatarStudent>
              <div>
                <AvatarStudent>
                  {students[3] && <img src={students[3].avatar} alt={students[3].name} />}
                </AvatarStudent>
                <div>
                  <AvatarStudent>
                    {students[4] && <img src={students[4].avatar} alt={students[4].name} />}
                  </AvatarStudent>
                  <AvatarStudent>
                    {students[5] && <img src={students[5].avatar} alt={students[5].name} />}
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
              </AvatarStudent>
            )}
            {students[1] && (
              <AvatarStudent>
                {students[1] && <img src={students[1].avatar} alt={students[1].name} />}
              </AvatarStudent>
            )}
            {students[2] && (
              <AvatarStudent>
                {students[2] && <img src={students[2].avatar} alt={students[2].name} />}
              </AvatarStudent>
            )}
            {students[3] && (
              <AvatarStudent>
                {students[3] && <img src={students[3].avatar} alt={students[3].name} />}
              </AvatarStudent>
            )}
            {students[4] && (
              <AvatarStudent>
                {students[4] && <img src={students[4].avatar} alt={students[4].name} />}
              </AvatarStudent>
            )}
            {students[5] && (
              <AvatarStudent>
                {students[5] && <img src={students[5].avatar} alt={students[5].name} />}
              </AvatarStudent>
            )}
          </div>
        )}
      </div>
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
              <Link to="/khoa-hoc">KHÓA HỌC</Link>
            </p>
            <p>
              <Link to="/feed">BLOG</Link>
            </p>
          </div>
          <div>
            <p className="subscription" onClick={() => subcriptionHandler()}>
              ĐĂNG KÝ LIÊN HỆ
            </p>
            <p>0702450542</p>
            <p>tonkhoastudio@gmail.com</p>
          </div>
          <div>
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
  users: state.users,
}))(Home);
