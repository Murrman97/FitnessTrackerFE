import { postLoginUser } from "../api";
import React, { useState } from "react";
import { handleUsername, handlePassword } from "./Register";

const Login = ({
  username,
  setUsername,
  password,
  setPassword,
  error,
  setError,
}) => {
  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await postLoginUser(username, password);
    console.log(user);
    const token = await user.token;
    localStorage.setItem("token", token);
    if (user.error) {
      setError(user.error);
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
