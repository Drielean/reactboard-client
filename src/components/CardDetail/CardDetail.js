import "./CardDetail.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function CardDetail() {
  const [state, setState] = useState({ comments: [] });

  const { id } = useParams();

  const [comment, setComment] = useState({
    creator: "react",
    text: "",
    cardId: id,
  });

  const [send, setSend] = useState(false);

  useEffect(() => {
    async function fetchCardDetails() {
      const response = await axios.get(`http://localhost:4000/card/${id}`);

      setState({ ...response.data });
    }
    fetchCardDetails();
  }, [id, send]);

  let priority = "card-priority-1";

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
      priority = "card-priority-1";
  }

  function handleChange(event) {
    setComment({ ...comment, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:4000/comment", comment);
      setComment({ ...comment, text: "" });
      setSend(!send);
    } catch (err) {
      console.error(err);
    }
  }

  console.log(comment);

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
            value={comment.text}
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
            <div className="comment">
              <div>{new Date(comment.created).toLocaleString()}</div>
              <div>{comment.text}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CardDetail;
