import React from 'react';
import { BrowserRouter, Switch as Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import Home from './components/Home';
import Admin from './components/Admin';
import Login from './components/Login';
import About from './components/About';

export default () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Router>
          <Route exact path="/" component={Home} />
          <Route path="/dashboard" component={Admin} />
          <Route path="/login" component={Login} />
          <Route path="/gioi-thieu" component={About} />
        </Router>
      </BrowserRouter>
    </ThemeProvider>
  );
};
