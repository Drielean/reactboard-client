import "./App.css";
import Navbar from "./Navbar/Navbar";
import Board from "./Board/Board";
import CardDetail from "./CardDetail/CardDetail";
import BoardsList from "./BoardsList/BoardsList";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <div id="app">
      <BrowserRouter>
        <Navbar />
        <Route exact path="/board" component={BoardsList} />
        <Route path="/board/:id" component={Board} />
        <Route path="/card/:id" component={CardDetail} />
      </BrowserRouter>
    </div>
  );
}

export default App;
