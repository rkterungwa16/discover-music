import {
  FETCH_ALL_GENRES_FAILED,
  FETCH_ALL_GENRES_REQUESTED,
  FETCH_ALL_GENRES_SUCCEEDED
} from '../constants'

import { getGenresApi } from '../utils/genres'
import { handleError } from '../utils/fetch'

export function getGenresRequest () {
  return {
    type: FETCH_ALL_GENRES_REQUESTED
  }
}

export function getGenresSuccess (data) {
  return {
    type: FETCH_ALL_GENRES_SUCCEEDED,
    payload: data
  }
}

export function getGenresFailure (error) {
  return {
    type: FETCH_ALL_GENRES_FAILED,
    payload: {
      error: error
    }
  }
}

export function getAllGenres (params, token) {
  console.log('genres params', token)
  return (dispatch) => {
    dispatch(getGenresRequest())

    return getGenresApi(params, token)
      .then((response) => {
        dispatch(getGenresSuccess(response))
        return true
      })
      .catch((error) => {
        dispatch(getGenresFailure(handleError(error)))
        return false
      })
  }
}
