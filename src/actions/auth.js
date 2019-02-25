import {
  AUTHORIZE_USER_FAILED,
  AUTHORIZE_USER_REQUESTED,
  AUTHORIZE_USER_SUCCEEDED
} from '../constants'

import { authorizeUserApi } from '../utils/auth'
import { handleError } from '../utils/fetch'

export function authorizeUserRequest () {
  return {
    type: AUTHORIZE_USER_REQUESTED
  }
}

export function authorizeUserSuccess (data) {
  return {
    type: AUTHORIZE_USER_SUCCEEDED,
    payload: data
  }
}

export function authorizeUserFailure (error) {
  return {
    type: AUTHORIZE_USER_FAILED,
    payload: {
      error: error
    }
  }
}

export function authorizeUser () {
  return (dispatch) => {
    dispatch(authorizeUserRequest())

    return authorizeUserApi()
      .then((response) => {
        dispatch(authorizeUserSuccess(response))
        return true
      })
      .catch((error) => {
        dispatch(authorizeUserFailure(handleError(error)))
        return false
      })
  }
}
