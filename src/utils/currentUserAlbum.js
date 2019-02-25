
import { get, checkHttpStatus, parseJSON } from './fetch'

export const getCurrentUserAlbumsApi = (filterParams = null, token) => {
  return get('get-user-albums', filterParams, token)
    .then(checkHttpStatus)
    .then(parseJSON)
    .catch(err => err)
}
