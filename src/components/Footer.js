/* eslint-disable */

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logoBlack from 'images/logo/logoBlack.png';
import facebook from 'images/logo/facebook.png';
import instagram from 'images/logo/instagram.png';
import youtube from 'images/logo/youtube.png';
import backgroundFooter from 'images/background/bgFooter.png';

const Footer = styled.div`
  margin-top: 10%;
  position: relative;

  @media screen and (min-width: 800px) {
    height: 600px;
    overflow: hidden;
  }

  > img {
    width: 100%;
    @media screen and (max-width: 800px) {
    }
    vertical-align: middle;
  }

  > div {
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
    position: absolute;
    width: 100%;
    @media screen and (min-width: 800px) {
      padding: 0 5%;
      top: 53%;
    }
    @media screen and (max-width: 800px) {
      padding: 0 1%;
      top: 50%;
      transform: translateY(-46%);
    }

    > div {
      @media screen and (max-width: 800px) {
        width: 50%;
        margin-top: 25px;
        padding-left: 12px;
      }
      @media screen and (min-width: 800px) {
        flex: 1;
      }
    }

    .title-footer {
      font-size: 22px;
      font-weight: bold;
      margin-bottom: 50px;
      position: relative;

      ::before,
      ::after {
        content: '';
        position: absolute;
        height: 2px;
        background: black;
        border-radius: 2px;
        left: 0;
      }

      ::after {
        width: 60px;
        bottom: -24px;
      }

      ::before {
        width: 30px;
        bottom: -20px;
      }

      @media screen and (max-width: 800px) {
        font-size: 12px;
        margin-bottom: 20px;

        ::before,
        ::after {
          height: 1px;
        }
        ::before {
          bottom: -6px;
        }
        ::after {
          bottom: -9px;
        }
      }
    }

    > div:nth-child(1) {
      > div {
        text-align: center;
        position: relative;
        transform: translateX(-30%);
        img {
          width: 40%;
        }
        ul {
          list-style: none;
          margin-top: 7px;
          margin-left: 5px;

          > li {
            display: inline-block;
            margin-right: 5px;

            img {
              width: 30px;
            }

            @media screen and (max-width: 800px) {
              img {
                width: 20px;
              }
            }
          }
        }
      }
    }

    > div:nth-child(2) {
      ul {
        list-style: none;

        > li {
          margin: 6px 0;
          font-weight: bold;

          > a {
            text-decoration: none;
            color: black;
            transition: 200ms all;
            :hover {
              color: white;
            }
          }
          @media screen and (max-width: 800px) {
            margin: 2px 0;

            > a {
              font-size: 12px;
            }
          }
        }
      }
    }

    > div:nth-child(3) {
      p:not(:first-child) {
        font-weight: bold;
        margin: 6px 0;
        word-break: break-all;
        @media screen and (max-width: 800px) {
          font-size: 12px;
        }
      }
      button {
        background: none;
        border: 1px solid rgb(44, 166, 239);
        border-radius: 5px;
        padding: 5px 10px;
        transition: 200ms all;
        color: black;
        font-weight: bold;
        cursor: pointer;
        margin-top: 7px;
        :hover {
          background: rgb(44, 166, 239);
          color: white;
        }
      }
    }

    > div:nth-child(4) {
      p:not(:first-child) {
        font-weight: bold;
        margin-bottom: 6px;

        @media screen and (max-width: 800px) {
          font-size: 12px;
        }
      }
    }

    > div:nth-child(5) {
      width: 100%;
      flex: none;
      margin-top: 0;
      > q {
        font-size: 12px;
        @media screen and (max-width: 800px) {
          font-size: 10px;
        }
        display: block;
        text-align: center;
      }
    }
  }
`;
export default () => {
  const subcriptionHandler = () => {
    window.open(
      'https://forms.gle/bNtEgyX6ijdGWeL16?fbclid=IwAR36hqYi-XTc_CsdWFukFKB8CNgIhPtYGoCuSddOFi_As2x9ZGtu0BUe3vE',
      '_blank',
    );
  };
  return (
    window.location.href.split('/')[window.location.href.split('/').length - 1] !== 'dashboard' && (
      <Footer>
        <img src={backgroundFooter} alt="footer background" />
        <div>
          <div>
            <div>
              <div>
                <img src={logoBlack} alt="logo black" />
                <ul>
                  <li>
                    <a href="https://www.facebook.com/TonKhoaStudio/" target="_blank">
                      <img src={facebook} alt="logo facebook" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/tonkhoastudio/" target="_blank">
                      <img src={instagram} alt="logo instagram" />
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <img src={youtube} alt="logo youtube" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <p className="title-footer">Liên Kết Trang</p>
            <ul>
              <li>
                <Link to="/" target="_top">
                  TRANG CHỦ
                </Link>
              </li>
              <li>
                <Link to="/gioi-thieu" target="_top">
                  GIỚI THIỆU
                </Link>
              </li>
              <li>
                <Link to="/khoa-hoc" target="_top">
                  KHÓA HỌC
                </Link>
              </li>
              <li>
                <Link to="/feed" target="_top">
                  BLOG
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="title-footer">Đăng Ký Liên Hệ</p>
            <p>0702450542</p>
            <p>tonkhoastudio@gmail.com</p>
            <button type="button" onClick={() => subcriptionHandler()}>
              Đăng ký khóa học
            </button>
          </div>
          <div>
            <p className="title-footer">Địa chỉ</p>
            <p>Cs1: 69 Lê Trung Định, TP.Huế</p>
            <p>
              Cs2: Tổ dân phố Hòa Tây - Thị Trấn Phú Đa - Thành Phố Huế (Cách THPT Nguyễn Sinh Cung
              500m)
            </p>
          </div>
          <div>
            <q>BẢN QUYỀN THUỘC CÔNG TY TNHH TKSTUDIO - MÃ SỐ DOANH NGHIỆP: 3301660982</q>
          </div>
        </div>
      </Footer>
    )
  );
};
