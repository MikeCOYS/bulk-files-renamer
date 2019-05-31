// @flow

import React, { Component } from 'react';
import classnames from 'classnames';

import {Dropzone} from './Drop-zone'
import 'normalize.css/normalize.css'; // normalize css for all browsers
import styles from './Home.css';

type Props = {};

export class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className={classnames(styles.container)} data-tid="container">
        <Dropzone />
      </div>
    );
  }
}
