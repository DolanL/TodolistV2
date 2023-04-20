import React, {useEffect} from 'react';
import './App.css';
import {AppBar, CircularProgress, IconButton, Toolbar, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import MenuIcon from '@mui/icons-material/Menu';
import TodolistList from "../components/TodolistList/TodolistList";
import Loader from "../components/Loader/Loader";
import {ErrorMessage} from "../components/ErrorMessage/ErrorMessage";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import {Login} from "../components/Login/Login";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../store/store";
import {meTC} from "../store/app/appThunkCreators";
import {logOutTC} from "../store/login/login-reducer";


function App() {

  const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(meTC())
  }, [])

  if (!isInitialized) {
    console.log(isInitialized)
    return <CircularProgress style={{position: 'fixed', top: "40%", left: "50%"}} />
  }

  const onClickHandler = () => {
    dispatch(logOutTC())
  }

  return (
    <BrowserRouter>
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{mr: 2}}
            >
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
              News
            </Typography>
            {isLoggedIn && <Button onClick={onClickHandler} color="inherit">Logout</Button>}
          </Toolbar>
          <ErrorMessage/>
        </AppBar>
        <Loader/>
        <Routes>
          <Route path={'/'} element={<TodolistList/>}/>
          <Route path={'/login'} element={<Login/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
