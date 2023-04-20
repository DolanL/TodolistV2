import {useForm, SubmitHandler} from "react-hook-form";
import style from "./Login.module.css"

import {Grid, Input, Paper, Select} from "@mui/material";
import {authProperties} from "../../types/types";
import {AppRootStateType, useAppDispatch} from "../../store/store";
import {loginTC} from "../../store/login/login-reducer";
import {useSelector} from "react-redux";
import { Navigate } from 'react-router-dom';


export const Login = () => {

  const dispatch = useAppDispatch()
  const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.login.isLoggedIn)

  const {
    register, formState: {
      errors,
    }, handleSubmit
  } = useForm<authProperties>({
    mode: "onBlur"
  });
  const onSubmit: SubmitHandler<authProperties> = (data: authProperties) => {
    dispatch(loginTC(data))
  };

  if (isLoggedIn) {
    return <Navigate to={'/'}/>
  }

  return (
    <Grid>
      <Paper style={{padding: '10px', maxWidth: '500px', margin: "20px auto"}}>
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <label>
            First Name:
            <input className={style.input} {...register("email", {
              required: "Поле обязательно к заполнению!",
              minLength: {
                value: 5,
                message: "Должно быть минимум 5 символов!"
              }
            })}/>
          </label>
          <div>{errors?.email && <p>{errors?.email?.message || "Error!"}</p>}</div>
          <label>
            Password:
            <input className={style.input} type={"password"} {...register("password", {
              required: "Поле обязательно к заполнению!",
              minLength: {
                value: 5,
                message: "Должно быть минимум 5 символов!",
              }
            })}/>
          </label>
          <div>{errors?.password && <p>{errors?.password?.message || "Error!"}</p>}</div>
          <input type="checkbox" {...register("rememberMe")}/> <span>Remember me</span>
          <button type="submit">login</button>
        </form>
      </Paper>
    </Grid>
  );
};