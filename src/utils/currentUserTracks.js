
import { get, checkHttpStatus, parseJSON } from './fetch'

export const getCurrentUserTracksApi = (filterParams = null, token) => {
  return get('get-user-tracks', filterParams, token)
    .then(checkHttpStatus)
    .then(parseJSON)
    .catch(err => err)
}
