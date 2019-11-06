/* eslint-disable*/

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
import { GET_ALL_TUTORIAL_REQUEST } from '../Admin/ducks';

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
    }

    > li {
      margin: 10px;
    }

    > li {
      a {
        text-decoration: none;
        color: black;
        transition: 200ms all;
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
          color: black !important;
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
    height: 420px;
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

  > div:nth-child(2) {
    width: 100%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    color: ${props => (props.isShowNavbar ? 'rgba(255,255,255,.2)' : 'white')};
    text-align: center;

    @media screen and (max-width: 800px) {
      top: 30%;

      > h1:nth-child(1) {
        font-size: 30px;
        text-align: center;
        top: 30%;
      }
      > h1:nth-child(2) {
        font-size: 20px;
      }
    }

    @media screen and (min-width: 800px) {
      top: 25%;
      > h1:nth-child(1) {
        top: 25%;
        font-size: 42px;
      }
      > h1:nth-child(2) {
        font-size: 32px;
      }
    }
  }
`;

const Wrapper = styled.div``;

const Content = styled.div`
  @media screen and (min-width: 800px) {
    padding: 0 10%;
  }
  text-align: center;
`;

const ItemTutorial = styled.div`
  display: inline-block;
  width: 323px;
  height: 298px;
  margin: 15px;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  border: 8px solid #2ca6ef;
  background: #2ca6ef;
  cursor: pointer;

  > img {
    border-radius: 8px;
    height: 100%;
  }

  > div {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    color: white;

    > p:nth-child(1) {
      font-size: 30px;
      font-weight: 600;
    }

    > p:nth-child(2) {
      border: 2px solid white;
      padding: 10px 15px;
      font-size: 16px;
    }

    > img {
      width: 65px;
    }
  }
`;

const Tutorial = ({ tutorials, history }) => {
  useEffect(() => {
    store.dispatch({ type: GET_ALL_TUTORIAL_REQUEST });
  }, []);
  const [isShowNavbar, setIsShowNavbar] = useState(false);

  window.scrollTo({ top: 0, behavior: 'smooth' });

  const subcriptionHandler = () => {
    window.open(
      'https://forms.gle/bNtEgyX6ijdGWeL16?fbclid=IwAR36hqYi-XTc_CsdWFukFKB8CNgIhPtYGoCuSddOFi_As2x9ZGtu0BUe3vE',
      '_blank',
    );
  };

  const onClickHandler = nameCourse => {
    const string = nameCourse
      .split(' ')
      .join('-')
      .toLowerCase();

    history.push(`/khoa-hoc/${string}`);
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
        <div>
          <h1>CÁC KHÓA HỌC Ở TKSTUDIO</h1>
          <h1>Bấm vào hình để xem chi tiết khóa học</h1>
        </div>
      </Banner>
      <Content>
        {tutorials &&
          tutorials.map((tutorial, index) => (
            <ItemTutorial
              key={index.toString()}
              onClick={() => onClickHandler(tutorial.nameCourse)}
            >
              <img src={tutorial.poster} alt={tutorial.nameCourse} />
              <div>
                <p>{tutorial.subject}</p>
                <p>{tutorial.nameCourse}</p>
                <img src={logo} alt="logo" />
              </div>
            </ItemTutorial>
          ))}
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
              <Link to="/khoa-hoc">KHÓA HỌC</Link>
            </p>
          </div>
          <div>
            <p>
              ĐĂNG KÝ <span />
              LIÊN HỆ
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
  tutorials: state.tutorials,
}))(Tutorial);
