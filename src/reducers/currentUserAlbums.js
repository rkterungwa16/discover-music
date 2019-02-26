import {
  FETCH_CURRENT_USER_ALBUMS_REQUESTED,
  FETCH_CURRENT_USER_ALBUMS_SUCCEEDED,
  FETCH_CURRENT_USER_ALBUMS_FAILED,
  FETCH_NEW_ALBUMS_SUCCEEDED,
  FETCH_NEW_ALBUMS_REQUESTED,
  FETCH_NEW_ALBUMS_FAILED,
  FETCH_ONE_ALBUM_FAILED,
  FETCH_ONE_ALBUM_REQUESTED,
  FETCH_ONE_ALBUM_SUCCEEDED
} from '../constants'

const initialState = {
  isFetchingUserAlbums: false,
  userAlbums: '',
  fetchingUserAlbumsError: null,
  isFetchingNewAlbums: false,
  newAlbums: '',
  fetchingNewAlbumsError: null,
  isFetchingAlbum: false,
  album: '',
  fetchingAlbumError: null
}

function userAlbums (state = initialState, action) {
  switch (action.type) {
    case FETCH_CURRENT_USER_ALBUMS_REQUESTED:
      return Object.assign({}, state, {
        isFetchingUserAlbums: true,
        userAlbums: '',
        fetchingUserAlbumsError: null
      })

    case FETCH_CURRENT_USER_ALBUMS_SUCCEEDED:
      return Object.assign({}, state, {
        isFetchingUserAlbums: false,
        userAlbums: action.payload,
        fetchingUserAlbumsError: null
      })

    case FETCH_CURRENT_USER_ALBUMS_FAILED:
      return Object.assign({}, state, {
        isFetchingUserAlbums: false,
        userAlbums: '',
        fetchingUserAlbumsError: action.payload
      })

    case FETCH_NEW_ALBUMS_REQUESTED:
      return Object.assign({}, state, {
        isFetchingNewAlbums: true,
        newAlbums: '',
        fetchingNewAlbumsError: null
      })

    case FETCH_NEW_ALBUMS_SUCCEEDED:
      return Object.assign({}, state, {
        isFetchingNewAlbums: false,
        newAlbums: action.payload,
        fetchingNewAlbumsError: null
      })

    case FETCH_NEW_ALBUMS_FAILED:
      return Object.assign({}, state, {
        isFetchingNewAlbums: false,
        newAlbums: '',
        fetchingNewAlbumsError: action.payload
      })

    case FETCH_ONE_ALBUM_REQUESTED:
      return Object.assign({}, state, {
        isFetchingNewAlbums: true,
        newAlbums: '',
        fetchingNewAlbumsError: null
      })

    case FETCH_ONE_ALBUM_SUCCEEDED:
      return Object.assign({}, state, {
        isFetchingAlbum: false,
        album: action.payload,
        fetchingalbumError: null
      })

    case FETCH_ONE_ALBUM_FAILED:
      return Object.assign({}, state, {
        isFetchingAlbum: false,
        album: '',
        fetchingAlbumsError: action.payload
      })

    default:
      return state
  }
}

export default userAlbums
