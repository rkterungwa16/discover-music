import * as configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import {
  getCurrentUserTrack,
  getCurrentUserTrackFailure,
  getCurrentUserTrackRequest,
  getCurrentUserTrackSuccess
} from '../../actions/userTracks'

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


test('it should test that a current user track is requested', () => {
  const action = getCurrentUserTrackRequest()
  expect(action.type).toEqual('FETCH_CURRENT_USER_TRACKS_REQUESTED')
})

test('it should test that a current user track is fetched successfully', () => {
  const action = getCurrentUserTrackSuccess({ name: 'terungwa' })
  expect(action.payload).toEqual({ name: 'terungwa' })
})


test('it should test that current user track is not fetched successfully', () => {
  const action = getCurrentUserTrackFailure({ error: 'authorization has failed' })
  expect(action.payload.error).toEqual({ error: 'authorization has failed' })
})

test('Should asynchronously fetch a user', () => {

  const expectedActions = [
    { type: types.FETCH_CURRENT_USER_TRACKS_REQUESTED },
    { type: types.FETCH_CURRENT_USER_TRACKS_FAILED },
    { type: types.FETCH_CURRENT_USER_TRACKS_SUCCEEDED, payload: { name: 'terungwa' } }
  ]
  const store = mockStore({ user : {} })
  return store.dispatch(getCurrentUserTrack('token')).then(() => {
    expect(store.getActions()[0].type).toEqual(expectedActions[0].type)
  })
})
