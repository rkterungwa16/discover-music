import {
  FETCH_FEATURED_PLAYLISTS_FAILED,
  FETCH_FEATURED_PLAYLISTS_REQUESTED,
  FETCH_FEATURED_PLAYLISTS_SUCCEEDED
} from '../constants'

import { getFeaturedPlaylistsApi} from '../utils/playlist'
import { handleError } from '../utils/fetch'

export function getFeaturedPlaylistsRequest () {
  return {
    type: FETCH_FEATURED_PLAYLISTS_REQUESTED
  }
}

export function getFeaturedPlaylistsSuccess (data) {
  return {
    type: FETCH_FEATURED_PLAYLISTS_SUCCEEDED,
    payload: data
  }
}

export function getFeaturedPlaylistsFailure (error) {
  return {
    type: FETCH_FEATURED_PLAYLISTS_FAILED,
    payload: {
      error: error
    }
  }
}

export function getFeaturedPlaylists (params, token) {
  return (dispatch) => {
    dispatch(getFeaturedPlaylistsRequest())

    return getFeaturedPlaylistsApi(params, token)
      .then((response) => {
        dispatch(getFeaturedPlaylistsSuccess(response))
        return true
      })
      .catch((error) => {
        dispatch(getFeaturedPlaylistsFailure(handleError(error)))
        return false
      })
  }
}
