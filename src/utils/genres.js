import { get, checkHttpStatus, parseJSON } from './fetch'

export const getGenresApi = (filterParams = null, token) => {
  return get('get-genres', filterParams, token)
    .then(checkHttpStatus)
    .then(parseJSON)
    .catch(err => err)
}
