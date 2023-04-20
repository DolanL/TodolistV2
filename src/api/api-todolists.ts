import axios, {AxiosResponse} from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1",
  withCredentials: true,
  headers: {
    "API-KEY": "a16bf247-86f1-4ef4-99af-302bbb5da3d0"
  },
})

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

export type UpdateTaskModelType = {
  title?: string
  description?: string
  completed?: boolean
  status?: number
  priority?: number
  startDate?: string
  deadline?: string
}

export type UpdateTaskRequestType = {
  title: string
  description: string
  completed: boolean
  status: TaskStatuses
  priority: number
  startDate: string
  deadline: string
}

export type ResponseType<D = {}> = {
  data: D
  fieldsErrors: []
  messages: Array<string>
  resultCode: number
}

type PostProperties = {
  title: string
}


export type TodolistType = {
  addedDate: string
  id: string
  order: number
  title: string
}

export type TaskType = {
  addedDate: string
  deadline: string
  description: string
  id: string
  order: number
  priority: TaskPriorities
  startDate: string
  status: TaskStatuses
  title: string
  todoListId: string
  completed: boolean
}

export enum TaskStatuses {
  New,
  InProgress,
  Completed,
  Draft
}

export enum TaskPriorities {
  Low,
  Middle,
  Hi,
  Urgently,
  Later
}


export type GetTasksResponseType = {
  error: string
  items: TaskType[]
  totalCount: number
}