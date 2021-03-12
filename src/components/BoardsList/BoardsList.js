import "./BoardsList.css";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import api from "../../apis/api";
import { Link } from "react-router-dom";

function BoardsList() {
  const authContext = useContext(AuthContext);

  const [state, setState] = useState([]);
  const [newBoard, setNewBoard] = useState({ title: "" });

  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    setNewBoard({
      creatorId: authContext.loggedInUser.user._id,
      creator: authContext.loggedInUser.user.name,
      title: "",
      columns: [],
    });
  }, [authContext.loggedInUser.user]);

  useEffect(() => {
    async function fetchBoards() {
      const response = await api.get("/board");

      setState([...response.data]);
    }
    fetchBoards();
  }, []);

  useEffect(() => {
    async function fetchBoards() {
      const response = await api.get("/board");

      setState([...response.data]);
    }
    fetchBoards();
  }, [submit]);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await api.post("/board", newBoard);
      setSubmit(!submit);
      setNewBoard({ ...newBoard, title: "" });
    } catch (err) {
      console.error(err);
    }
  }

  function handleChange(event) {
    setNewBoard({ ...newBoard, [event.target.name]: event.target.value });
  }

  return (
    <div className="boards-list">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="board-item">
            <input
              name="title"
              value={newBoard.title}
              onChange={handleChange}
            />
            <button className="add" type="submit">
              +
            </button>
          </div>
        </form>
      </div>

      {state.map((board) => (
        <div key={board._id}>
          <Link to={`/board/${board._id}`} style={{ textDecoration: "none" }}>
            <div className="board-item">
              <div className="title">{board.title}</div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default BoardsList;
