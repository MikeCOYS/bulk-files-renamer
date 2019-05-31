// @flow

import React from 'react';
import classnames from 'classnames';
import DropzoneComponent from 'react-dropzone';

import { history } from '../store/configureStore';
import routes from '../constants/routes';
import styles from './Drop-zone.css';

export function Dropzone() {
  return (
    <DropzoneComponent
      onDrop={(acceptedFiles) => {
        console.log(acceptedFiles);
        history.push({
          pathname: routes.PREVIEW,
          state: acceptedFiles
        });
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          className={classnames(styles.drag_and_drop_zone)}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <p>Drag & drop files or folder here, or click to select.</p>
        </div>
      )}
    </DropzoneComponent>
  );
}
