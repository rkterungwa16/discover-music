import {
  SET_CURRENT_PAGE_ROUTE_SUCCEEDED
} from '../constants'

export function setCurrentRoute (data) {
  return {
    type: SET_CURRENT_PAGE_ROUTE_SUCCEEDED,
    payload: data
  }
}

