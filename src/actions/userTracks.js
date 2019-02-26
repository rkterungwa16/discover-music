import {
  FETCH_CURRENT_USER_TRACKS_FAILED,
  FETCH_CURRENT_USER_TRACKS_SUCCEEDED,
  FETCH_CURRENT_USER_TRACKS_REQUESTED
} from '../constants'

import { getCurrentUserTracksApi} from '../utils/currentUserTracks'
import { handleError } from '../utils/fetch'

export function getCurrentUserTrackRequest () {
  return {
    type: FETCH_CURRENT_USER_TRACKS_REQUESTED
  }
}

export function getCurrentUserTrackSuccess (data) {
  return {
    type: FETCH_CURRENT_USER_TRACKS_SUCCEEDED,
    payload: data
  }
}

export function getCurrentUserTrackFailure (error) {
  return {
    type: FETCH_CURRENT_USER_TRACKS_FAILED,
    payload: {
      error: error
    }
  }
}

export function getCurrentUserTrack (params, token) {
  return (dispatch) => {
    dispatch(getCurrentUserTrackRequest())

    return getCurrentUserTracksApi(params, token)
      .then((response) => {
        dispatch(getCurrentUserTrackSuccess(response))
        return true
      })
      .catch((error) => {
        dispatch(getCurrentUserTrackFailure(handleError(error)))
        return false
      })
  }
}
