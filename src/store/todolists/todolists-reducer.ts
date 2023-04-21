import {FilterType} from "../../components/TodolistList/TodolistList";
import {TodolistType} from "../../types/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: TodolistDomainType = []

export type TodolistDomainType = Array<TodolistType & { filter: FilterType }>


export const slice = createSlice({
  name: "todolists",
  initialState: initialState,
  reducers: {
    updateTodolistTitleAC (state, action: PayloadAction<{todolistID: string, newTitle: string}>) {
      return state.map(tl => tl.id === action.payload.todolistID ? {...tl, title: action.payload.newTitle} : tl)
    },
    removeTodolistAC (state, action: PayloadAction<{todolistID: string}>) {
      return state.filter(tl => tl.id !== action.payload.todolistID)
    },
    changeTodolistFilterAC (state, action: PayloadAction<{todolistID: string, filter: FilterType}>) {
      return state.map(tl => tl.id === action.payload.todolistID ? {...tl, filter: action.payload.filter}: tl)
    },
    addTodolistAC (state, action: PayloadAction<{todolist: TodolistType}>) {
      state.push({...action.payload.todolist, filter: 'all'})
    },
    setTodolistsAC (state, action: PayloadAction<{todolists: Array<TodolistType>}>) {
      return action.payload.todolists.map(tl => {
        return {...tl, filter: 'all'}
      })
    }
  }
})

export const todolistsReducer = slice.reducer
export const {updateTodolistTitleAC, removeTodolistAC, changeTodolistFilterAC, addTodolistAC, setTodolistsAC} = slice.actions




