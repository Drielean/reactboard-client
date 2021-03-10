import "./CreateCard.css";
import { useState, useEffect } from "react";
import api from "../../apis/api";

function CreateCard(props) {
  const [state, setState] = useState({
    columnId: props.columnId,
    deadline: "",
    creator: "react",
    owner: "react",
    title: "",
    description: "",
    tags: ["tag1", "tag2", "tag3"],
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

  useEffect(() => console.log(state), [state]);

  return (
    <div className="create-card">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="title">Título</label>
        <input
          id="title"
          name="title"
          type="text"
          value={state.title}
          onChange={handleChange}
        />

        <label htmlFor="description">Descrição</label>
        <textarea
          id="description"
          name="description"
          value={state.description}
          onChange={handleChange}
        />

        <label htmlFor="deadline">Prazo</label>
        <input
          id="deadline"
          name="deadline"
          type="datetime-local"
          value={state.deadline}
          onChange={handleChange}
        />
        <div>
          <button
            className={state.priority === 1 ? "btn-green" : ""}
            name="priority"
            type="button"
            value="1"
            onClick={handlePriority}
          >
            Baixa
          </button>
          <button
            className={state.priority === 2 ? "btn-yellow" : ""}
            name="priority"
            type="button"
            value="2"
            onClick={handlePriority}
          >
            Média
          </button>
          <button
            className={state.priority === 3 ? "btn-red" : ""}
            name="priority"
            type="button"
            value="3"
            onClick={handlePriority}
          >
            Alta
          </button>
        </div>

        <button type="submit">Criar</button>
      </form>
    </div>
  );
}

export default CreateCard;
