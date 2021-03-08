import { v4 } from "uuid";

function getData() {
  const card1 = {
    _id: v4(),
    name: "Clean the house",
  };

  const card2 = {
    _id: v4(),
    name: "Wash the car",
  };

  const card3 = {
    _id: v4(),
    name: "Wash the car",
  };

  const data = {
    title: "Main",
    columns: [
      {
        key: "todo",
        title: "To do",
        cards: [card1, card2],
      },
      {
        key: "doing",
        title: "Doing",
        cards: [card3],
      },
      {
        key: "done",
        title: "Done",
        cards: [],
      },
    ],
  };

  // const data = {
  //   todo: {
  //     name: "To do",
  //     cards: [card1, card2],
  //   },
  //   doing: {
  //     name: "Doing",
  //     cards: [card3],
  //   },
  //   done: {
  //     name: "Done",
  //     cards: [],
  //   },
  // };

  return data;
}

export default getData;
