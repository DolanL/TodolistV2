import {
  setErrorStatusAC,
  SetErrorStatusACType,
  setLoadingStatusAC,
  SetLoadingStatusACType
} from "../store/app/appActionsCreators";
import {Dispatch} from "redux";
import {ResponseType} from "../api/api-todolists";

export const handleServerNetworkError = (dispatch: Dispatch<ErrorUtilsDispatchType>, e: any) => {
  dispatch(setLoadingStatusAC(false))
  dispatch(setErrorStatusAC(e.message ? e.message : "some Error"))
}


type ErrorUtilsDispatchType = SetLoadingStatusACType | SetErrorStatusACType


export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<ErrorUtilsDispatchType>) => {
  if (data.messages.length) {
    dispatch(setErrorStatusAC(data.messages[0]))
  } else {
    dispatch(setErrorStatusAC("some error"))
  }
  dispatch(setLoadingStatusAC(false))
}