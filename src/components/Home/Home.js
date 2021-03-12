import "./Home.css";

import { useState, useEffect } from "react";

import logo from "../../images/logo.png";

import Login from "../Auth/Login";
import Signup from "../Auth/Signup";

function Home(props) {
  const [state, setState] = useState({
    slogan: true,
    login: false,
    signup: false,
  });

  function handleLogin() {
    setState({
      slogan: false,
      login: true,
      signup: false,
    });
  }

  function handleSignup() {
    setState({
      slogan: false,
      login: false,
      signup: true,
    });
  }

  useEffect(() => {}, [state]);

  return (
    <div className="home">
      <div className="nav">
        <div className="div-logo">
          <img className="logo" src={logo} alt="logo" />
          <div>React Board</div>
        </div>

        <div className="links">
          <div className="login">
            <div onClick={handleLogin}>Login</div>
          </div>
          <div className="signup">
            <div onClick={handleSignup}>Signup </div>
          </div>
        </div>
      </div>

      {state.slogan && (
        <div className="slogan">
          Gerencie tarefas de forma intuitiva e divertida.
        </div>
      )}

      {state.signup && (
        <div className="div-signup">
          <Signup handleLogin={handleLogin} history={props.history} />
        </div>
      )}

      {state.login && (
        <div className="div-login">
          <Login handleSignup={handleSignup} history={props.history} />
        </div>
      )}
    </div>
  );
}

export default Home;
