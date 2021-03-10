import { Droppable } from "react-beautiful-dnd";
import Card from "../Card/Card";
import CreateCard from "../CardAction/CreateCard";

import "./Column.css";

function Column(props) {
  return (
    <div className="column-place">
      <div className="column-header">
        <h3>{props.column.title}</h3>
        {props.index === 0 && <button onClick={props.handleToggle}>+</button>}
      </div>

      {!props.toggle && props.index >= 0 && (
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
      )}

      {props.toggle && props.index === 0 && (
        <CreateCard
          columnId={props.column._id}
          handleToggle={props.handleToggle}
        />
      )}

      {props.toggle && props.index > 0 && (
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
      )}
    </div>
  );
}

export default Column;
