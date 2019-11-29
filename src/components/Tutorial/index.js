/* eslint-disable*/
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import backgroundHeader from 'images/about/backgroundHeader.png';
import logo from 'images/logo/logo.png';
import logoWhite from 'images/logo/logoWhite.png';
import { connect } from 'react-redux';
import store from 'store';
import { GET_ALL_TUTORIAL_REQUEST } from '../Admin/ducks';

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
          color: black !important;
        }
      }

      button.btn-contact {
        border: 2px solid rgb(10, 199, 244);
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
      top: 33%;
      > h1:nth-child(1) {
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
  @media screen and (max-width: 800px) {
    width: 290px;
  }
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
    </Wrapper>
  );
};

export default connect(state => ({
  tutorials: state.tutorials,
}))(Tutorial);
