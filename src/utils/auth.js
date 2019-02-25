import { get, checkHttpStatus, parseJSON } from './fetch'

export const authorizeUserApi = (filterParams = null) => {
  return get('get-token', filterParams)
    .then(checkHttpStatus)
    .then(parseJSON)
    .catch(err => err)
}
