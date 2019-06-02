// @flow
import React from 'react';
import { Switch, Route } from 'react-router';

import routes from './constants/routes';
import App from './containers/App';
import { DropZone as DropZonePage } from './components/Drop-zone';
import { Preview as PreviewPage } from './components/Preview';

export default () => (
  <App>
    <Switch>
      <Route path={routes.PREVIEW} component={PreviewPage} />
      <Route path={routes.HOME} component={DropZonePage} />
    </Switch>
  </App>
);
