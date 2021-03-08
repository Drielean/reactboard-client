import { Draggable } from "react-beautiful-dnd";

import "./Card.css";

function Card(props) {
  return (
    <Draggable draggableId={props.card._id} index={props.index}>
      {(provided, snapshot) => {
        return (
          <div
            className={`card ${snapshot.isDragging && "dragging"}`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {props.card.title}
          </div>
        );
      }}
    </Draggable>
  );
}

export default Card;
