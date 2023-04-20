import {TaskType, UpdateTaskModelType} from "../../types/types";

export type UpdateTaskACType = ReturnType<typeof updateTaskAC>
export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type AddTaskACType = ReturnType<typeof addTaskAC>
export type SetTasksACType = ReturnType<typeof setTasksAC>

export const updateTaskAC = (todolistID: string, taskID: string, updateTaskModel: UpdateTaskModelType) => {
  return {
    type: "UPDATE-TASK",
    todolistID, taskID, updateTaskModel
  } as const
}
export const removeTaskAC = (todolistID: string, taskID: string) => {
  return {
    type: "REMOVE-TASK",
    todolistID, taskID
  } as const
}
export const addTaskAC = (task: TaskType) => {
  return {
    type: "ADD-TASK",
    task
  } as const
}
export const setTasksAC = (tasks: Array<TaskType>, todolistID: string) => {
  return {
    type: "SET-TASKS",
    tasks, todolistID
  } as const
}