import {Dispatch} from "redux";
import {APIauth} from "../../api/api-auth";
import {authProperties} from "../../types/types";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-util";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { setLoadingStatusAC } from "../app/app-reducer";

const initialState = {
  isLoggedIn: false
}

const slice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    setIsLoggedInAC (state, action: PayloadAction<{isLoggedIn: boolean}>) {
      state.isLoggedIn = action.payload.isLoggedIn
    }
  }
})


export const loginReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions


export const loginTC = (data: authProperties) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setLoadingStatusAC({isLoading: true}))
      debugger
      const res = await APIauth.login(data)
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC({isLoggedIn: true}))
        dispatch(setLoadingStatusAC({isLoading: true}))
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
      dispatch(setLoadingStatusAC({isLoading: true}))
      const res = await APIauth.logOut()
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC({isLoggedIn: false}))
        dispatch(setLoadingStatusAC({isLoading: false}))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    } catch (e) {
      handleServerNetworkError(dispatch, e)
    }
  }
}
