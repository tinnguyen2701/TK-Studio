// /* eslint-disable */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import store from 'store';
import { connect } from 'react-redux';
import bannerBackground from 'images/banner/bannerBackground.png';
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
  padding: 15px 10% 0 10%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 165px;
  }

  img.nguoi-ve {
    position: absolute;
    top: 21%;
    left: 54%;
    transform: scale(0.6);
    animation: move 10s linear alternate infinite;
  }

  @keyframes move {
    50% {
      top: 31%;
      left: 39%;
    }
    75% {
      top: 39%;
      left: 33%;
      transform: scale(0.6) skewX(6deg);
    }
    85% {
      top: 40%;
      left: 30%;
      transform: scale(0.6) skewX(6deg);
    }
    100% {
      top: 39%;
      left: 33%;
      transform: scale(0.6) skewX(6deg);
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
        border-radius: 12px;
        padding: 5px 10px;
        margin-top: -5px;

        > a {
          color: white;
        }
      }
    }
  }
`;

const Banner = styled.div`
  position: relative;
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
      border-radius: 20px;
      padding: 10px 8px;

      > a {
        color: white;
        text-decoration: none;
      }
    }
  }
`;

const Wrapper = styled.div`
  > div:nth-child(2) {
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
      background: rgb(10, 199, 244);
      border: none;
      border-radius: 20px;
      padding: 10px 10px;

      > a {
        color: white;
        text-decoration: none;
      }
    }
  }

  > div:nth-child(3) {
    position: relative;
    margin-top: 3%;

    > div {
      position: absolute;
      text-align: center;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      width: 100%;

      h1 {
        margin-bottom: 300px;
      }

      > div {
        > div {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          position: relative;
          z-index: 1;
          display: inline-block;
          margin: 50px 100px;

          > img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            z-index: 9;
          }
          ::after {
            content: '';
            position: absolute;
            width: calc(100% + 20px);
            height: calc(100% + 20px);
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
            width: calc(100% + 50px);
            height: calc(100% + 50px);
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
    padding: 0 10%;
    text-align: center;

    div {
      border-radius: 10px;
      overflow: hidden;

      > img {
        height: 100%;
      }
    }

    > div {
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
          display: flex;

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
`;

const Footer = styled.div`
  margin-top: 10%;
  position: relative;
  > img {
    width: 100%;
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

const AvatarStudent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Home = ({ users }) => {
  useEffect(() => {
    store.dispatch({ type: GET_ALL_USER_REQUEST });
  }, []);

  const students = users.filter(user => user.role === 'student');

  return (
    <Wrapper>
      <Banner>
        <Navigation>
          <img src={logo} alt="logo" />
          <img src={nguoive} className="nguoi-ve" alt="nguoi ve" />
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
          <p>Là trung tâm luyện thi Kiến trúc - Mỹ thuật</p>
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
        <img alt="anh test" src={doiNgu} style={{ width: '100%' }} />
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
        <div>
          <div>
            <AvatarStudent>
              {students[0] && <img src={students[0].avatar} alt={students[0].name} />}
            </AvatarStudent>
            <AvatarStudent>
              {students[1] && <img src={students[1].avatar} alt={students[2].name} />}
            </AvatarStudent>
          </div>
          <div>
            <AvatarStudent>
              {students[2] && <img src={students[2].avatar} alt={students[3].name} />}
            </AvatarStudent>
            <div>
              <AvatarStudent>
                {students[3] && <img src={students[3].avatar} alt={students[4].name} />}
              </AvatarStudent>
              <div>
                <AvatarStudent>
                  {students[4] && <img src={students[4].avatar} alt={students[5].name} />}
                </AvatarStudent>
                <AvatarStudent>
                  {students[5] && <img src={students[5].avatar} alt={students[6].name} />}
                </AvatarStudent>
              </div>
            </div>
          </div>
        </div>
      </div>
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
  users: state.users,
}))(Home);
