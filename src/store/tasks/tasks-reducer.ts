import {TasksStateType} from "../../components/TodolistList/TodolistList";
import {TaskType, UpdateTaskModelType} from "../../types/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "../todolists/todolists-reducer";


const initialState: TasksStateType = {}

const slice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {
    updateTaskAC(state, action: PayloadAction<{ todolistID: string, taskID: string, updateTaskModel: UpdateTaskModelType }>) {
      state[action.payload.todolistID] = state[action.payload.todolistID].map(task => task.id === action.payload.taskID ? {...task, ...action.payload.updateTaskModel} : task)
    },
    removeTaskAC(state, action: PayloadAction<{ taskID: string, todolistID: string }>) {
      state[action.payload.todolistID] = state[action.payload.todolistID].filter(task => task.id !== action.payload.taskID)
    },
    addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
      state[action.payload.task.todoListId].push(action.payload.task)
    },
    setTasksAC(state, action: PayloadAction<{ tasks: Array<TaskType>, todolistID: string }>) {
      state[action.payload.todolistID] = action.payload.tasks
    }
  },
  extraReducers(builder) {
    builder.addCase(addTodolistAC, (state, action) => {
      state[action.payload.todolist.id] = []
    });
    builder.addCase(removeTodolistAC, (state, action) => {
      delete state[action.payload.todolistID]
    });
    builder.addCase(setTodolistsAC, (state, action) => {
      action.payload.todolists.forEach(tl => {
        state[tl.id] = []
      })
    })
  }
})

export const tasksReducer = slice.reducer
export const {updateTaskAC, removeTaskAC, addTaskAC, setTasksAC} = slice.actions
