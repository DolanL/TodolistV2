import {UpdateTaskModelType, UpdateTaskRequestType} from "../../types/types";
import {Dispatch} from "redux";
import {addTaskAC, removeTaskAC, setTasksAC, updateTaskAC} from "./tasksActionCreators";
import {ActionTasksType} from "./tasks-reducer";
import {AppRootStateType} from "../store";
import {setErrorStatusAC, setLoadingStatusAC} from "../app/appActionsCreators";
import {AppActionsType} from "../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-util";
import { APItodolists } from "../../api/api-todolists";

export const setTasksTC = (todolistID: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setLoadingStatusAC(true))
      const res = await APItodolists.getTasks((todolistID))
      dispatch(setTasksAC(res.data.items, todolistID))
      dispatch(setLoadingStatusAC(false))
    }
    catch (e) {
      console.log(e)
      dispatch(setLoadingStatusAC(false))
      dispatch(setErrorStatusAC(''))
    }
  }
}
export const addTaskTC = (title: string, todolistID: string) => {
  return async (dispatch: Dispatch<ActionTasksType | AppActionsType>) => {
    try {
      dispatch(setLoadingStatusAC(true))
      const response = await APItodolists.postTask({title}, todolistID)
      if (response.data.resultCode === 0) {
        dispatch(addTaskAC(response.data.data.item))
        dispatch(setLoadingStatusAC(false))
      } else {
        handleServerAppError(response.data, dispatch)
      }
    }
    catch (e) {
      handleServerNetworkError(dispatch, e)
    }
  }
}
export const removeTaskTC = (taskId: string, todolistId: string) => {
  return async (dispatch: Dispatch<ActionTasksType | AppActionsType>) => {
    try {
      dispatch(setLoadingStatusAC(true))
      const response = await APItodolists.deleteTask(taskId, todolistId)
      if (response.data.resultCode === 0) {
        dispatch(removeTaskAC(todolistId, taskId))
        dispatch(setLoadingStatusAC(false))
      }
    } catch (e) {
      handleServerNetworkError(dispatch, e)
    }
  }
}
export const updateTaskTC = (taskId: string, todolistId: string, updateTaskModel: UpdateTaskModelType) => {
  return async (dispatch: Dispatch<ActionTasksType | AppActionsType>, getState: () => AppRootStateType) => {
    const tasks = getState().tasks
    const task = tasks[todolistId].find(task => task.id === taskId)
    if (!task) {
      console.log("no task")
    } else {
      const apiModel: UpdateTaskRequestType = {
        title: task.title,
        completed: task.completed,
        status: task.status,
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        ...updateTaskModel
      }
      try {
        dispatch(setLoadingStatusAC(true))
        const response = await APItodolists.updateTask(apiModel, todolistId, taskId)
        if (response.data.resultCode === 0) {
          dispatch(updateTaskAC(todolistId, taskId, updateTaskModel))
          dispatch(setLoadingStatusAC(false))
        } else {
          handleServerAppError(response.data, dispatch)
        }
      } catch (e) {
        handleServerNetworkError(dispatch, e)
      }
    }
  }
}


