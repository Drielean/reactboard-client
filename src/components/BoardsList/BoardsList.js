import "./BoardsList.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function BoardsList() {
  const [state, setState] = useState([]);

  useEffect(() => {
    async function fetchBoards() {
      const response = await axios.get("http://localhost:4000/board");

      setState([...response.data]);
    }
    fetchBoards();
  }, []);

  console.log(state);
  return (
    <div className="boards-list">
      <ul>
        {state.map((board) => (
          <li key={board._id}>
            <Link to={`/board/${board._id}`} style={{ textDecoration: "none" }}>
              <div className="board-item">
                <div className="title">{board.title}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BoardsList;
