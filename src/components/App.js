import "./App.css";
import Navbar from "./Navbar/Navbar";
import Board from "./Board/Board";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <div id="app">
      <BrowserRouter>
        <Navbar />
        <Route path="/board/:key" component={Board} />
      </BrowserRouter>
    </div>
  );
}

export default App;
