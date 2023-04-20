import {Dispatch} from "redux";
import {
  addTodolistAC,
  removeTodolistAC,
  setTodolistsAC,
  updateTodolistTitleAC
} from "./todolistActionCreators";
import {APItodolists} from "../../api/api-todolists";
import {ActionTodolistType} from "./todolists-reducer";
import {AppActionsType} from "../app/app-reducer";
import {setErrorStatusAC, setLoadingStatusAC} from "../app/appActionsCreators";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-util";
import {AxiosError} from "axios";

export const setTodolistsTC = () => {
  return async (dispatch: Dispatch<ActionTodolistType | AppActionsType>) => {
    try {
      dispatch(setLoadingStatusAC(true))
      const res = await APItodolists.getTodolists()
      dispatch(setTodolistsAC(res.data))
      dispatch(setLoadingStatusAC(false))
    }
    catch (e) {
      console.log(e)
      handleServerNetworkError(dispatch, e)
    }
  }
}
export const addTodolistTC = (title: string) => {
  return async (dispatch: Dispatch<ActionTodolistType | AppActionsType>) => {
    try {
      dispatch(setLoadingStatusAC(true))
      const res = await APItodolists.postTodolist({title})
      if (res.data.resultCode === 0) {
        dispatch(addTodolistAC(res.data.data.item))
        dispatch(setLoadingStatusAC(false))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    }
    catch (e) {
      handleServerNetworkError(dispatch, e)
    }
  }
}
export const removeTodolistTC = (todolistID: string) => {
  return async (dispatch: Dispatch<ActionTodolistType | AppActionsType>) => {
    try {
      dispatch(setLoadingStatusAC(true))
      const res = await APItodolists.deleteTodolist(todolistID)
      if (res.data.resultCode === 0) {
        dispatch(removeTodolistAC(todolistID))
        dispatch(setLoadingStatusAC(false))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    }
    catch (e) {
      handleServerNetworkError(dispatch, e)
    }
  }
}
export const updateTodolistTitleTC = (todolistID: string, title: string) => {
  return async (dispatch: Dispatch<ActionTodolistType | AppActionsType>) => {
    try {
      dispatch(setLoadingStatusAC(true))
      await APItodolists.updateTodolist(todolistID, {title})
      dispatch(updateTodolistTitleAC(todolistID, title))
      dispatch(setLoadingStatusAC(false))
    }
    catch (e) {
      handleServerNetworkError(dispatch, e)
    }
  }
}

