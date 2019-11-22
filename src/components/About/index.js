/* eslint-disable */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store from 'store';
import backgroundHeader from 'images/about/backgroundHeader.png';
import muoiba from 'images/about/muoiba.jpg';
import muoihai from 'images/about/muoihai.jpg';
import muoimot from 'images/about/muoimot.jpg';
import muoi from 'images/about/muoi.jpg';
import chin from 'images/about/chin.jpg';
import tam from 'images/about/tam.jpg';
import bay from 'images/about/bay.jpg';
import sau from 'images/about/sau.jpg';
import nam from 'images/about/nam.jpg';
import bon from 'images/about/bon.jpg';
import hai from 'images/about/hai.jpg';
import mot from 'images/about/mot.png';

import backgroundFooter from 'images/background/backgroundFooter.png';
import logo from 'images/logo/logo.png';
import logoBlack from 'images/logo/logoBlack.png';
import facebook from 'images/logo/facebook.png';
import instagram from 'images/logo/instagram.png';
import youtube from 'images/logo/youtube.png';
import { GET_VIDEO_REQUEST } from './duck';

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
          transition: 200ms all;
          color: black important;
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
      top: 33%;
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
  padding: 0 10%;
  div:nth-child(1) {
    p:nth-child(1) {
      @media screen and (max-width: 800px) {
        font-size: 16px;
      }
      @media screen and (min-width: 800px) {
        font-size: 25px;
      }
    }
  }

  @media screen and (max-width: 800px) {
    div:nth-child(2) {
      text-align: center;
      padding-top: 20px;
      > img {
        width: 45%;
        margin: 5px;
      }
      > div {
        display: flex;
        flex-direction: row;

        > img:nth-child(1) {
          width: 49%;
          margin: 0 5px;
        }
        > img:nth-child(2) {
          width: 45%;
        }
      }
    }
  }

  .partial {
    display: flex;
    justify-content: center;
    align-items: center;

    > div {
      display: flex;
      > div {
        flex: 1;
      }

      > div:nth-child(1) {
        > div:nth-child(1) {
          width: 554px;
          height: 418px;
          margin: 10px 10px 10px 0px;
          position: relative;
          overflow: hidden;
          border-radius: 10px;

          > img {
            position: absolute;
            top: -160px;
            transform: scale(0.65);
            left: -195px;
            border-radius: 10px;
          }
        }
        > div:nth-child(2) {
          width: 554px;
          height: 457px;
          margin: 30px 10px 10px 0;

          position: relative;
          overflow: hidden;
          border-radius: 10px;
        }
      }

      > div:nth-child(2) {
        > div:nth-child(1) {
          width: 558px;
          height: 287px;
          margin: 10px;
          position: relative;
          overflow: hidden;
          border-radius: 10px;
        }
        > div:nth-child(2) {
          display: flex;
          > div {
            flex: 1;
          }

          > div:nth-child(1) {
            width: 257px;
            height: 598px;
            margin: 10px;
            position: relative;
            overflow: hidden;
            border-radius: 10px;
          }

          > div:nth-child(2) {
            > div {
              position: relative;
              overflow: hidden;
              border-radius: 10px;
            }

            > div:nth-child(1) {
              width: 264px;
              height: 264px;
              margin: 10px;

              > img {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0.18);
              }
            }
            > div:nth-child(2) {
              width: 264px;
              height: 290px;
              margin: 40px 10px 10px 10px;

              > img {
                position: absolute;
                top: -45%;
                left: -10px;
              }
            }
          }
        }
      }
    }
  }

  .partial-reverse {
    justify-content: center;
    align-items: center;
    display: flex;

    > div {
      display: flex;
      > div {
        flex: 1;
      }

      > div:nth-child(1) {
        > div:nth-child(1) {
          width: 558px;
          height: 287px;
          overflow: hidden;
          border-radius: 10px;
          margin: 10px 10px 10px 0;
          position: relative;

          > img {
            position: absolute;
            transform: scale(0.6);
            top: -155px;
            left: -230px;
          }
        }

        > div:nth-child(2) {
          display: flex;
          div {
            flex: 1;
          }
          > div:nth-child(1) {
            > div:nth-child(1) {
              width: 264px;
              height: 264px;
              overflow: hidden;
              border-radius: 10px;
              margin: 10px 10px 10px 0;
              position: relative;

              > img {
                position: absolute;
                transform: scale(1.4);
                left: 28px;
              }
            }
            > div:nth-child(2) {
              width: 264px;
              height: 289px;
              overflow: hidden;
              border-radius: 10px;
              margin-top: 40px;
              position: relative;

              > img {
                position: absolute;
                transform: scale(0.9);
                left: -100px;
                top: -20px;
              }
            }
          }
          > div:nth-child(2) {
            width: 257px;
            height: 598px;
            overflow: hidden;
            border-radius: 10px;
            margin: 10px;
            position: relative;

            > img {
              position: absolute;
              transform: scale(0.6);
              top: -205px;
              left: -250px;
            }
          }
        }
      }
      > div:nth-child(2) {
        > div:nth-child(1) {
          width: 554px;
          height: 418px;
          overflow: hidden;
          border-radius: 10px;
          margin: 10px;
          position: relative;

          > img {
            position: absolute;
            transform: scale(0.61);
            left: -270px;
            top: -135px;
          }
        }
        > div:nth-child(2) {
          width: 554px;
          height: 457px;
          overflow: hidden;
          border-radius: 10px;
          margin: 30px 10px 10px 10px;
          position: relative;

          > img {
            position: absolute;
            transform: scale(0.8);
            top: -155px;
            left: -335px;
          }
        }
      }
    }
  }
`;

const Video = styled.div`
  padding-top: 5%;
  > div {
    display: flex;
    flex-flow: wrap;
    justify-content: center;
    align-items: center;
    margin-top: 2%;
    letter-spacing: 1px;

    @media screen and (max-width: 800px) {
      padding-top: 20px;

      img {
        width: 100%;
      }
      > div:nth-child(2) {
        text-align: left;
      }
    }

    @media screen and (min-width: 800px) {
      > div:nth-child(1) {
        flex: 1;
      }

      > div:nth-child(2) {
        flex: 1;
      }
    }
  }

  > div:nth-child(odd) {
    > div:nth-child(2) {
      padding-left: 3%;
    }
  }

  > div:nth-child(even) {
    flex-direction: row-reverse;
    > div:nth-child(2) {
      padding-right: 3%;
    }
  }
`;

const Wrapper = styled.div``;
const About = ({ videos }) => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  const [isShowNavbar, setIsShowNavbar] = useState(false);

  useEffect(() => {
    store.dispatch({ type: GET_VIDEO_REQUEST });
  }, []);

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
        <h1>GIỚI THIỆU VỀ TKSTUDIO</h1>
      </Banner>
      <Content>
        <div>
          TKStudio là trung tâm luyện thi Kiến trúc – Mỹ thuật chất lượng hàng đầu trên địa bàn tỉnh
          Thừa Thiên Huế. Với tiêu chí “Thi là đậu”, TKStudio sẽ là điểm đến tin cậy đến các bạn có
          nhu cầu luyện thi nói riêng, có niềm đam mê hội họa – mỹ thuật nói chung.
        </div>
        {window.innerWidth > 800 ? (
          <div>
            <div className="partial">
              <div>
                <div>
                  <div>
                    <img src={muoihai} alt="muoihai" />
                  </div>
                  <div>
                    <img src={muoimot} alt="muoimot" />
                  </div>
                </div>
                <div>
                  <div>
                    <img src={muoi} alt="muoi" />
                  </div>
                  <div>
                    <div>
                      <img src={chin} alt="chin" />
                    </div>
                    <div>
                      <div>
                        <img src={tam} alt="tam" />
                      </div>
                      <div>
                        <img src={bay} alt="bay" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="partial-reverse">
              <div>
                <div>
                  <div>
                    <img src={bon} alt="bon" />
                  </div>
                  <div>
                    <div>
                      <div>
                        <img src={hai} alt="hai" />
                      </div>
                      <div>
                        <img src={mot} alt="mot" />
                      </div>
                    </div>
                    <div>
                      <img src={muoiba} alt="muoiba" />
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <img src={sau} alt="sau" />
                  </div>
                  <div>
                    <img src={nam} alt="nam" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <img src={muoimot} alt="muoimot" />
            <img src={muoi} alt="muoi" />
            <img src={muoiba} alt="muoiba" />
            <img src={bay} alt="bay" />
            <img src={tam} alt="tam" />
            <img src={muoihai} alt="muoihai" />
            <img src={bon} alt="bon" />
            <img src={mot} alt="mot" />
            <div>
              <img src={hai} alt="hai" />
              <img src={chin} alt="chin" />
            </div>
            <img src={nam} alt="nam" />
            <img src={sau} alt="sau" />
          </div>
        )}

        <Video>
          {videos.map((video, index) => (
            <div key={index.toString()}>
              <div>
                <a target="_blank" href={video.link}>
                  <img src={video.poster} />
                </a>
              </div>
              <div>{video.description}</div>
            </div>
          ))}
        </Video>
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
            <p>
              <Link to="/feed">BLOG</Link>
            </p>
          </div>
          <div>
            <p className="subscription">ĐĂNG KÝ LIÊN HỆ</p>
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
  videos: state.videos,
}))(About);
