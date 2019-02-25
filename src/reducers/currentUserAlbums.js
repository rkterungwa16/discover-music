import {
  FETCH_CURRENT_USER_ALBUMS_REQUESTED,
  FETCH_CURRENT_USER_ALBUMS_SUCCEEDED,
  FETCH_CURRENT_USER_ALBUMS_FAILED
} from '../constants'

const initialState = {
  isFetchingUserAlbums: false,
  userAlbums: {},
  fetchingUserAlbumsError: null
}

function userAlbums (state = initialState, action) {
  switch (action.type) {
    case FETCH_CURRENT_USER_ALBUMS_REQUESTED:
      return Object.assign({}, state, {
        isFetchingUserAlbums: true,
        userAlbums: {},
        fetchingUserAlbumsError: null
      })

    case FETCH_CURRENT_USER_ALBUMS_SUCCEEDED:
      return Object.assign({}, state, {
        isFetchingUserAlbums: false,
        userAlbums: action.payload.user,
        fetchingUserAlbumsError: null
      })

    case FETCH_CURRENT_USER_ALBUMS_FAILED:
      return Object.assign({}, state, {
        isFetchingUserAlbums: false,
        userAlbums: {},
        fetchingUserAlbumsError: action.payload.error.message
      })

    default:
      return state
  }
}

export default userAlbums
