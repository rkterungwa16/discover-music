import * as configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import {
  getCurrentUserAlbums,
  getCurrentUserAlbumFailure,
  getCurrentUserAlbumRequest,
  getCurrentUserAlbumSuccess,
  getAlbum,
  getAlbumFailure,
  getAlbumRequest,
  getAlbumSuccess,
  getNewAlbums,
  getNewAlbumsFailure,
  getNewAlbumsRequest,
  getNewAlbumsSuccess
} from '../../actions/userAlbum'

import * as types from '../../constants'

const middlewares = [thunk]
const mockStore = configureMockStore.default(middlewares)

beforeEach(() => {
  const userAlbum = JSON.stringify({ theCarter: 'terungwa' })
  window.fetch = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      resolve({
        status: 200,
        json: () => userAlbum
      })
    })
  })
})

test('it should test that current user Album is requested', () => {
  const action = getCurrentUserAlbumRequest()
  expect(action.type).toEqual('FETCH_CURRENT_USER_ALBUMS_REQUESTED')
})

test('it should test that current user albums is successful', () => {
  const action = getCurrentUserAlbumSuccess({ theCarter: 'terungwa' })
  expect(action.payload).toEqual({ theCarter: 'terungwa' })
})

test('it should test that current user albums is not found', () => {
  const action = getCurrentUserAlbumFailure({ error: 'authorization has failed' })
  expect(action.payload.error).toEqual({ error: 'authorization has failed' })
})

test('Should asynchronously fetch user albums', () => {
  const expectedActions = [
    { type: types.FETCH_CURRENT_USER_ALBUMS_REQUESTED },
    { type: types.FETCH_CURRENT_USER_ALBUMS_FAILED },
    { type: types.FETCH_CURRENT_USER_ALBUMS_SUCCEEDED, payload: { name: 'terungwa' } }
  ]
  const store = mockStore({ user : {} })
  return store.dispatch(getCurrentUserAlbums('token')).then(() => {
    expect(store.getActions()[0].type).toEqual(expectedActions[0].type)
  })
})

test('it should test that album is requested', () => {
  const action = getAlbumRequest()
  expect(action.type).toEqual('FETCH_ONE_ALBUM_REQUESTED')
})

test('it should test that album is successful', () => {
  const action = getAlbumSuccess({ theCarter: 'terungwa' })
  expect(action.payload).toEqual({ theCarter: 'terungwa' })
})

test('it should test that album is not found', () => {
  const action = getAlbumFailure({ error: 'authorization has failed' })
  expect(action.payload.error).toEqual({ error: 'authorization has failed' })
})

test('Should asynchronously fetch album', () => {
  const expectedActions = [
    { type: types.FETCH_ONE_ALBUM_REQUESTED },
    { type: types.FETCH_ONE_ALBUM_FAILED},
    { type: types.FETCH_ONE_ALBUM_SUCCEEDED, payload: { name: 'terungwa' } }
  ]
  const store = mockStore({ user : {} })
  return store.dispatch(getAlbum('token')).then(() => {
    expect(store.getActions()[0].type).toEqual(expectedActions[0].type)
  })
})

test('it should test that new album is requested', () => {
  const action = getNewAlbumsRequest()
  expect(action.type).toEqual('FETCH_NEW_ALBUMS_REQUESTED')
})

test('it should test that album is successful', () => {
  const action = getNewAlbumsSuccess({ theCarter: 'terungwa' })
  expect(action.payload).toEqual({ theCarter: 'terungwa' })
})

test('it should test that new album is not found', () => {
  const action = getNewAlbumsFailure({ error: 'authorization has failed' })
  expect(action.payload.error).toEqual({ error: 'authorization has failed' })
})

test('Should asynchronously fetch album', () => {
  const expectedActions = [
    { type: types.FETCH_NEW_ALBUMS_REQUESTED },
    { type: types.FETCH_NEW_ALBUMS_FAILED},
    { type: types.FETCH_NEW_ALBUMS_SUCCEEDED, payload: { name: 'terungwa' } }
  ]
  const store = mockStore({ user : {} })
  return store.dispatch(getNewAlbums('token')).then(() => {
    expect(store.getActions()[0].type).toEqual(expectedActions[0].type)
  })
})


