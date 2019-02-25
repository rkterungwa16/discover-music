import {
  FETCH_USER_FAILED,
  FETCH_USER_REQUESTED,
  FETCH_USER_SUCCEEDED
} from '../constants'

import { getUserApi } from '../utils/user'
import { handleError } from '../utils/fetch'

export function getUserRequest () {
  return {
    type: FETCH_USER_REQUESTED
  }
}

export function getUserSuccess (data) {
  return {
    type: FETCH_USER_SUCCEEDED,
    payload: data
  }
}

export function getUserFailure (error) {
  return {
    type: FETCH_USER_FAILED,
    payload: {
      error: error
    }
  }
}

export function getUser (token) {
  return (dispatch) => {
    dispatch(getUserRequest())

    return getUserApi('', token)
      .then((response) => {
        dispatch(getUserSuccess(response))
        return true
      })
      .catch((error) => {
        dispatch(getUserFailure(handleError(error)))
        return false
      })
  }
}
