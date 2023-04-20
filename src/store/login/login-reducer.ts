import {Dispatch} from "redux";
import {APIauth} from "../../api/api-auth";
import {authProperties} from "../../types/types";
import {setLoadingStatusAC} from "../app/appActionsCreators";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-util";

export type loginStateType = {
  isLoggedIn: boolean
}

const initialState: loginStateType = {
  isLoggedIn: false
}

export const loginReducer = (state: loginStateType = initialState, action: any) => {
  switch (action.type) {
    case "LOGIN/SET-ISLOGGEDIN":
      debugger
      return {...state, isLoggedIn: action.isLoggedIn}
    default:
      return state
  }
}


export const setIsLoggedInAC = (isLoggedIn: boolean) => {
  return {
    type: "LOGIN/SET-ISLOGGEDIN",
    isLoggedIn
  } as const
}

export const loginTC = (data: authProperties) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setLoadingStatusAC(true))
      debugger
      const res = await APIauth.login(data)
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(true))
        dispatch(setLoadingStatusAC(false))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    } catch (e) {
      handleServerNetworkError(dispatch, e)
    }
  }
}

export const logOutTC = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setLoadingStatusAC(true))
      const res = await APIauth.logOut()
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(false))
        dispatch(setLoadingStatusAC(false))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    } catch (e) {
      handleServerNetworkError(dispatch, e)
    }
  }
}
