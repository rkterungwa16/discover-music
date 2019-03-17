import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import devTools from 'remote-redux-devtools'
import { createStore, applyMiddleware, compose } from 'redux'
import Reducers from '../reducers'

const loggerMiddleware = createLogger()
let Store
if (process.env.NODE_ENV !== 'production') {
  Store = createStore(Reducers, compose(
    applyMiddleware(thunkMiddleware, loggerMiddleware),
    devTools()
  ))
} else {
  Store = createStore(Reducers, compose(applyMiddleware(thunkMiddleware)))
}



export default Store
