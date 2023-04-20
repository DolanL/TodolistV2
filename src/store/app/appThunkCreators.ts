import {APIauth} from "../../api/api-auth";
import {setIsInitializedAC} from "./appActionsCreators";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-util";
import {Dispatch} from "redux";
import {setIsLoggedInAC} from "../login/login-reducer";

export const meTC = () => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await APIauth.me()
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(true))
      } else {
        handleServerAppError(res.data, dispatch)}
      dispatch(setIsInitializedAC(true))
    } catch (e) {
      handleServerNetworkError(dispatch, e)
    }
  }
}