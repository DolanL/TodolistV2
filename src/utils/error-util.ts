import {Dispatch} from "redux";
import {ResponseType} from "../types/types";
import {setErrorStatusAC, setLoadingStatusAC} from "../store/app/app-reducer";

export const handleServerNetworkError = (dispatch: Dispatch, e: any) => {
  dispatch(setLoadingStatusAC({isLoading: false}))
  dispatch(setErrorStatusAC(e.message ? e.message : "some Error"))
}

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(setErrorStatusAC({error: data.messages[0]}))
  } else {
    dispatch(setErrorStatusAC({error: 'some error'}))
  }
  dispatch(setLoadingStatusAC({isLoading: false}))
}