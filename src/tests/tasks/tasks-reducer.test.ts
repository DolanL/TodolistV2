import {TasksStateType} from "../../components/TodolistList/TodolistList";
import {addTaskAC, removeTaskAC, updateTaskAC} from "../../store/tasks/tasksActionCreators";
import {tasksReducer} from "../../store/tasks/tasks-reducer";
import {TaskStatuses} from "../../api/api-todolists";
import {setTodolistsAC} from "../../store/todolists/todolistActionCreators";

let initialState: TasksStateType

beforeEach(() => {
  initialState = {
    '1': [
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
    '2': [
      {
        id: '1', title: 'React&JS', status: TaskStatuses.Completed, addedDate: '', deadline: '',
        description: '', order: 1, priority: 1, startDate: '', todoListId: '2', completed: true
      },
      {
        id: '2', title: 'JS', status: TaskStatuses.Completed, addedDate: '', deadline: '',
        description: '', order: 1, priority: 1, startDate: '', todoListId: '2', completed: true
      },
    ]
  }
})


test('testing update task title', () => {

  const newState = tasksReducer(initialState, updateTaskAC('1', '2', {title: 'newTitle'}))

  expect(newState['1'][1].title).toBe('newTitle')
  expect(newState['1'].length).toBe(3)
  expect(newState['2'].length).toBe(2)
})

test('testing remove task', () => {

  const newState = tasksReducer(initialState, removeTaskAC('2', '1'))

  expect(newState['2'][0].id).toBe('2')
  expect(newState['2'].length).toBe(1)
  expect(newState['1'].length).toBe(3)
})

test('testing add task', () => {

  const newState = tasksReducer(initialState, addTaskAC({
    id: '3', title: 'React', status: TaskStatuses.New, addedDate: '', deadline: '',
    description: '', order: 3, priority: 3, startDate: '', todoListId: '2', completed: true
  }))

  expect(newState['2'][2].title).toBe('React')
  expect(newState['2'].length).toBe(3)
  expect(newState['1'].length).toBe(3)
})

test('testing set Todolists', () => {

  const todolistsForTest = [
    {id: '1', title: 'What to learn', order: 1, filter: 'all', addedDate: ''},
    {id: '2', title: 'What to buy', order: 2, filter: 'all', addedDate: ''}
  ]

  const newState = tasksReducer({}, setTodolistsAC(todolistsForTest))


  const keys = Object.keys(newState)

  expect(keys.length).toBe(2)
})