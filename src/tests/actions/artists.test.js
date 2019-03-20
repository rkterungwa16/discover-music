import * as configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import {
  getAllArtists,
  getArtistsFailure,
  getArtistsRequest,
  getArtistsSuccess
} from '../../actions/artists'

import * as types from '../../constants'

const middlewares = [thunk]
const mockStore = configureMockStore.default(middlewares)

beforeEach(() => {
  const user = JSON.stringify({ artist: 'Tupac' })
  window.fetch = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      resolve({
        status: 200,
        json: () => user
      })
    })
  })
})

test('it should test that artsts are requested', () => {
  const action = getArtistsRequest()
  expect(action.type).toEqual('FETCH_ALL_ARTISTS_REQUESTED')
})

test('it should test that artsts are successfully fetched', () => {
  const action = getArtistsSuccess({ artst: 'hiphop' })
  expect(action.payload).toEqual({ artst: 'hiphop' })
})

test('it should test that artsts could not be fetched', () => {
  const action = getArtistsFailure({ error: 'authorization has failed' })
  expect(action.payload.error).toEqual({ error: 'authorization has failed' })
})

test('Should asynchronously all artsts', () => {
  const expectedActions = [
    { type: types.FETCH_ALL_ARTISTS_REQUESTED },
    { type: types.FETCH_ALL_ARTISTS_FAILED },
    { type: types.FETCH_ALL_ARTISTS_SUCCEEDED, payload: { artst: 'Tupac' } }
  ]
  const store = mockStore({ artst : {} })
  return store.dispatch(getAllArtists('token')).then(() => {
    expect(store.getActions()[0].type).toEqual(expectedActions[0].type)
  })
})
