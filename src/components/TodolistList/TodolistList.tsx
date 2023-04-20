import React, {useCallback, useEffect} from 'react';
import {Container, Grid, Paper} from "@mui/material";
import AddItemForm from "../AddItemForm/AddItemForm";
import Todolist from "../Todolist/Todolist";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../store/store";
import {TodolistDomainType} from "../../store/todolists/todolists-reducer";
import {
  addTodolistTC,
  removeTodolistTC,
  setTodolistsTC,
  updateTodolistTitleTC
} from "../../store/todolists/todolistsThunkCreators";
import {addTaskTC, removeTaskTC, updateTaskTC} from "../../store/tasks/tasksThunkCreators";
import {changeTodolistFilterAC} from "../../store/todolists/todolistActionCreators";
import {TaskStatuses, TaskType} from "../../api/api-todolists";


export type TasksStateType = {
  [key: string]: Array<TaskType>
}

export type FilterType = 'all' | 'active' | 'completed'

const TodolistList = () => {
  const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
  const todolists = useSelector<AppRootStateType, TodolistDomainType>(state => state.todolists)
  const dispatch = useAppDispatch()


  useEffect(() => {
    dispatch(setTodolistsTC())
  }, [dispatch])


  const updateTodolistTitle = useCallback((todolistID: string, newTitle: string) => {
    dispatch(updateTodolistTitleTC(todolistID, newTitle))
  }, [dispatch])

  const updateTaskTitle = useCallback((taskId: string, todolistId: string, title: string) => {
    dispatch(updateTaskTC(taskId, todolistId, {title}))
  }, [dispatch])

  const removeTodolist = useCallback((todolistID: string) => {
    dispatch(removeTodolistTC(todolistID))
  }, [dispatch])

  const removeTask = useCallback((taskId: string, todolistID: string) => {
    dispatch(removeTaskTC(taskId, todolistID))
  }, [dispatch])

  const changeFilter = useCallback((filter: FilterType, todolistID: string) => {
    dispatch(changeTodolistFilterAC(todolistID, filter))
  }, [dispatch])

  const addTask = useCallback((newTitle: string, todolistID: string) => {
    dispatch(addTaskTC(newTitle, todolistID))
  }, [dispatch])

  const changeTaskStatus = useCallback((status: TaskStatuses, taskId: string, todolistID: string) => {
    dispatch(updateTaskTC(taskId, todolistID, {status}))
  }, [dispatch])

  const addTodolist = useCallback((title: string) => {
    dispatch(addTodolistTC(title))
  }, [dispatch])


  return (
    <Container fixed>
      <Grid container style={{padding: '20px'}}>
        <AddItemForm addItem={addTodolist}/>
      </Grid>
      <Grid container spacing={5}>
        {
          todolists.map(todolist => {

            let tasksForTodolist = tasks[todolist.id]

            return <Grid key={todolist.id} item>
              <Paper style={{padding: '10px'}}>
                <Todolist title={todolist.title}
                          tasks={tasksForTodolist}
                          removeTask={removeTask}
                          changeFilter={changeFilter}
                          addTask={addTask}
                          changeTaskStatus={changeTaskStatus}
                          filter={todolist.filter}
                          todolistID={todolist.id}
                          removeTodolist={removeTodolist}
                          updateTaskTitle={updateTaskTitle}
                          updateTodolistTitle={updateTodolistTitle}
                />
              </Paper>
            </Grid>
          })}
      </Grid>
    </Container>
  );
};

export default TodolistList;