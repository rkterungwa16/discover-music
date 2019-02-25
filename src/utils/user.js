import { get, checkHttpStatus, parseJSON } from './fetch'

export const getUserApi = (filterParams = null, token) => {
  return get('get-user', filterParams, token)
    .then(checkHttpStatus)
    .then(parseJSON)
    .catch(err => err)
}
