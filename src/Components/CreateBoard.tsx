import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { toDoBoard } from "../atoms";
const Wrapper = styled.div`
  width: 100%;
  background-color: #fff;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface IForm {
  boardName: string;
}

const Form = styled.form`
  width: 100%;
`;
const CreateBoard = () => {
  const setBoards = useSetRecoilState(toDoBoard);
  const onValid = ({ boardName }: IForm) => {
    const newBoard = {
      text: boardName,
    };
    /* setBoards((el) => {
      return {
        ...el,
        newBoard,
      };
    }); */
  };
  const { register, setValue, handleSubmit } = useForm<IForm>();
  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("boardName", { required: true })}
          type="text"
          placeholder={"Add Board"}
        />
      </Form>
    </Wrapper>
  );
};

export default CreateBoard;
