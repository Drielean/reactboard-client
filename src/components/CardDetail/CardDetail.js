import "./CardDetail.css";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { useParams } from "react-router-dom";
import api from "../../apis/api";

import Comment from "../Comment/Comment";

function CardDetail() {
  const authContext = useContext(AuthContext);

  const [state, setState] = useState({ comments: [] });

  const { id } = useParams();

  const [newComment, setNewComment] = useState({});

  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    async function fetchCardDetails() {
      const response = await api.get(`/card/${id}`);

      setState({ ...response.data });
    }
    fetchCardDetails();
  }, [id, toggle]);

  useEffect(() => {
    setNewComment({
      creatorId: authContext.loggedInUser.user._id,
      creator: authContext.loggedInUser.user.name,
      text: "",
      cardId: id,
    });
  }, [authContext.loggedInUser, id]);

  let priority = "card-priority-0";

  switch (state.priority) {
    case 1:
      priority = "card-priority-1";
      break;
    case 2:
      priority = "card-priority-2";
      break;
    case 3:
      priority = "card-priority-3";
      break;
    default:
      priority = "card-priority-0";
  }

  function handleChange(event) {
    setNewComment({ ...newComment, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await api.post("/comment", newComment);
      setNewComment({ ...newComment, text: "" });
      setToggle(!toggle);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="content-detail">
      <div className="card">
        <div className={priority}></div>
        <div className="card-content">
          <div className="card-header">{state.title}</div>
          <div className="card-core">
            <div className="card-description">{state.description}</div>
            <div>Responsável: {state.owner}</div>
            <div>{state.tags}</div>{" "}
          </div>
          <div className="card-footer">
            <div className="dates">
              <div>{new Date(state.created).toLocaleString()}</div>
              {state.deadline && (
                <div>{new Date(state.deadline).toLocaleString()}</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="new-comment">
        <form className="form" onSubmit={handleSubmit}>
          <textarea
            id="text"
            name="text"
            value={newComment.text}
            onChange={handleChange}
          ></textarea>
          <div>
            <button type="submit">Criar</button>
          </div>
        </form>
      </div>

      <ul>
        {state.comments.map((comment) => (
          <li key={comment._id}>
            <Comment comment={comment} toggle={toggle} setToggle={setToggle} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CardDetail;
