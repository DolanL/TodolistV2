import React from 'react';
import {Alert, Snackbar} from "@mui/material";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../store/store";
import {setErrorStatusAC} from "../../store/app/app-reducer";




export const ErrorMessage = () => {
  const error = useSelector<AppRootStateType, null | string>(state => state.app.error)
  const dispatch = useAppDispatch()

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      dispatch(setErrorStatusAC({error: ''}))
    }

    dispatch(setErrorStatusAC({error: ''}))
  };


  return (
    {error} &&
    <Snackbar open={error !== ''} autoHideDuration={6000} onClose={handleClose}>
      <Alert severity="error" sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  );
};
