// @flow

import React from 'react';
import { Link } from 'react-router-dom';

import routes from '../constants/routes';
import styles from './Preview.css';

export function Preview({ history }) {
  console.log(history, 'history');
  return (
    <>
      <div>Preview</div>
      <Link to={routes.HOME}>BACK</Link>
    </>
  );
}
