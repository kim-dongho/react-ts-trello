import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useRecoilState } from "recoil";
import { toDoState } from "../atoms";

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  padding: 10px 10px;
  background-color: ${(props) =>
    props.isDragging ? "#74b9ff" : props.theme.cardColor};
  margin-bottom: 5px;
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 25px rgba(0,0,0,0.05)" : "none"};
  display: flex;
  justify-content: space-between;
`;

interface IDragabbleCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

const DragabbleCard = ({ toDoId, index, toDoText }: IDragabbleCardProps) => {
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DragabbleCard);
