import {v1} from "uuid";
import {addTodolistAC, removeTodolistAC} from "../../store/todolists/todolistActionCreators";
import {TodolistDomainType, todolistsReducer} from "../../store/todolists/todolists-reducer";
import {TasksStateType} from "../../components/TodolistList/TodolistList";
import {tasksReducer} from "../../store/tasks/tasks-reducer";
import {TaskStatuses} from "../../types/types";


test('testing tasks and todolist: "Add todolist"', () => {

  const initialStateTodolists: TodolistDomainType = []

  const initialStateTasks: TasksStateType = {}

  const newTodolist = {id: '1', title: 'newTitle', order: 3, addedDate: ''}

  const action = addTodolistAC(newTodolist)

  const newTodolistsState = todolistsReducer(initialStateTodolists, action)
  const newTasksState = tasksReducer(initialStateTasks, action)


  const keys = Object.keys(newTasksState)
  const idFromTodolists = newTodolistsState[0].id
  const idFromTasks = keys[0]


  expect(idFromTasks).toEqual(action.todolist.id)
  expect(idFromTodolists).toEqual(action.todolist.id)
  expect(newTodolistsState[0].filter).toBe('all')
})

test('testing tasks and todolists: "Remove todolist"', () => {

  const initialStateTodolists: TodolistDomainType = [
    {id: '1', title: 'What to learn', order: 1, filter: 'all', addedDate: ''},
    {id: '2', title: 'What to buy', order: 2, filter: 'all', addedDate: ''},
  ]

  const initialStateTasks: TasksStateType = {
    ['1']: [
      {
        id: '1', title: 'HTML&CSS', status: TaskStatuses.Completed, addedDate: '', deadline: '',
        description: '', order: 1, priority: 1, startDate: '', todoListId: '1', completed: true
      },
      {
        id: '2', title: 'CSS', status: TaskStatuses.Completed, addedDate: '', deadline: '',
        description: '', order: 1, priority: 1, startDate: '', todoListId: '1', completed: true
      },
      {
        id: '3', title: 'HTML', status: TaskStatuses.Completed, addedDate: '', deadline: '',
        description: '', order: 1, priority: 1, startDate: '', todoListId: '1', completed: true
      },

    ],
    ['2']: [
      {
        id: '1', title: 'React&JS', status: TaskStatuses.Completed, addedDate: '', deadline: '',
        description: '', order: 1, priority: 1, startDate: '', todoListId: '2', completed: true
      },
      {
        id: '2', title: 'JS', status: TaskStatuses.Completed, addedDate: '', deadline: '',
        description: '', order: 1, priority: 1, startDate: '', todoListId: '2', completed: true
      },
      {
        id: '3', title: 'React', status: TaskStatuses.Completed, addedDate: '', deadline: '',
        description: '', order: 1, priority: 1, startDate: '', todoListId: '2', completed: true
      },
    ]
  }

  const action = removeTodolistAC('1')

  const newTodolistsState = todolistsReducer(initialStateTodolists, action)
  const newTasksState = tasksReducer(initialStateTasks, action)

  const keys = Object.keys(newTasksState)
  const idFromTodolists = newTodolistsState[0].id
  const idFromTasks = keys[0]

  expect(idFromTasks).toEqual(idFromTodolists)
  expect(idFromTodolists).not.toEqual(action.todolistID)
  expect(idFromTasks).not.toEqual(action.todolistID)
  expect(newTodolistsState.length).toBe(1)
  expect(newTasksState['1']).not.toBeDefined()
})