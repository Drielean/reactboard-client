import "./CreateCard.css";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import api from "../../apis/api";

function CreateCard(props) {
  const authContext = useContext(AuthContext);

  const [state, setState] = useState({
    columnId: props.columnId,
    deadline: "",
    creatorId: authContext.loggedInUser.user._id,
    creator: authContext.loggedInUser.user.name,
    owner: authContext.loggedInUser.user.name,
    title: "",
    description: "",
    priority: 1,
  });

  function handleChange(event) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  function handlePriority(event) {
    setState({ ...state, [event.target.name]: parseInt(event.target.value) });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await api.post("/card", state);
      props.handleToggle();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="create-card">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="title">Título</label>
        <input
          className="input-create-card"
          id="title"
          name="title"
          type="text"
          value={state.title}
          onChange={handleChange}
        />

        <label htmlFor="description">Descrição</label>
        <textarea
          className="input-create-card"
          id="description"
          name="description"
          value={state.description}
          onChange={handleChange}
        />

        <label htmlFor="deadline">Prazo</label>
        <input
          className="input-create-card input-date"
          id="deadline"
          name="deadline"
          type="datetime-local"
          value={state.deadline}
          onChange={handleChange}
        />
        <div className="buttons-priority">
          <button
            className={state.priority === 1 ? "btn-green" : "btn-grey"}
            name="priority"
            type="button"
            value="1"
            onClick={handlePriority}
          >
            Baixa
          </button>
          <button
            className={state.priority === 2 ? "btn-yellow" : "btn-grey"}
            name="priority"
            type="button"
            value="2"
            onClick={handlePriority}
          >
            Média
          </button>
          <button
            className={state.priority === 3 ? "btn-red" : "btn-grey"}
            name="priority"
            type="button"
            value="3"
            onClick={handlePriority}
          >
            Alta
          </button>
        </div>
        <div>
          <button className="btnCriar" type="submit">
            Criar
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateCard;
