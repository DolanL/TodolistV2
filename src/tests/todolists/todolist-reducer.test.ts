import {
  addTodolistAC,
  changeTodolistFilterAC, removeTodolistAC, setTodolistsAC,
  TodolistDomainType,
  todolistsReducer,
  updateTodolistTitleAC
} from "../../store/todolists/todolists-reducer";
import {TodolistType} from "../../types/types";



let initialState: TodolistDomainType

beforeEach(() => {

  initialState = [
    {id: '1', title: 'What to learn', order: 1, filter: 'all', addedDate: ''},
    {id: '2', title: 'What to buy', order: 2, filter: 'all', addedDate: ''},
  ]
})

test('testing update todolist title', () => {

  const newTitle = 'What'

  const newState = todolistsReducer(initialState, updateTodolistTitleAC({todolistID: '1', newTitle}))


  expect(newState[0].title).toBe('What')
  expect(newState[1].title).toBe('What to buy')
  expect(newState.length).toBe(2)
})

test('testing remove todolist', () =>  {

  const newState = todolistsReducer(initialState, removeTodolistAC({todolistID: '1'}))

  expect(newState[0].title).toBe('What to buy')
  expect(newState.length).toBe(1)
})


test('testing change todolist filter', () => {

  const newState = todolistsReducer(initialState, changeTodolistFilterAC({todolistID: '1', filter: 'active'}))

  expect(newState[0].filter).toBe('active')
  expect(newState[1].title).toBe('What to buy')
  expect(newState.length).toBe(2)
})

test('testing add todolist', () => {

  const newState = todolistsReducer(initialState, addTodolistAC({todolist: {id: '3', title: 'newTitle', order: 3, addedDate: ''}}))

  expect(newState[2].title).toBe('newTitle')
  expect(newState.length).toBe(3)
})

test('testing set todolists', () => {

  const newState = todolistsReducer([], setTodolistsAC({todolists: initialState}))

  expect(newState.length).toBe(2)
})


