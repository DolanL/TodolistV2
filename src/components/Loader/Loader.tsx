import React from 'react';
import {AppRootStateType} from "../../store/store";
import {useSelector} from "react-redux";
import {LinearProgress} from "@mui/material";

const Loader = () => {
  const loading = useSelector<AppRootStateType>(state => state.app.isLoading)

  return (
    loading ? <LinearProgress /> : <></>
  );
};

export default Loader;