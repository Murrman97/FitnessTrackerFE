import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout"
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const {loggedIn, token} = useAuth()
  return (
    <div id="nav-bar">
      <Link to="routines">Routines</Link>
      <span> </span>
      {loggedIn ? <Link to="my-routines">My Routines</Link> : null }
      <span> </span>
      {loggedIn ? <Logout/> : (
        <Link to="login">Login</Link>
      )}
    </div>
  );
};

export default Navbar;
