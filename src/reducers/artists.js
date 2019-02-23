import {
    FETCH_ALL_ARTISTS_REQUESTED,
    FETCH_ALL_ARTISTS_SUCCEEDED,
    FETCH_ALL_ARTISTS_FAILED
  } from '../constants'
  
  const initialState = {
    isFetchingArtists: false,
    artists: [],
    fetchingArtistsError: null
  }
  
  function artists (state = initialState, action) {
    switch (action.type) {
      case FETCH_ALL_ARTISTS_REQUESTED:
        return Object.assign({}, state, {
          isFetchingArtists: true,
          artists: [],
          fetchingArtistsError: null
        })
  
      case FETCH_ALL_ARTISTS_SUCCEEDED:
        return Object.assign({}, state, {
          isFetchingArtists: false,
          artists: action.payload.artists,
          fetchingArtistsError: null
        })
  
      case FETCH_ALL_ARTISTS_FAILED:
        return Object.assign({}, state, {
          isFetchingArtists: false,
          artists: [],
          fetchingArtistsError: action.payload.error.message
        })
  
      default:
        return state
    }
  }
  
  export default artists