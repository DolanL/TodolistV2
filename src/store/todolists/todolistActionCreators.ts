import {FilterType} from "../../components/TodolistList/TodolistList";
import {TodolistType} from "../../api/api-todolists";

export type UpdateTodolistTitleACType = ReturnType<typeof updateTodolistTitleAC>
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>

export const updateTodolistTitleAC = (todolistID: string, newTitle: string) => {
  return {
    type: "UPDATE-TODOLIST-TITLE",
    todolistID, newTitle
  } as const
}

export const removeTodolistAC = (todolistID: string) => {
  return {
    type: "REMOVE-TODOLIST",
    todolistID
  } as const
}

export const changeTodolistFilterAC = (todolistID: string, filter: FilterType) => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    todolistID, filter
  } as const
}

export const addTodolistAC = (todolist: TodolistType) => {
  return {
    type: "ADD-TODOLIST",
    todolist
  } as const
}

export const setTodolistsAC = (todolists: Array<TodolistType>) => {
  return {
    type: "SET-TODOLISTS",
    todolists
  } as const
}