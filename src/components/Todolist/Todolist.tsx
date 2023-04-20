import React, {useCallback, useEffect} from 'react';
import AddItemForm from "../AddItemForm/AddItemForm";
import EditableSpan from "../EditableSpan/EditableSpan";
import Button from "@mui/material/Button";
import {ButtonGroup, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {TaskStatuses, TaskType} from "../../api/api-todolists";
import Task from "../Task/Task";
import {useAppDispatch} from "../../store/store";
import {setTasksTC} from "../../store/tasks/tasksThunkCreators";


type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string, todolistID: string) => void
  changeFilter: (filter: 'all' | 'active' | 'completed', todolistID: string) => void
  addTask: (newTitle: string, todolistID: string) => void
  changeTaskStatus: (status: TaskStatuses, taskId: string, todolistID: string) => void
  filter: 'all' | 'active' | 'completed'
  todolistID: string
  removeTodolist: (todolistID: string) => void
  updateTaskTitle: (taskId: string, todolistId: string, title: string) => void
  updateTodolistTitle: (todolistID: string, title: string) => void;
}

const Todolist = React.memo((props: PropsType) => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setTasksTC(props.todolistID))
  }, [props.todolistID, dispatch])

  const onAllClickHandler = useCallback(() => {
    props.changeFilter('all', props.todolistID)
  }, [props.changeFilter, props.todolistID])

  const onActiveClickHandler = useCallback(() => {
    props.changeFilter('active', props.todolistID)
  }, [props.changeFilter, props.todolistID])

  const onCompletedClickHandler = useCallback(() => {
    props.changeFilter('completed', props.todolistID)
  }, [props.changeFilter, props.todolistID])

  const removeTodolistHandler = useCallback(() => {
    props.removeTodolist(props.todolistID)
  }, [ props.removeTodolist, props.todolistID])

  const addTaskHandler = useCallback((title: string) => {
    props.addTask(title, props.todolistID)
  },[props.addTask, props.todolistID])

  const updateTodolistTitleHandler = useCallback((newTitle: string) => {
    props.updateTodolistTitle(props.todolistID, newTitle)
  },[props.todolistID, props.updateTodolistTitle])

  let tasksForTodolist = props.tasks

  if (props.filter === 'active') {
    tasksForTodolist = props.tasks.filter(task => task.status === TaskStatuses.New)
  }
  if (props.filter === 'completed') {
    tasksForTodolist = props.tasks.filter(task => task.status === TaskStatuses.Completed)
  }


  return (
    <div>
      <h3>
        <EditableSpan title={props.title} onChange={updateTodolistTitleHandler}/>
        <IconButton onClick={removeTodolistHandler}>
          <DeleteIcon/>
        </IconButton>
      </h3>
      <AddItemForm addItem={addTaskHandler}/>
      {tasksForTodolist.map((task) => {
        return <Task task={task}
                     todolistID={props.todolistID}
                     removeTask={props.removeTask}
                     updateTaskTitle={props.updateTaskTitle}
                     changeTaskStatus={props.changeTaskStatus}
                     key={task.id}
        />
      })}
      <div>
        <ButtonGroup style={{paddingTop: '10px'}} variant="outlined" aria-label="outlined button group">
          <Button style={{
            backgroundColor: props.filter === 'all' ? 'rgb(21, 101, 192)' : '',
            color: props.filter === 'all' ? 'white' : ''
          }} onClick={onAllClickHandler}>All</Button>
          <Button style={{
            backgroundColor: props.filter === 'active' ? 'rgb(21, 101, 192)' : '',
            color: props.filter === 'active' ? 'white' : ''
          }} onClick={onActiveClickHandler}>Active</Button>
          <Button style={{
            backgroundColor: props.filter === 'completed' ? 'rgb(21, 101, 192)' : '',
            color: props.filter === 'completed' ? 'white' : ''
          }} onClick={onCompletedClickHandler}>Completed</Button>
        </ButtonGroup>
      </div>
    </div>
  );
});

export default Todolist;