import "./Navbar.css";
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";

import logo from "../../images/logo.png";

function Navbar() {
  const authContext = useContext(AuthContext);

  function handleLogout() {
    localStorage.removeItem("loggedInUser");
    authContext.setLoggedInUser({});
  }
  return (
    <div className="navbar">
      <div className="nav">
        <div className="div-logo">
          <img className="logo" src={logo} alt="logo" />
          <div>React Board</div>
        </div>

        <div className="links">
          <Link to="/">
            <button onClick={handleLogout}>Logout</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
