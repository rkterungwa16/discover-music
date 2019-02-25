import {
  FETCH_CURRENT_USER_TRACKS_REQUESTED,
  FETCH_CURRENT_USER_TRACKS_SUCCEEDED,
  FETCH_CURRENT_USER_TRACKS_FAILED
} from '../constants'

const initialState = {
  isFetchingUserTracks: false,
  userTracks: {},
  fetchingUserTracksError: null
}

function userTracks (state = initialState, action) {
  switch (action.type) {
    case FETCH_CURRENT_USER_TRACKS_REQUESTED:
      return Object.assign({}, state, {
        isFetchingUserTracks: true,
        userTracks: {},
        fetchingUserTracksError: null
      })

    case FETCH_CURRENT_USER_TRACKS_SUCCEEDED:
      return Object.assign({}, state, {
        isFetchingUserTracks: false,
        userTracks: action.payload.user,
        fetchingUserTracksError: null
      })

    case FETCH_CURRENT_USER_TRACKS_FAILED:
      return Object.assign({}, state, {
        isFetchingUserTracks: false,
        userTracks: {},
        fetchingUserTracksError: action.payload.error.message
      })

    default:
      return state
  }
}

export default userTracks
