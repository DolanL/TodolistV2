import {APIauth} from "../../api/api-auth";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-util";
import {Dispatch} from "redux";
import {setIsLoggedInAC} from "../login/login-reducer";
import {setIsInitializedAC} from "./app-reducer";

export const meTC = () => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await APIauth.me()
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC({isLoggedIn: true}))
      } else {
        handleServerAppError(res.data, dispatch)}
      dispatch(setIsInitializedAC({isInitialized: true}))
    } catch (e) {
      handleServerNetworkError(dispatch, e)
    }
  }
}