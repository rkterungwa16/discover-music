import {
  FETCH_ALL_GENRES_REQUESTED,
  FETCH_ALL_GENRES_SUCCEEDED,
  FETCH_ALL_GENRES_FAILED
} from '../constants'

const initialState = {
  isFetchingGenres: false,
  genres: [],
  fetchingGenresError: null
}

function genres (state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_GENRES_REQUESTED:
      return Object.assign({}, state, {
        isFetchingGenres: true,
        genres: [],
        fetchingGenresError: null
      })

    case FETCH_ALL_GENRES_SUCCEEDED:
      return Object.assign({}, state, {
        isFetchingGenres: false,
        genres: action.payload,
        fetchingGenresError: null
      })

    case FETCH_ALL_GENRES_FAILED:
      return Object.assign({}, state, {
        isFetchingGenres: false,
        genres: [],
        fetchingGenresError: action.payload
      })

    default:
      return state
  }
}

export default genres
