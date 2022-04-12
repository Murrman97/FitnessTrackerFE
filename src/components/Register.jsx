import { postRegisterUser } from "../api";
import React, { useState } from "react";

const Register = ({
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
    const user = await postRegisterUser(username, password);
    const token = await user.token;
    localStorage.setItem("token", token);
    if (user.error) {
      setError(user.error);
    }
  };

  return (
    <div className='register'>
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
        <button type='submit'>Register</button>
      </form>
    </div>
  );
};

export default Register;
