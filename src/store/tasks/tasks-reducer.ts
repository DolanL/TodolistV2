import {TasksStateType} from "../../components/TodolistList/TodolistList";
import {
  AddTaskACType,
  RemoveTaskACType, SetTasksACType,
  UpdateTaskACType
} from "./tasksActionCreators";
import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistACType, SetTodolistsACType} from "../todolists/todolistActionCreators";
import {TaskPriorities, TaskStatuses} from "../../api/api-todolists";


export type ActionTasksType =
  UpdateTaskACType
  | RemoveTaskACType
  | AddTaskACType
  | AddTodolistACType
  | RemoveTodolistACType
  | SetTodolistsACType
  | SetTasksACType

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionTasksType): TasksStateType => {
  switch (action.type) {
    case 'UPDATE-TASK':
      return {...state,
        [action.todolistID]: state[action.todolistID].map(task => task.id === action.taskID ? {...task, ...action.updateTaskModel} : task)}
    case 'REMOVE-TASK':
      return {...state, [action.todolistID]: state[action.todolistID].filter(task => task.id !== action.taskID)}
    case "ADD-TASK":
      return {
        ...state, [action.task.todoListId]: [...state[action.task.todoListId], {...action.task}
        ]
      }
    case "ADD-TODOLIST":
      return {...state, [action.todolist.id]: []}
    case "REMOVE-TODOLIST":
      const newState = {...state}
      delete newState[action.todolistID]
      return newState
    case "SET-TODOLISTS":
      const stateCopy = {...state}
      action.todolists.forEach(tl => {
        stateCopy[tl.id] = []
      })
      return stateCopy
    case "SET-TASKS":
      const tasksCopy = {...state}
      tasksCopy[action.todolistID] = action.tasks
      return tasksCopy
    default:
      return state
  }
}

