import {UpdateTaskModelType, UpdateTaskRequestType} from "../../types/types";
import {Dispatch} from "redux";
import {AppRootStateType} from "../store";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-util";
import { APItodolists } from "../../api/api-todolists";
import {setErrorStatusAC, setLoadingStatusAC} from "../app/app-reducer";
import {addTaskAC, removeTaskAC, setTasksAC, updateTaskAC} from "./tasks-reducer";

export const setTasksTC = (todolistID: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setLoadingStatusAC({isLoading: true}))
      const res = await APItodolists.getTasks((todolistID))
      dispatch(setTasksAC({tasks: res.data.items, todolistID: todolistID}))
      dispatch(setLoadingStatusAC({isLoading: false}))
    }
    catch (e) {
      console.log(e)
      dispatch(setLoadingStatusAC({isLoading: false}))
      dispatch(setErrorStatusAC({error: ''}))
    }
  }
}
export const addTaskTC = (title: string, todolistID: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setLoadingStatusAC({isLoading: true}))
      const response = await APItodolists.postTask({title}, todolistID)
      if (response.data.resultCode === 0) {
        dispatch(addTaskAC({task: response.data.data.item}))
        dispatch(setLoadingStatusAC({isLoading: false}))
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
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setLoadingStatusAC({isLoading: true}))
      const response = await APItodolists.deleteTask(taskId, todolistId)
      if (response.data.resultCode === 0) {
        dispatch(removeTaskAC({todolistID: todolistId, taskID: taskId}))
        dispatch(setLoadingStatusAC({isLoading: false}))
      }
    } catch (e) {
      handleServerNetworkError(dispatch, e)
    }
  }
}
export const updateTaskTC = (taskId: string, todolistId: string, updateTaskModel: UpdateTaskModelType) => {
  return async (dispatch: Dispatch, getState: () => AppRootStateType) => {
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
        dispatch(setLoadingStatusAC({isLoading: true}))
        const response = await APItodolists.updateTask(apiModel, todolistId, taskId)
        if (response.data.resultCode === 0) {
          dispatch(updateTaskAC({todolistID: todolistId, taskID: taskId, updateTaskModel}))
          dispatch(setLoadingStatusAC({isLoading: false}))
        } else {
          handleServerAppError(response.data, dispatch)
        }
      } catch (e) {
        handleServerNetworkError(dispatch, e)
      }
    }
  }
}


