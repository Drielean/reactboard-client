import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  function handleLogout() {
    localStorage.removeItem("loggedInUser");
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
