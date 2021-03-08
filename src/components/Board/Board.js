import { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import axios from "axios";
// import _ from "lodash";
import "./Board.css";

import Column from "../Column/Column";

// import getData from "../../data";
// const data = getData();

function Board() {
  const [state, setState] = useState({ columns: [] });

  useEffect(() => {
    async function fetchBoard() {
      try {
        const response = await axios.get("http://localhost:4000/board/main");
        console.log(response.data);
        setState({ ...response.data });
      } catch (err) {
        console.error(err);
      }
    }
    fetchBoard();
  }, []);

  const handleDragEnd = ({ destination, source }) => {
    console.log("destination:", destination);
    console.log("source:", source);
    if (!destination) {
      return;
    }

    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }

    const sourceColumnIndex = state.columns.findIndex(
      (column) => column.key === source.droppableId
    );

    const destinationColumnIndex = state.columns.findIndex(
      (column) => column.key === destination.droppableId
    );

    // Creating a copy of card before removing it from state
    const cardCopy = {
      ...state.columns[sourceColumnIndex].cards[source.index],
    };
    // const cardCopy = { ...state[source.droppableId].cards[source.index] };

    setState((prev) => {
      prev = { ...prev };
      // Remove from previous cards array
      prev.columns[sourceColumnIndex].cards.splice(source.index, 1);

      // Adding to new cards array location
      prev.columns[destinationColumnIndex].cards.splice(
        destination.index,
        0,
        cardCopy
      );

      // setState((prev) => {
      //   prev = { ...prev };
      //   // Remove from previous cards array
      //   prev[source.droppableId].cards.splice(source.index, 1);

      //   // Adding to new cards array location
      //   prev[destination.droppableId].cards.splice(
      //     destination.index,
      //     0,
      //     cardCopy
      //   );

      return prev;
    });
  };

  return (
    <div className="board">
      <DragDropContext onDragEnd={handleDragEnd}>
        {state.columns.map((column) => {
          return <Column key={column.key} id={column.key} column={column} />;
        })}
      </DragDropContext>
    </div>
    //   <div className="board">
    //   <DragDropContext onDragEnd={handleDragEnd}>
    //     {_.map(state, (column, key) => {
    //       return <Column key={key} id={key} column={column} />;
    //     })}
    //   </DragDropContext>
    // </div>
  );
}

export default Board;
