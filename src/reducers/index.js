import { combineReducers } from 'redux'

import artists from './artists'
import authorize from './authorize'
import user from './user'
import userAlbums from './currentUserAlbums'
import userTracks from './currentUserTracks'
import playlist from './playlist'

const Reducers = combineReducers({
  artists,
  authorize,
  user,
  userAlbums,
  userTracks,
  playlist
})

export default Reducers
