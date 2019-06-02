// @flow
import type { Dispatch } from 'redux';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';

import { clearFiles } from '../actions/files';
import routes from '../constants/routes';
import styles from './Preview.css';

import type { ClearFilesAction } from '../actions/files';
import type { AcceptedFiles } from './Drop-zone';

type PreviewProps = {
  files: AcceptedFiles,
  clearFiles: () => void
};

type PreviewState = {
  files: []
};

export class PreviewComponent extends React.Component<
  PreviewProps,
  PreviewState
> {
  componentWillUnmount() {
    this.props.clearFiles();
  }

  render() {
    const { files } = this.props;
    return (
      <div className={styles.container}>
        <div>
          <Link to={routes.HOME}>BACK</Link>
        </div>
        <div>
          {files.map((file) => {
            return <div key={new Date()}> {file.name} </div>;
            // return <input key={new Date()} value={file.name} />;
          })}
        </div>
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
