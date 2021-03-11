import "./Navbar.css";
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";

function Navbar() {
  const authContext = useContext(AuthContext);

  function handleLogout() {
    localStorage.removeItem("loggedInUser");
    authContext.setLoggedInUser({});
  }
  return (
    <div className="navbar">
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
      <Link to="/login">
        <button onClick={handleLogout}>Logout</button>
      </Link>
    </div>
  );
}

export default Navbar;
