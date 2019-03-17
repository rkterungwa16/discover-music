import {
  AUTHORIZE_USER_FAILED,
  AUTHORIZE_USER_REQUESTED,
  AUTHORIZE_USER_SUCCEEDED
} from '../constants'

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
