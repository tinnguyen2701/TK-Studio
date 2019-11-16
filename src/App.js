import React from 'react';
import { BrowserRouter, Switch as Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import Home from './components/Home';
import Admin from './components/Admin';
import Login from './components/Login';
import About from './components/About';
import Tutorial from './components/Tutorial';
import singleTutorial from './components/Tutorial/singleTutorial';
import Feed from './components/Feed';

export default () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Router>
          <Route exact path="/" component={Home} />
          <Route path="/dashboard" component={Admin} />
          <Route path="/login" component={Login} />
          <Route path="/gioi-thieu" component={About} />
          <Route exact path="/feed" component={Feed} />
          <Route exact path="/feed/page/:numberPage" component={Feed} />
          <Route exact path="/feed/tags/:tag" component={Feed} />
          <Route exact path="/khoa-hoc" component={Tutorial} />
          <Route exact path="/" component={Tutorial} />
          <Route path="/khoa-hoc/:nameCourse" component={singleTutorial} />
        </Router>
      </BrowserRouter>
    </ThemeProvider>
  );
};
