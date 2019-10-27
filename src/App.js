import React from 'react';
import { BrowserRouter, Switch as Router, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import theme from './theme';
import Home from './components/Home';
import Admin from './components/Admin';
import Login from './components/Login';
import About from './components/About';
import Tutorial from './components/Tutorial';
import singleTutorial from './components/Tutorial/singleTutorial';
import phoneBackground from './images/background/phoneBackground.jpeg';

const MobiPhoneSize = styled.div`
  background-image: url(${phoneBackground});
  background-repeat: none;
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100%;
  color: white;
  text-align: center;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    position: absolute;
    display: flex;
    flex-direction: column;
    > p:nth-child(1) {
      margin-bottom: 100px;
    }
  }
`;

export default () => {
  return (
    <ThemeProvider theme={theme}>
      {window.innerWidth > 800 ? (
        <BrowserRouter>
          <Router>
            <Route exact path="/" component={Home} />
            <Route path="/dashboard" component={Admin} />
            <Route path="/login" component={Login} />
            <Route path="/gioi-thieu" component={About} />
            <Route exact path="/khoa-hoc" component={Tutorial} />
            <Route exact path="/" component={Tutorial} />
            <Route path="/khoa-hoc/:nameCourse" component={singleTutorial} />
          </Router>
        </BrowserRouter>
      ) : (
        <MobiPhoneSize>
          <div>
            <p>HIỆN TẠI CHÚNG TÔI ĐANG CẬP NHẬT BẢN WEB TRÊN ĐIỆN THOẠI</p>
            <p>VÀ WEB CỦA CHÚNG TÔI ĐÃ CÓ THỂ XEM TRÊN MÀN HÌNH LỚN HƠN NHƯ LAPTOP, PC</p>
          </div>
        </MobiPhoneSize>
      )}
    </ThemeProvider>
  );
};
