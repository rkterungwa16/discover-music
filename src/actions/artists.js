import {
  FETCH_ALL_ARTISTS_FAILED,
  FETCH_ALL_ARTISTS_REQUESTED,
  FETCH_ALL_ARTISTS_SUCCEEDED
} from '../constants'

import { getArtistsApi} from '../utils/artists'
import { handleError } from '../utils/fetch'

export function getArtistsRequest () {
  return {
    type: FETCH_ALL_ARTISTS_REQUESTED
  }
}

export function getArtistsSuccess (data) {
  return {
    type: FETCH_ALL_ARTISTS_SUCCEEDED,
    payload: data
  }
}

export function getArtistsFailure (error) {
  return {
    type: FETCH_ALL_ARTISTS_FAILED,
    payload: {
      error: error
    }
  }
}

export function getAllArtists () {
  return (dispatch) => {
    dispatch(getArtistsRequest())

    return getArtistsApi()
      .then((response) => {
        dispatch(getArtistsSuccess(response))
        return true
      })
      .catch((error) => {
        dispatch(getArtistsFailure(handleError(error)))
        return false
      })
  }
}
