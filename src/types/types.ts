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

export type PostProperties = {
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

export type authProperties = {
  email: string,
  password: string,
  rememberMe: boolean,
  captcha?: boolean,
}