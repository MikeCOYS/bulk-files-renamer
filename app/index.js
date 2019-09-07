import React, { Fragment } from 'react'
import { render } from 'react-dom'
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader'
import throttle from 'lodash.throttle'

import Root from './containers/Root'
import { configureStore, history } from './store/configureStore'
import { loadState, saveState } from './local-storage'
import './app.global.css'

const persistedState = loadState()
const store = configureStore(persistedState)

const updateLocalStorage = () => {
  const { files } = store.getState()
  saveState({ files })
}

// Temp disable
// TODO: Persist history, not the files. Recover what's needed, not everything.
// store.subscribe(throttle(updateLocalStorage, 500));

const AppContainerComponent = process.env.PLAIN_HMR
  ? Fragment
  : ReactHotAppContainer

render(
  <AppContainerComponent>
    <Root store={store} history={history} />
  </AppContainerComponent>,
  document.getElementById('root')
)
