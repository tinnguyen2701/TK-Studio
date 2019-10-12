import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import store from 'store';
import { LOGIN_REQUEST } from './ducks';

export default ({ history }) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const onSubmitHandler = e => {
    e.preventDefault();
    store.dispatch({ type: LOGIN_REQUEST, payload: { username, password, history } });
  };

  return (
    <form onSubmit={e => onSubmitHandler(e)}>
      {/* {currentUser === false && <p>Email or password was wrong!</p>} */}
      <p>
        <span>username: </span>
        <input
          type="text"
          placeholder="username.."
          value={username || ''}
          onChange={e => setUsername(e.target.value)}
        />
      </p>

      {username === '' && <p>username is required!</p>}
      <p>
        <span>Password: </span>
        <input
          type="password"
          placeholder="Password.."
          value={password || ''}
          onChange={e => setPassword(e.target.value)}
        />
      </p>
      {password === '' && <p>Password is required!</p>}
      <p>
        <button type="submit" disabled={!username || !password}>
          Submit
        </button>
      </p>
      <Link to="/auth/verify">forgot your password ?</Link>
    </form>
  );
};
