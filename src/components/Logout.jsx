import React, { useState } from "react";
import useAuth from "../hooks/useAuth";

const Logout = () => {
  const { setToken, setLoggedIn } = useAuth();
  const logoutUser = () => {
    setLoggedIn(false);
    setToken(false);
    localStorage.removeItem("token");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        logoutUser();
      }}
    >
      <button type='submit'>Logout</button>
    </form>
  );
};

export default Logout;
