import {
  SET_CURRENT_PAGE_ROUTE_SUCCEEDED
} from '../constants'

const initialState = {
  pageRoute: '',
}

function pageRoute (state = initialState, action) {
  switch (action.type) {

    case SET_CURRENT_PAGE_ROUTE_SUCCEEDED:
      return Object.assign({}, state, {
        pageRoute: action.payload,
      })

    default:
      return state
  }
}

export default pageRoute
