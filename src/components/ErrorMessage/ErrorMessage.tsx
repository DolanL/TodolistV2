import React from 'react';
import {Alert, Snackbar} from "@mui/material";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../store/store";
import {appStateType} from "../../store/app/app-reducer";
import {setErrorStatusAC} from "../../store/app/appActionsCreators";



export const ErrorMessage = () => {
  const error = useSelector<AppRootStateType, null | string>(state => state.app.error)
  const dispatch = useAppDispatch()

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      dispatch(setErrorStatusAC(null))
    }

    dispatch(setErrorStatusAC(null))
  };


  return (
    {error} &&
    <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
      <Alert severity="error" sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  );
};
