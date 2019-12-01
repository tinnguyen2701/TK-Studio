/* eslint-disable */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import backgroundTutorialSingle from 'images/background/backgroundTutorialSingle.png';
import logoWhite from 'images/logo/logoWhite.png';
import { connect } from 'react-redux';
import store from 'store';
import { GET_TUTORIAL_REQUEST } from './duck';

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
  background-image: url(${backgroundTutorialSingle});
  background-repeat: none;
  background-size: cover;
  background-position: 45% 0%;
  position: relative;

  @media screen and (max-width: 800px) {
    height: 600px;
  }

  @media screen and (min-width: 800px) {
    height: 550px;
  }

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

    @media screen and (max-width: 800px) {
      top: 18%;
    }
    @media screen and (min-width: 800px) {
      top: 25%;
    }

    left: 50%;
    transform: translateX(-50%);
    text-align: center;

    > h1 {
      color: ${props => (props.isShowNavbar ? 'rgba(255,255,255,.2)' : 'white')};
    }

    > div > div > img {
      opacity: ${props => props.isShowNavbar && '0.2'};
    }

    @media screen and (max-width: 800px) {
      > h1:nth-child(1) {
        font-size: 30px;
      }
      > h1:nth-child(2) {
        padding: 5px;
        font-size: 30px;
      }
    }

    @media screen and (min-width: 800px) {
      > h1:nth-child(1) {
        font-size: 35px;
      }
      > h1:nth-child(2) {
        font-size: 35px;
      }
    }

    > div {
      @media screen and (max-width: 800px) {
        flex-flow: wrap;
        padding: 2% 0%;
      }
      @media screen and (min-width: 800px) {
        padding: 5% 20%;
      }

      display: flex;
      justify-content: center;
      > div:nth-child(1) {
        @media screen and (max-width: 800px) {
          height: 150px;
        }
        @media screen and (min-width: 800px) {
          width: 250px;
          height: 190px;
        }

        > img {
          height: 100%;
        }
      }
      > div:nth-child(2) {
        @media screen and (max-width: 800px) {
          font-size: 16px;
          padding-left: 15px;
          padding-top: 5px;
        }
        @media screen and (min-width: 800px) {
          font-size: 21px;
          padding-left: 100px;
        }
        text-align: left;
        white-space: pre-line;
      }
    }
  }
`;

const Wrapper = styled.div``;

const Content = styled.div`
  @media screen and (max-width: 800px) {
    padding: 0 5%;

    > div:nth-child(1) {
      flex-flow: wrap;
    }
  }
  @media screen and (min-width: 800px) {
    padding: 0 10%;
  }

  > div:nth-child(1) {
    display: flex;
    justify-content: center;

    > div {
      flex: 1;
      margin: 20px;
      width: 100%;
      > p:nth-child(1) {
        width: 100%;
        display: flex;
        justify-content: center;
        > img {
          height: 222px;
          min-width: 100%;
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
    text-align: center;

    > p:nth-child(1) {
      color: #e54107;
      padding: 10px 0;
      font-size: 22px;
      text-align: left;
    }
  }
`;

const ItemTutorial = styled.div`
  display: inline-block;
  width: 323px;
  height: 318px;
  margin-right: 30px;
  margin-top: 30px;

  @media screen and (max-width: 800px) {
    margin: 10px auto;
    max-width: 100%;
  }

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

  window.scrollTo({ top: 0, behavior: 'smooth' });

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

  const [isShowNavbar, setIsShowNavbar] = useState(false);

  if (tutorial) {
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
      </Wrapper>
    );
  }
  return '';
};

export default connect(state => ({
  tutorial: state.tutorial,
}))(Tutorial);
