import React, {ChangeEvent} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {TaskStatuses, TaskType} from "../../types/types";
import EditableSpan from "../EditableSpan/EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";

type PropsType = {
  todolistID: string
  updateTaskTitle: (taskID: string, todolistID: string, title: string) => void
  changeTaskStatus: (newIsDoneValue: TaskStatuses, taskID: string, todolistID: string) => void
  removeTask: (taskID: string, todolistID: string) => void
  task: TaskType
}

const Task = (props: PropsType) => {

  const updateTaskTitleHandler = ((newTitle: string) => {
    props.updateTaskTitle(props.task.id, props.todolistID, newTitle)
  })

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue
    if (e.currentTarget.checked) {
      newIsDoneValue = TaskStatuses.Completed
    } else {
      newIsDoneValue = TaskStatuses.New
    }
    props.changeTaskStatus(newIsDoneValue, props.task.id, props.todolistID)
  }

  const removeTaskHandler = () => {
    props.removeTask(props.task.id, props.todolistID)
  }

  return (
    <div>
      <Checkbox onChange={onChangeHandler} checked={props.task.status === TaskStatuses.Completed}/>
      <EditableSpan onChange={updateTaskTitleHandler} title={props.task.title}/>
      <IconButton onClick={removeTaskHandler}>
        <DeleteIcon/>
      </IconButton>
    </div>
  );
};

export default Task;