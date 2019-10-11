import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import store from 'store';
import { FETCH_DATA_REQUEST } from './duck';

const App = ({ data }) => {
  useEffect(() => {
    store.dispatch({ type: FETCH_DATA_REQUEST });
  }, []);

  return data && <div>chi cha ddc {data.success ? 'goi success' : ' goi false'}</div>;
};

export default connect(state => ({
  data: state.data,
}))(App);
