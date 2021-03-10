import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import { AuthContextComponent } from "../contexts/authContext";

import Navbar from "./Navbar/Navbar";
import Board from "./Board/Board";
import CardDetail from "./CardDetail/CardDetail";
import BoardsList from "./BoardsList/BoardsList";
import Signup from "../components/Auth/Signup";
import Login from "../components/Auth/Login";

function App() {
  return (
    <div id="app">
      <BrowserRouter>
        <AuthContextComponent>
          <Navbar />
          <Route exact path="/board" component={BoardsList} />
          <Route path="/board/:id" component={Board} />
          <Route path="/card/:id" component={CardDetail} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
        </AuthContextComponent>
      </BrowserRouter>
    </div>
  );
}

export default App;
