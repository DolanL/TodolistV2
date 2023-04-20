import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: '',
  isInitialized: false
}

const slice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    setLoadingStatusAC (state, action: PayloadAction<{isLoading: boolean}>) {
      state.isLoading = action.payload.isLoading
    },
    setErrorStatusAC (state, action: PayloadAction<{error: string}>) {
      state.error = action.payload.error
    },
    setIsInitializedAC (state, action: PayloadAction<{isInitialized: boolean}>) {
      state.isInitialized = action.payload.isInitialized
    }
  }
})


export const appReducer = slice.reducer
export const {setLoadingStatusAC, setErrorStatusAC, setIsInitializedAC} = slice.actions

//   = (state: appStateType = initialState, action: AppActionsType): appStateType => {
//   switch (action.type) {
//     case "APP/SET-LOADING-STATUS":
//       return {...state, isLoading: action.loading}
//     case "APP/SET-ERROR-STATUS":
//       return {...state, error: action.error}
//     case "APP/SET-IS-INITIALIZED":
//       return {...state, isInitialized: action.isInitialized}
//     default:
//       return state
//   }
// }
//
// export type AppActionsType = SetLoadingStatusACType | SetErrorStatusACType | SetIsInitializedACType
