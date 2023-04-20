import {AxiosResponse} from "axios";
import {instance} from "./instance";
import {GetTasksResponseType, PostProperties, TaskType, TodolistType, UpdateTaskRequestType, ResponseType} from "../types/types";

export const APItodolists = {
  getTodolists: () => {
    return instance.get<TodolistType[]>('/todo-lists')
  },
  postTodolist: (data: PostProperties) => {
    return instance.post<'', AxiosResponse<ResponseType<{ item: TodolistType }>>, PostProperties>('/todo-lists', data)
  },
  deleteTodolist: (todolistID: string) => {
    return instance.delete<ResponseType>(`/todo-lists/${todolistID}`)
  },
  updateTodolist: (todolistID: string, data: PostProperties) => {
    return instance.put<'', AxiosResponse<ResponseType>, PostProperties>(`/todo-lists/${todolistID}`, data)
  },
  getTasks: (todolistID: string) => {
    return instance.get<GetTasksResponseType>(`/todo-lists/${todolistID}/tasks`)
  },
  postTask: (data: PostProperties, todolistID: string) => {
    return instance.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistID}/tasks`, data)
  },
  updateTask: (data: UpdateTaskRequestType, todolistId: string, taskId: string) => {
    return instance.put<'', AxiosResponse<ResponseType<{ item: TaskType }>>, UpdateTaskRequestType>(`/todo-lists/${todolistId}/tasks/${taskId}`, data)
  },
  deleteTask: (taskId: string, todolistId: string) => {
    return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  }
}
