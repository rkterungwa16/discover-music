
import { get, checkHttpStatus, parseJSON } from './fetch'

export const getFeaturedPlaylistsApi = (filterParams = null, token) => {
  return get('get-featured-playlists', filterParams, token)
    .then(checkHttpStatus)
    .then(parseJSON)
    .catch(err => err)
}
