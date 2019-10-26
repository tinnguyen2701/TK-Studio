import React, { useEffect } from 'react';
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
    justify-content: space-between;
    width: 100%;
    padding: 0 10%;
    top: 50%;
    transform: translateY(0%);
    position: absolute;

    > div {
      flex: 1;
    }

    > div:nth-child(1) {
      > img {
        width: 200px;
      }

      position: relative;

      > div {
        position: absolute;
        top: 60px;
        left: 100px;
      }

      a {
        margin-left: 4px;
      }

      a > img {
        width: 30px;
      }
    }

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
      margin-bottom: 10px;
    }
  }
`;

const Navigation = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  padding: 15px 10% 0 10%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 165px;
  }

  ul {
    list-style: none;
    display: flex;

    > li {
      margin: 10px;

      a {
        text-decoration: none;
        color: black;
        font-weight: 600;
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
  }
`;

const Banner = styled.div`
  background-image: url(${backgroundHeader});
  background-repeat: none;
  background-size: cover;
  background-position: center;
  position: relative;
  height: 550px;
  overflow: hidden;
  margin-bottom: 50px;

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
    top: 25%;
    left: 50%;
    transform: translateX(-50%);
    color: white;
    text-align: center;

    > h1:nth-child(1) {
      font-size: 42px;
    }
    > h1:nth-child(2) {
      font-size: 32px;
    }
  }
`;

const Wrapper = styled.div``;

const Content = styled.div`
  padding: 0 10%;
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

const Tutorial = ({ tutorials }) => {
  useEffect(() => {
    store.dispatch({ type: GET_ALL_TUTORIAL_REQUEST });
  }, []);

  window.scrollTo({ top: 0, behavior: 'smooth' });

  const onClickHandler = nameCourse => {
    const string = nameCourse
      .split(' ')
      .join('-')
      .toLowerCase();
    window.open(`${process.env.REACT_APP_BASE_URL}khoa-hoc/${string}`, '_blank');
  };

  return (
    <Wrapper>
      <Banner>
        <Navigation>
          <img src={logo} alt="logo" />
          <ul>
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
              <Link to="/dang-ky">ĐĂNG KÝ</Link>
            </li>
            <li>
              <button type="button">
                <Link to="/lien-he">LIÊN HỆ</Link>
              </button>
            </li>
          </ul>
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
              <a href="/">
                <img src={facebook} alt="logo facebook" />
              </a>
              <a href="/">
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
            <p>ĐĂNG KÝ LIÊN HỆ</p>
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
