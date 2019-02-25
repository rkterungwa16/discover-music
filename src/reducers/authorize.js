import {
  AUTHORIZE_USER_REQUESTED,
  AUTHORIZE_USER_SUCCEEDED,
  AUTHORIZE_USER_FAILED
} from '../constants'

const initialState = {
  isFetchingToken: false,
  token: '',
  fetchingTokenError: null
}

function token (state = initialState, action) {
  switch (action.type) {
    case AUTHORIZE_USER_REQUESTED:
      return Object.assign({}, state, {
        isFetchingToken: true,
        token: '',
        fetchingTokenError: null
      })

    case AUTHORIZE_USER_SUCCEEDED:
      return Object.assign({}, state, {
        isFetchingToken: false,
        token: action.payload,
        fetchingTokenError: null
      })

    case AUTHORIZE_USER_FAILED:
      return Object.assign({}, state, {
        isFetchingToken: false,
        token: '',
        fetchingTokenError: action.payload.error.message
      })

    default:
      return state
  }
}

export default token
