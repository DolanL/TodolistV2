import {AnyAction, applyMiddleware, combineReducers, compose, createStore, legacy_createStore} from "redux";
import {todolistsReducer} from "./todolists/todolists-reducer";
import {tasksReducer} from "./tasks/tasks-reducer";
import thunkMiddleWare, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import {appReducer} from "./app/app-reducer";
import {loginReducer} from "./login/login-reducer";
import {configureStore} from "@reduxjs/toolkit";


const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  login: loginReducer
})



export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleWare)
})


type ThunkAppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<ThunkAppDispatchType>()
