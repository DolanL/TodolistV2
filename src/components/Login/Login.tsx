import {useForm, SubmitHandler} from "react-hook-form";
import style from "./Login.module.css"

import {Grid, Input, Paper, Select} from "@mui/material";

interface IFormInputs {
  firstName: string
  password: string
}


export const Login = () => {
  const {
    register, formState: {
      errors,
    }, handleSubmit
  } = useForm<IFormInputs>({
    mode: "onBlur"
  });
  const onSubmit: SubmitHandler<IFormInputs> = (data: IFormInputs) => console.log(JSON.stringify(data));

  return (
    <Grid>
      <Paper style={{padding: '10px', maxWidth: '500px', margin: "20px auto"}}>
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <label>
            First Name:
            <input {...register("firstName", {
              required: "Поле обязательно к заполнению!",
              minLength: {
                value: 5,
                message: "Должно быть минимум 5 символов!"
              }
            })}/>
          </label>
          <div>{errors?.firstName && <p>{errors?.firstName?.message || "Error!"}</p>}</div>
          <label>
            Password:
            <input type={"password"} {...register("password", {
              required: "Поле обязательно к заполнению!",
              minLength: {
                value: 5,
                message: "Должно быть минимум 5 символов!",
              }
            })}/>
          </label>
          <div>{errors?.password && <p>{errors?.password?.message || "Error!"}</p>}</div>
          <button type="submit">submit</button>
        </form>
      </Paper>
    </Grid>
  );
};