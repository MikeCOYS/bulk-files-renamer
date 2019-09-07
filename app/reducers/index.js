// @flow
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import files from './files'

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    files
  })
}
