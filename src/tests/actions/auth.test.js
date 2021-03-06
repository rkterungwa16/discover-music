import * as configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import {
  authorizeUserFailure,
  authorizeUserRequest,
  authorizeUserSuccess
} from '../../actions/auth'

import * as types from '../../constants'

const middlewares = [thunk]
const mockStore = configureMockStore.default(middlewares)

test('it should test that a user is being authorized', () => {
  const action = authorizeUserRequest()
  expect(action.type).toEqual('AUTHORIZE_USER_REQUESTED')
})

test('it should test that a user authorization has succeeded', () => {
  const action = authorizeUserSuccess({ name: 'terungwa' })
  expect(action.payload).toEqual({ name: 'terungwa' })
})


test('it should test that a user authorization has failed', () => {
  const action = authorizeUserFailure({ error: 'authorization has failed' })
  expect(action.payload.error).toEqual({ error: 'authorization has failed' })
})
