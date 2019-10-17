import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import bannerBackground from 'images/banner/bannerBackground.png';
import logo from 'images/logo/logo.png';
import nguoive from 'images/person/nguoive.png';
import nguoingoi from 'images/person/nguoingoi.png';

const Wrapper = styled.div`
  background-image: url(${bannerBackground});
  background-repeat: none;
  background-size: cover;
  background-position: center;

  div:nth-child(2) {
    padding: 0 10%;
    width: 44%;
    font-size: 20px;
    color: white;
    padding-bottom: 30%;
    padding-top: 10%;

    button {
      background: rgb(10, 199, 244);
      border: none;
      border-radius: 10px;
      padding: 5px 10px;

      > a {
        color: white;
        text-decoration: none;
      }
    }
  }
`;

const Navigation = styled.div`
  padding: 15px 10% 0 10%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 165px;
  }

  img.nguoi-ve {
    position: absolute;
    top: 27%;
    left: 50%;
    transform: scale(0.6);
    animation: move 10s ease alternate infinite;
  }

  img.nguoi-ngoi {
    position: absolute;
    top: 25%;
    left: 85%;
    transform: scale(0.6);
  }

  @keyframes move {
    0% {
      top: 27%;
      left: 50%;
    }
    50% {
      top: 35%;
      left: 44%;
    }
    100% {
      top: 43%;
      left: 35%;
    }
  }

  ul {
    list-style: none;
    display: flex;

    > li {
      margin: 5px;

      a {
        text-decoration: none;
        color: black;
        font-weight: 600;
      }

      button {
        background: rgb(44, 166, 239);
        border: none;
        border-radius: 10px;
        padding: 5px 10px;
        margin-top: -5px;

        > a {
          color: white;
        }
      }
    }
  }
`;

export default () => {
  return (
    <Wrapper>
      <Navigation>
        <img src={logo} alt="logo" />
        <img src={nguoive} className="nguoi-ve" alt="nguoi ve" />
        <img src={nguoingoi} className="nguoi-ngoi" alt="nguoi ngoi" />
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
        <h1>TKStudio</h1>
        <br />
        <p>Là trung tâm luyện thi kiến trúc - Mỹ thuật</p>
        <p>Chất lượng hàng đầu trên địa bàn tỉnh Thừa Thiên Huế.</p>
        <p>
          Với tiêu chí &quot;thi là đậu&quot;, TK-Studio sẽ là điểm đến tin cậy đến các bạn có nhu
          cầu luyện thi nói riêng
        </p>
        <br />
        <button type="button">
          <Link to="/gioi-thieu">XEM THÊM</Link>
        </button>
      </div>
    </Wrapper>
  );
};
