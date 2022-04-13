import { postLoginUser } from "../api";
import React, { useState } from "react";
import useAuth from "../hooks/useAuth";

const Login = ({}) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { loggedIn, setLoggedIn, setToken } = useAuth();

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await postLoginUser(username, password);
    console.log(user);
    if (user.error) {
      setError(user.error);
    } else {
      const token = await user.token;
      localStorage.setItem("token", token);
      setLoggedIn(true);
      setToken(localStorage.getItem("token"));
    }
  };
  return (
    <div className='login'>
      {{ error } ? <h1>{error}</h1> : null}
      <form onSubmit={handleSubmit}>
        <input
          value={username}
          type='text'
          placeholder='username'
          onChange={handleUsername}
        />
        <input
          value={password}
          type='password'
          placeholder='password'
          onChange={handlePassword}
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default Login;
