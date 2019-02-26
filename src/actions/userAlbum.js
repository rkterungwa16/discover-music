import {
  FETCH_CURRENT_USER_ALBUMS_FAILED,
  FETCH_CURRENT_USER_ALBUMS_REQUESTED,
  FETCH_CURRENT_USER_ALBUMS_SUCCEEDED,
  FETCH_NEW_ALBUMS_FAILED,
  FETCH_NEW_ALBUMS_REQUESTED,
  FETCH_NEW_ALBUMS_SUCCEEDED
} from '../constants'

import { getNewAlbumsApi, getCurrentUserAlbumsApi} from '../utils/currentUserAlbum'
import { handleError } from '../utils/fetch'

/***********************************************/
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

export function getCurrentUserAlbums (params, token) {
  return (dispatch) => {
    dispatch(getCurrentUserAlbumRequest())

    return getCurrentUserAlbumsApi(params, token)
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

/***********************************************/

export function getNewAlbumsRequest () {
  return {
    type: FETCH_NEW_ALBUMS_REQUESTED
  }
}

export function getNewAlbumsSuccess (data) {
  return {
    type: FETCH_NEW_ALBUMS_SUCCEEDED,
    payload: data
  }
}

export function getNewAlbumsFailure (error) {
  return {
    type: FETCH_NEW_ALBUMS_FAILED,
    payload: {
      error: error
    }
  }
}

export function getNewAlbums (params, token) {
  return (dispatch) => {
    dispatch(getNewAlbumsRequest())

    return getNewAlbumsApi(params, token)
      .then((response) => {
        dispatch(getNewAlbumsSuccess(response))
        return true
      })
      .catch((error) => {
        dispatch(getNewAlbumsFailure(handleError(error)))
        return false
      })
  }
}
