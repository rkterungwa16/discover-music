import { get, checkHttpStatus, parseJSON } from './fetch'

export const getArtistsApi = (filterParams = null) => {
  return get('get-artists', filterParams)
    .then(checkHttpStatus)
    .then(parseJSON)
    // .catch(err => err)
}
