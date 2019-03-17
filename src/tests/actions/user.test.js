import * as configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import {
  getUser,
  getUserFailure,
  getUserRequest,
  getUserSuccess
} from '../../actions/user'

import * as types from '../../constants'

const middlewares = [thunk]
const mockStore = configureMockStore.default(middlewares)

beforeEach(() => {
  const user = JSON.stringify({ name: 'terungwa' })
  window.fetch = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      resolve({
        status: 200,
        json: () => user
      })
    })
  })
})


test('it should test that a registered user is requested', () => {
  const action = getUserRequest()
  expect(action.type).toEqual('FETCH_USER_REQUESTED')
})

test('it should test that a user is registered', () => {
  const action = getUserSuccess({ name: 'terungwa' })
  expect(action.payload).toEqual({ name: 'terungwa' })
})


test('it should test that a user is not registered', () => {
  const action = getUserFailure({ error: 'authorization has failed' })
  expect(action.payload.error).toEqual({ error: 'authorization has failed' })
})

test('Should asynchronously fetch a user', () => {

  const expectedActions = [
    { type: types.FETCH_USER_REQUESTED },
    { type: types.FETCH_USER_FAILED },
    { type: types.FETCH_USER_SUCCEEDED, payload: { name: 'terungwa' } }
  ]
  const store = mockStore({ user : {} })
  return store.dispatch(getUser('token')).then(() => {
    expect(store.getActions()[0].type).toEqual(expectedActions[0].type)
  })
})
