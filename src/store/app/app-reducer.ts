import {SetErrorStatusACType, SetIsInitializedACType, SetLoadingStatusACType} from "./appActionsCreators";

const initialState = {
  isLoading: false,
  error: null,
  isInitialized: false
}

export type appStateType = {
  isLoading: boolean,
  error: null | string,
  isInitialized: boolean;
}

export const appReducer = (state: appStateType = initialState, action: AppActionsType): appStateType => {
  switch (action.type) {
    case "APP/SET-LOADING-STATUS":
      return {...state, isLoading: action.loading}
    case "APP/SET-ERROR-STATUS":
      return {...state, error: action.error}
    case "APP/SET-IS-INITIALIZED":
      return {...state, isInitialized: action.isInitialized}
    default:
      return state
  }
}

export type AppActionsType = SetLoadingStatusACType | SetErrorStatusACType | SetIsInitializedACType
