import {Dispatch} from "redux";
import {addTodolistAC, removeTodolistAC, setTodolistsAC, updateTodolistTitleAC} from "./todolistActionCreators";
import {APItodolists} from "../../api/api-todolists";
import {ActionTodolistType} from "./todolists-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-util";
import {setLoadingStatusAC} from "../app/app-reducer";

export const setTodolistsTC = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setLoadingStatusAC({isLoading: true}))
      const res = await APItodolists.getTodolists()
      dispatch(setTodolistsAC(res.data))
      dispatch(setLoadingStatusAC({isLoading: false}))
    }
    catch (e) {
      console.log(e)
      handleServerNetworkError(dispatch, e)
    }
  }
}
export const addTodolistTC = (title: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setLoadingStatusAC({isLoading: true}))
      const res = await APItodolists.postTodolist({title})
      if (res.data.resultCode === 0) {
        dispatch(addTodolistAC(res.data.data.item))
        dispatch(setLoadingStatusAC({isLoading: false}))
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
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setLoadingStatusAC({isLoading: true}))
      const res = await APItodolists.deleteTodolist(todolistID)
      if (res.data.resultCode === 0) {
        dispatch(removeTodolistAC(todolistID))
        dispatch(setLoadingStatusAC({isLoading: false}))
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
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setLoadingStatusAC({isLoading: true}))
      await APItodolists.updateTodolist(todolistID, {title})
      dispatch(updateTodolistTitleAC(todolistID, title))
      dispatch(setLoadingStatusAC({isLoading: false}))
    }
    catch (e) {
      handleServerNetworkError(dispatch, e)
    }
  }
}

