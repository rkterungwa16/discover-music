
import { get, checkHttpStatus, parseJSON } from './fetch'

export const getCurrentUserAlbumsApi = (filterParams = null, token) => {
  return get('get-user-albums', filterParams, token)
    .then(checkHttpStatus)
    .then(parseJSON)
    .catch(err => err)
}

export const getNewAlbumsApi = (filterParams = null, token) => {
  return get('get-new-albums', filterParams, token)
    .then(checkHttpStatus)
    .then(parseJSON)
    .catch(err => err)
}

export const getAlbumApi = (filterParams = null, token, id) => {
  return get('get-album', filterParams, token, id)
    .then(checkHttpStatus)
    .then(parseJSON)
    .catch(err => err)
}
