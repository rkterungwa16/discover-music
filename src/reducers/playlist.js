import {
  FETCH_FEATURED_PLAYLISTS_REQUESTED,
  FETCH_FEATURED_PLAYLISTS_SUCCEEDED,
  FETCH_FEATURED_PLAYLISTS_FAILED
} from '../constants'

const initialState = {
  isFetchingFeaturedPlaylist: false,
  featuredPlaylists: '',
  fetchingFeaturedPlaylistError: null
}

function playlist (state = initialState, action) {
  switch (action.type) {
    case FETCH_FEATURED_PLAYLISTS_REQUESTED:
      return Object.assign({}, state, {
        isFetchingFeaturedPlaylist: true,
        featuredPlaylists: '',
        fetchingFeaturedPlaylistError: null
      })

    case FETCH_FEATURED_PLAYLISTS_SUCCEEDED:
      return Object.assign({}, state, {
        isFetchingFeaturedPlaylist: false,
        featuredPlaylists: action.payload,
        fetchingFeaturedPlaylistError: null
      })

    case FETCH_FEATURED_PLAYLISTS_FAILED:
      return Object.assign({}, state, {
        isFetchingFeaturedPlaylist: false,
        featuredPlaylists: '',
        fetchingFeaturedPlaylistError: action.payload.error.message
      })

    default:
      return state
  }
}

export default playlist
