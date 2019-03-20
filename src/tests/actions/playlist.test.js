import * as configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import {
  getFeaturedPlaylists,
  getFeaturedPlaylistsFailure,
  getFeaturedPlaylistsRequest,
  getFeaturedPlaylistsSuccess
} from '../../actions/playlist'

import * as types from '../../constants'

const middlewares = [thunk]
const mockStore = configureMockStore.default(middlewares)

beforeEach(() => {
  const user = JSON.stringify({ playlist: 'running' })
  window.fetch = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      resolve({
        status: 200,
        json: () => user
      })
    })
  })
})

test('it should test that playlists are requested', () => {
  const action = getFeaturedPlaylistsRequest()
  expect(action.type).toEqual('FETCH_FEATURED_PLAYLISTS_REQUESTED')
})

test('it should test that playlists are successfully fetched', () => {
  const action = getFeaturedPlaylistsSuccess({ playlist: 'hiphop' })
  expect(action.payload).toEqual({ playlist: 'hiphop' })
})

test('it should test that playlists could not be fetched', () => {
  const action = getFeaturedPlaylistsFailure({ error: 'authorization has failed' })
  expect(action.payload.error).toEqual({ error: 'authorization has failed' })
})

test('Should asynchronously all playlists', () => {
  const expectedActions = [
    { type: types.FETCH_FEATURED_PLAYLISTS_REQUESTED },
    { type: types.FETCH_FEATURED_PLAYLISTS_FAILED },
    { type: types.FETCH_FEATURED_PLAYLISTS_SUCCEEDED, payload: { playist: 'running' } }
  ]
  const store = mockStore({ playlist : {} })
  return store.dispatch(getFeaturedPlaylists('token')).then(() => {
    expect(store.getActions()[0].type).toEqual(expectedActions[0].type)
  })
})
