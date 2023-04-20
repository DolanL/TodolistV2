import {SetErrorStatusACType, SetLoadingStatusACType} from "./appActionsCreators";

const initialState = {
  isLoading: false,
  error: null
}

export type appStateType = {
  isLoading: boolean,
  error: null | string
}

export const appReducer = (state: appStateType = initialState, action: AppActionsType): appStateType => {
  switch (action.type) {
    case "APP/SET-LOADING-STATUS":
      return {...state, isLoading: action.loading}
    case "APP/SET-ERROR-STATUS":
      return {...state, error: action.error}
    default:
      return state
  }
}

export type AppActionsType = SetLoadingStatusACType | SetErrorStatusACType
