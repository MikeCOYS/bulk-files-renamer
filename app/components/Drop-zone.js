// @flow
import type { Dispatch } from 'redux';
import type { RouterHistory } from 'react-router-dom';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import React from 'react';
import classnames from 'classnames';
import ReactDropZoneComponent from 'react-dropzone';
import uuidv1 from 'uuid/v1';

import { addFiles } from '../actions/files';
import routes from '../constants/routes';
import styles from './Drop-zone.css';

import type { AddFilesAction } from '../actions/files';

type DropZoneComponentProps = {
  addFiles: (AcceptedFiles) => AddFilesAction,
  history: RouterHistory
};

export type AcceptedFile = {
  id: string,
  name: string,
  path: string,
  size: number,
  type: string,
  lastModified: string,
  lastModifiedDate: string
};

export type AcceptedFiles = AcceptedFile[];

export class DropZoneComponent extends React.Component<DropZoneComponentProps> {
  handleAcceptedFiles = (acceptedFiles: AcceptedFiles) => {
    const parsedFiles = acceptedFiles.map(
      ({ name, path, size, type, lastModified, lastModifiedDate }) => ({
        id: uuidv1(),
        name,
        path,
        size,
        type,
        lastModified,
        lastModifiedDate
      })
    );

    this.props.addFiles(parsedFiles);
    this.props.history.push(routes.PREVIEW);
  };

  render() {
    return (
      <ReactDropZoneComponent onDrop={this.handleAcceptedFiles}>
        {({ getRootProps, getInputProps }) => (
          <div
            className={styles.drag_and_drop_zone}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <p>Drag & drop files or folder here, or click to select.</p>
          </div>
        )}
      </ReactDropZoneComponent>
    );
  }
}

const DropZoneComponentWithRouter = withRouter(DropZoneComponent);

const mapDispatchToProps = (dispatch: Dispatch<AddFilesAction>) => ({
  addFiles: (files) => dispatch(addFiles(files))
});

export const DropZone = connect(
  undefined,
  mapDispatchToProps
)(DropZoneComponentWithRouter);
