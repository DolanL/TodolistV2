import {AnyAction, applyMiddleware, combineReducers, compose, createStore, legacy_createStore} from "redux";
import {todolistsReducer} from "./todolists/todolists-reducer";
import {tasksReducer} from "./tasks/tasks-reducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import {appReducer} from "./app/app-reducer";
import {loginReducer} from "./login/login-reducer";


const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  login: loginReducer
})



export type AppRootStateType = ReturnType<typeof rootReducer>

// Для работы Devtools расширения
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


export const store = legacy_createStore(rootReducer, composeEnhancers(applyMiddleware(), applyMiddleware(thunk)))

type ThunkAppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<ThunkAppDispatchType>()
