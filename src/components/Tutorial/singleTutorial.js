// /* eslint-disable */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import backgroundTutorialSingle from 'images/background/backgroundTutorialSingle.png';
import backgroundFooter from 'images/background/backgroundFooter.png';
import logo from 'images/logo/logo.png';
import logoBlack from 'images/logo/logoBlack.png';
import facebook from 'images/logo/facebook.png';
import instagram from 'images/logo/instagram.png';
import youtube from 'images/logo/youtube.png';
import { connect } from 'react-redux';
import store from 'store';
import { GET_TUTORIAL_REQUEST } from './duck';

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
          color: white;
          font-family: font_strong;
        }
      }
    }
  }
`;

const Banner = styled.div`
  background-image: url(${backgroundTutorialSingle});
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
      font-size: 35px;
    }
    > h1:nth-child(2) {
      font-size: 35px;
    }
    > div {
      display: flex;
      justify-content: center;
      padding: 5% 20%;
      > div:nth-child(1) {
        width: 250px;
        height: 190px;

        > img {
          height: 100%;
        }
      }
      > div:nth-child(2) {
        font-size: 21px;
        text-align: left;
        padding-left: 100px;
        white-space: pre-line;
      }
    }
  }
`;

const Wrapper = styled.div``;

const Content = styled.div`
  padding: 0 10%;

  > div:nth-child(1) {
    display: flex;
    justify-content: center;

    > div {
      flex: 1;
      margin: 20px;
      > p:nth-child(1) {
        width: 100%;
        display: flex;
        justify-content: center;
        > img {
          height: 222px;
        }
      }

      > p:nth-child(2) {
        color: #e54107;
        padding: 10px 0;
        font-size: 22px;
        text-align: center;
      }

      > p:nth-child(3) {
        white-space: pre-line;
        font-size: 19px;
      }
    }
  }

  > div:nth-child(2) {
    margin-top: 50px;
    > p:nth-child(1) {
      color: #e54107;
      padding: 10px 0;
      font-size: 22px;
    }

    > p:nth-child(2) {
      white-space: pre-line;
      font-size: 19px;
    }
  }

  > div:nth-child(3) {
    margin-top: 50px;

    > p:nth-child(1) {
      color: #e54107;
      padding: 10px 0;
      font-size: 22px;
    }
  }
`;

const ItemTutorial = styled.div`
  display: inline-block;
  width: 323px;
  height: 318px;
  margin-right: 30px;
  margin-top: 30px;

  position: relative;
  overflow: hidden;
  border-radius: 8px;
  border: 8px solid #2ca6ef;
  background: #2ca6ef;
  text-align: center;

  > img {
    border-radius: 8px;
    height: 100%;
  }
`;

const Tutorial = ({ match, tutorial }) => {
  useEffect(() => {
    let string = match.params.nameCourse;
    string = string.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    string = string.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    string = string.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    string = string.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    string = string.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    string = string.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    string = string.replace(/đ/g, 'd');

    store.dispatch({ type: GET_TUTORIAL_REQUEST, payload: string });
  }, []);

  const subcriptionHandler = () => {
    window.open(
      'https://forms.gle/bNtEgyX6ijdGWeL16?fbclid=IwAR36hqYi-XTc_CsdWFukFKB8CNgIhPtYGoCuSddOFi_As2x9ZGtu0BUe3vE',
      '_blank',
    );
  };

  if (tutorial) {
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
                <Link to="/#" onClick={() => subcriptionHandler()}>
                  ĐĂNG KÝ
                </Link>
              </li>
              <li>
                <button type="button">
                  <Link to="/lien-he">LIÊN HỆ</Link>
                </button>
              </li>
            </ul>
          </Navigation>
          <div>
            <h1>KHÓA HỌC</h1>
            <h1>
              {tutorial.subject} {tutorial.nameCourse}
            </h1>
            <div>
              <div>
                <img src={tutorial.poster} alt="poster" />
              </div>
              <div>{tutorial.description}</div>
            </div>
          </div>
        </Banner>
        <Content>
          <div>
            <div>
              <p>
                <img src={tutorial.imageObject} alt="object" />
              </p>
              <p>ĐỐI TƯỢNG</p>
              <p>{tutorial.object}</p>
            </div>
            <div>
              <p>
                <img src={tutorial.imageContent} alt="object" />
              </p>
              <p>NỘI DUNG KHÓA HỌC</p>
              <p>{tutorial.content}</p>
            </div>
            <div>
              <p>
                <img src={tutorial.imageRequirement} alt="object" />
              </p>

              <p>YÊU CẦU</p>
              <p>{tutorial.requirement}</p>
            </div>
          </div>
          <div>
            <p>KHAI GIẢNG</p>
            <p>{tutorial.start}</p>
          </div>
          {tutorial.images.length > 0 && (
            <div>
              <p>BÀI VẼ CỦA CÁC BÀI HỌC VIÊN KHÓA TRƯỚC</p>
              <div>
                {tutorial.images.map((item, index) => (
                  <ItemTutorial key={index.toString()}>
                    <img src={item} alt={item} />
                  </ItemTutorial>
                ))}
              </div>
            </div>
          )}
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
                Cs2: Tổ dân phố Hòa Tây - Thị Trấn Phú Đa - Thành Phố Huế (Cách THPT Nguyễn Sinh
                Cung 500m)
              </p>
            </div>
          </div>
        </Footer>
      </Wrapper>
    );
  }
  return '';
};

export default connect(state => ({
  tutorial: state.tutorial,
}))(Tutorial);
