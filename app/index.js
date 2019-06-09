import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import throttle from 'lodash.throttle';

import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import { loadState, saveState } from './local-storage';
import './app.global.css';

const persistedState = loadState();
const store = configureStore(persistedState);

const updateLocalStorage = () => {
  const { files } = store.getState();
  saveState({ files });
};

// Temp disable
// TODO: Persist history, not the files. Recover what's needed, not everything.
// store.subscribe(throttle(updateLocalStorage, 500));

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    // eslint-disable-next-line global-require
    const NextRoot = require('./containers/Root').default;
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
