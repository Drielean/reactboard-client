import { Draggable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";

import "./Card.css";

function draggableCard(props) {
  let priority = "card-priority-0";

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
      priority = "card-priority-0";
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
              <div className="card-header">
                {props.card.title}
                <div>
                  <Link
                    to={`/card/${props.card._id}`}
                    params={{ id: props.card._id }}
                  >
                    <button>Ver</button>
                  </Link>
                </div>
              </div>
              <div className="card-core">
                <div>Responsável: {props.card.owner}</div>
                <div>{props.card.tags}</div>{" "}
              </div>
              <div className="card-footer">
                <div className="dates">
                  <div>{new Date(props.card.created).toLocaleString()}</div>
                  {props.card.deadline && (
                    <div>{new Date(props.card.deadline).toLocaleString()}</div>
                  )}
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
