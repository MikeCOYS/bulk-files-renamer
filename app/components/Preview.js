// @flow
import type { Dispatch } from 'redux';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';

import { clearFiles } from '../actions/files';
import routes from '../constants/routes';
import { DragAndDrop } from './Drag-and-drop';
import styles from './Preview.css';

import type { ClearFilesAction } from '../actions/files';
import type { AcceptedFiles } from './Drop-zone';

type PreviewProps = {
  files: AcceptedFiles,
  clearFiles: () => void
};
export class PreviewComponent extends React.Component<PreviewProps> {
  componentWillUnmount() {
    this.props.clearFiles();
  }

  render() {
    const { files } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.control}>
          <Link to={routes.HOME}>BACK</Link>
          <button>RESTORE LIST</button>
          <button>SAVE</button>
        </div>
        <DragAndDrop files={files} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  files: state.files
});

const mapDispatchToProps = (dispatch: Dispatch<ClearFilesAction>) => ({
  clearFiles: () => dispatch(clearFiles())
});

export const Preview = connect(
  mapStateToProps,
  mapDispatchToProps
)(PreviewComponent);
