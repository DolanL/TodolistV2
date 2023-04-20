import {FilterType} from "../../components/TodolistList/TodolistList";
import {
  AddTodolistACType,
  ChangeTodolistFilterACType,
  RemoveTodolistACType, SetTodolistsACType,
  UpdateTodolistTitleACType
} from "./todolistActionCreators";
import {TodolistType} from "../../api/api-todolists";


export type ActionTodolistType = UpdateTodolistTitleACType | RemoveTodolistACType | ChangeTodolistFilterACType | AddTodolistACType | SetTodolistsACType

const initialState: TodolistDomainType = []

export type TodolistDomainType = Array<TodolistType & { filter: FilterType }>

export const todolistsReducer = (state: TodolistDomainType = initialState, action: ActionTodolistType): TodolistDomainType => {
  switch (action.type) {
    case 'UPDATE-TODOLIST-TITLE':
      return state.map(tl => tl.id === action.todolistID ? {...tl, title: action.newTitle} : tl)
    case "REMOVE-TODOLIST":
      return state.filter(tl => tl.id !== action.todolistID)
    case "CHANGE-TODOLIST-FILTER":
      return state.map(tl => tl.id === action.todolistID ? {...tl, filter: action.filter} : tl)
    case "ADD-TODOLIST":
      return [...state, {...action.todolist, filter: 'all'}]
    case "SET-TODOLISTS":
      return action.todolists.map(tl => {
        return {...tl, filter: 'all'}
      })
    default:
      return state
  }
}




