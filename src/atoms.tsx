import { atom, selector } from "recoil";

export interface IToDo {
  id: number;
  text: string;
}

export interface IToDoBoard {
  id: number;
  text: string;
}

interface IToDoBoardState {
  [key: string]: IToDoBoard[];
}
interface IToDoState {
  [key: string]: IToDo[];
}
export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
  },
});

export const toDoBoard = atom<IToDoBoardState>({
  key: "toDoBoard",
  default: {},
});
