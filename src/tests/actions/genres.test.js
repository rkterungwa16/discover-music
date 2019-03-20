import * as configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import {
  getAllGenres,
  getGenresFailure,
  getGenresRequest,
  getGenresSuccess
} from '../../actions/genres'

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

test('it should test that genres are requested', () => {
  const action = getGenresRequest()
  expect(action.type).toEqual('FETCH_ALL_GENRES_REQUESTED')
})

test('it should test that genres are successfully fetched', () => {
  const action = getGenresSuccess({ genre: 'hiphop' })
  expect(action.payload).toEqual({ genre: 'hiphop' })
})

test('it should test that genres could not be fetched', () => {
  const action = getGenresFailure({ error: 'authorization has failed' })
  expect(action.payload.error).toEqual({ error: 'authorization has failed' })
})

test('Should asynchronously all genres', () => {

  const expectedActions = [
    { type: types.FETCH_ALL_GENRES_REQUESTED },
    { type: types.FETCH_ALL_GENRES_FAILED },
    { type: types.FETCH_ALL_GENRES_SUCCEEDED, payload: { genre: 'hiphop' } }
  ]
  const store = mockStore({ genre : {} })
  return store.dispatch(getAllGenres('token')).then(() => {
    expect(store.getActions()[0].type).toEqual(expectedActions[0].type)
  })
})
