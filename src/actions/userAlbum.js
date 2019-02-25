import {
  FETCH_CURRENT_USER_ALBUMS_FAILED,
  FETCH_CURRENT_USER_ALBUMS_REQUESTED,
  FETCH_CURRENT_USER_ALBUMS_SUCCEEDED
} from '../constants'

import { getCurrentUserAlbumsApi} from '../utils/artists'
import { handleError } from '../utils/fetch'

export function getCurrentUserAlbumRequest () {
  return {
    type: FETCH_CURRENT_USER_ALBUMS_REQUESTED
  }
}

export function getCurrentUserAlbumSuccess (data) {
  return {
    type: FETCH_CURRENT_USER_ALBUMS_SUCCEEDED,
    payload: data
  }
}

export function getCurrentUserAlbumFailure (error) {
  return {
    type: FETCH_CURRENT_USER_ALBUMS_FAILED,
    payload: {
      error: error
    }
  }
}

export function getCurrentUserAlbums () {
  return (dispatch) => {
    dispatch(getCurrentUserAlbumRequest())

    return getCurrentUserAlbumsApi()
      .then((response) => {
        dispatch(getCurrentUserAlbumSuccess(response))
        return true
      })
      .catch((error) => {
        dispatch(getCurrentUserAlbumFailure(handleError(error)))
        return false
      })
  }
}
