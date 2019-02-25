import {
  FETCH_USER_REQUESTED,
  FETCH_USER_SUCCEEDED,
  FETCH_USER_FAILED
} from '../constants'

const initialState = {
  isFetchingUser: false,
  user: {},
  fetchingUserError: null
}

function user (state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_REQUESTED:
      return Object.assign({}, state, {
        isFetchingUser: true,
        user: {},
        fetchingUserError: null
      })

    case FETCH_USER_SUCCEEDED:
      return Object.assign({}, state, {
        isFetchingUser: false,
        user: action.payload,
        fetchingUserError: null
      })

    case FETCH_USER_FAILED:
      return Object.assign({}, state, {
        isFetchingUser: false,
        user: {},
        fetchingUserError: action.payload.error.message
      })

    default:
      return state
  }
}

export default user
