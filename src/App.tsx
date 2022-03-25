import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";
import Timer from "./Components/Timer";

const ToDoWrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  height: 60vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Borads = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
  min-height: 200px;
`;

const Trashcan = styled.div<{ isDraggingOver: boolean }>`
  background-color: ${(props) => (props.isDraggingOver ? "red" : "white")};
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  text-align: center;
  padding: 10px;
  svg {
    width: 50px;
    height: 50px;
  }
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info;
    if (!destination) return;

    if (source.droppableId === destination?.droppableId) {
      // Same Board Movement
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }

    if (destination.droppableId !== source.droppableId) {
      // Delete Todo
      if (destination.droppableId === "Trash") {
        setToDos((allBoard) => {
          const sourceBoard = [...allBoard[source.droppableId]];
          sourceBoard.splice(source.index, 1);

          return {
            ...allBoard,
            [source.droppableId]: sourceBoard,
          };
        });
      }
      // Cross Board Movement
      else {
        setToDos((allBoard) => {
          const sourceBoard = [...allBoard[source.droppableId]];
          const destinationBoard = [...allBoard[destination.droppableId]];
          const taskObj = sourceBoard[source.index];
          sourceBoard.splice(source.index, 1);
          destinationBoard.splice(destination?.index, 0, taskObj);
          return {
            ...allBoard,
            [source.droppableId]: sourceBoard,
            [destination.droppableId]: destinationBoard,
          };
        });
      }
    }
  };
  return (
    <>
      <Timer />
      <DragDropContext onDragEnd={onDragEnd}>
        <ToDoWrapper>
          <Borads>
            {Object.keys(toDos).map((boardId) => (
              <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
            ))}
          </Borads>
          <Droppable droppableId="Trash">
            {(magic, info) => (
              <Trashcan
                isDraggingOver={info.isDraggingOver}
                ref={magic.innerRef}
                {...magic.droppableProps}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </Trashcan>
            )}
          </Droppable>
        </ToDoWrapper>
      </DragDropContext>
    </>
  );
}

export default App;
