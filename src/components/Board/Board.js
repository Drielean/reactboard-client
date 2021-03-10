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
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    async function fetchBoard() {
      try {
        const response = await axios.get("http://localhost:4000/board/main");

        setState({ ...response.data });
      } catch (err) {
        console.error(err);
      }
    }
    fetchBoard();
  }, []);

  useEffect(() => {
    async function fetchBoard() {
      try {
        const response = await axios.get("http://localhost:4000/board/main");

        setState({ ...response.data });
      } catch (err) {
        console.error(err);
      }
    }
    fetchBoard();
  }, [toggle]);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleDragEnd = ({ destination, source }) => {
    // console.log("destination:", destination);
    // console.log("source:", source);
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

      //Organiza as colunas que sofreram alterações para enviar ao banco de dados
      const sourceColumCardsIDs = prev.columns[sourceColumnIndex].cards.map(
        (card) => card._id
      );
      const sourceColumn = {
        ...{ _id: prev.columns[sourceColumnIndex]._id },
        ...{ created: prev.columns[sourceColumnIndex].created },
        ...{ key: prev.columns[sourceColumnIndex].key },
        ...{ boardId: prev.columns[sourceColumnIndex].boardId },
        ...{ title: prev.columns[sourceColumnIndex].title },
        ...{ cards: sourceColumCardsIDs },
      };

      const destinationColumCardsIDs = prev.columns[
        destinationColumnIndex
      ].cards.map((card) => card._id);

      const destinationColumn = {
        ...{ _id: prev.columns[destinationColumnIndex]._id },
        ...{ created: prev.columns[destinationColumnIndex].created },
        ...{ key: prev.columns[destinationColumnIndex].key },
        ...{ boardId: prev.columns[destinationColumnIndex].boardId },
        ...{ title: prev.columns[destinationColumnIndex].title },
        ...{ cards: destinationColumCardsIDs },
      };

      //Atualiza o banco de dados antes de atualizar o state

      async function updateDB(sourceColumn, destinationColumn) {
        try {
          await axios.put(
            `http://localhost:4000/column/${sourceColumn._id}`,
            sourceColumn
          );
          await axios.put(
            `http://localhost:4000/column/${destinationColumn._id}`,
            destinationColumn
          );
        } catch (err) {
          console.error(err);
        }
      }
      updateDB(sourceColumn, destinationColumn);

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
        {state.columns.map((column, index) => {
          return (
            <Column
              key={column.key}
              id={column.key}
              column={column}
              index={index}
              toggle={toggle}
              handleToggle={handleToggle}
            />
          );
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
