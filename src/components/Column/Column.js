import { Droppable } from "react-beautiful-dnd";
import Card from "../Card/Card";

import "./Column.css";

function Column(props) {
  return (
    <div className="column-place">
      <h3>{props.column.title}</h3>
      <Droppable droppableId={props.id}>
        {(provided) => {
          return (
            <div
              className="droppable-col"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {props.column.cards.map((card, index) => (
                <Card key={card._id} index={index} card={card} />
              ))}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
}

export default Column;
