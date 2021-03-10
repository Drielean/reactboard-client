import { Draggable } from "react-beautiful-dnd";

import "./Card.css";

function draggableCard(props) {
  let priority = "card-priority-1";

  switch (props.card.priority) {
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

  return (
    <Draggable draggableId={props.card._id} index={props.index}>
      {(provided, snapshot) => {
        return (
          <div
            className={` card ${snapshot.isDragging && "dragging"}`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className={priority}></div>
            <div className="card-content">
              <div className="card-header">{props.card.title}</div>
              <div className="card-core">
                <div className="card-description">{props.card.description}</div>
                <div>Responsável: {props.card.owner}</div>
                <div>{props.card.tags}</div>{" "}
              </div>
              <div className="card-footer">
                <div className="dates">
                  <div>{new Date(props.card.created).toLocaleString()}</div>
                  {props.card.deadline && (
                    <div>{new Date(props.card.deadline).toLocaleString()}</div>
                  )}
                  <button onClick={() => alert("clicado!")}>Edit</button>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}

export default draggableCard;
