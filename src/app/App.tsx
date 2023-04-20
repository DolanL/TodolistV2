import React from 'react';
import './App.css';
import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";
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


function App() {

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
            <Button color="inherit">Login</Button>
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
