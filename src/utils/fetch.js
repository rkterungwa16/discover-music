import { API_URL } from '../constants'

export const paths = {
  'get-artists': 'browse/categories',
  'get-user': 'me',
  'get-user-albums': 'me/albums',
  'get-user-tracks': 'me/tracks',
  'get-featured-playlists': 'browse/featured-playlists',
  'get-new-albums': 'browse/new-releases',
  'get-genres': 'browse/categories',
  'get-album': 'albums/'
}

/**
 * Handle all api calls for any method
 *
 * @param {String} endpoint API url
 * @param {String} method Method used to call the API
 * @param {Object | null} body Contains request body properties
 * if none required default to null
 * @param {String} params Extra information as url query strings
 *
 * @return {Function} A function call of the appropriate api
 */
function fetchBackend (endpoint, method, body, params, token, id) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  const fetchObject = { method, headers }
  // map endpoint passed to paths object keys to get currect url
  let url
  const path = paths[endpoint] || endpoint

   url = `${API_URL}${path}`

  if (body) {
    fetchObject.body = JSON.stringify(body)
  }

  if (id) {
    url = `${url}${id}`
  }

  // Construct the appropriate url that has extra parameters
  if (params) {
    const paramsArray = Object.keys(params).map((key) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    })

    url += `?${paramsArray.join('&')}`
  }
  return fetch(url, fetchObject)
}

/**
 * Perform get requests
 * @param {String} endpoint url of specified api
 * @param {String | null} params query strings if
 * none is required pass null
 */
export function get (endpoint, params, token, id) {
  return fetchBackend(endpoint, 'GET', null, params, token, id)
}

/**
 * Handle the appropriate Http status
 *
 * @param {Object} response response from api call
 *
 * @return {Promise} Promise that is either resolved
 * or rejected based on the appropriate conditions
 */
export function checkHttpStatus (response) {
  return new Promise((resolve, reject) => {
    if (response.status === 404) {

    }

    if (response && response.status >= 200 && response.status < 300) {
      resolve(response)
    }

    if (response.error) {
      const error = new Error(response.error.message)
      reject(error)
    }
    // const errorText = response && response.statusText ? response.statusText : 'Unknown Error'

  })
}

/**
 * Parse response json to produce object
 * @param {Object} response Object from successful api call
 */
export function parseJSON (response) {
  return new Promise((resolve, reject) => {
    if (!response || !response.json) {
      const connectionError = new Error()
      connectionError.message = {
        connection: 'Network connection failed'
      }
      reject(connectionError)
    }
    resolve(response.text())
  })
}

export const handleError = (error) => {
  console.log('page error', error)
  return error
}
