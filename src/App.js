import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./styles.css";

function ReorderableItems() {
  const data = [
    {
      id: 1,
      order: 5,
      text: "JavaScript"
    },
    {
      id: 2,
      order: 3,
      text: "Python"
    },
    {
      id: 3,
      order: 6,
      text: "Typescript"
    }
  ];

  const listAscending = [...data].sort((a, b) => a.order - b.order);

  const [list, setList] = useState(listAscending);

  function reorderNumbers(result) {
    const startIndex = result?.source?.index;
    const endIndex = result?.destination?.index;

    setList((lists) => {
      const nums = [...lists];
      const [removed] = nums?.splice(startIndex, 1);
      nums.splice(endIndex, 0, removed);
      return nums;
    });
  }

  console.log({ list });

  return (
    <DragDropContext onDragEnd={reorderNumbers}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {list.map((num, i) => {
              return (
                <Draggable
                  key={num.id}
                  draggableId={num.id.toString()}
                  index={i}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      variant={snapshot.isDragging ? "elevation" : "outlined"}
                      elevation={4}
                    >
                      {num.text}
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default function App() {
  return (
    <div className="App">
      <ReorderableItems />
    </div>
  );
}
