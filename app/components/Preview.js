// @flow
import type { Dispatch } from 'redux';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';
import { ActionCreators as ReduxUndoActionCreators } from 'redux-undo';

import { clearFiles } from '../actions/files';
import routes from '../constants/routes';
import { DragAndDrop } from './Drag-and-drop';
import styles from './Preview.css';

import type { ClearFilesAction } from '../actions/files';
import type { AcceptedFiles } from './Drop-zone';

type PreviewProps = {
  files: AcceptedFiles,
  clearFiles: () => void,
  undoFileChange: () => void,
  redoFileChange: () => void
};

type PreviewState = {
  canUndo: boolean,
  canRedo: boolean
};

export class PreviewComponent extends React.Component<
  PreviewProps,
  PreviewState
> {
  state = {
    canUndo: false,
    canRedo: false
  };

  componentWillUnmount() {
    this.props.clearFiles(); // TODO: Clear files won't clear if user just exits. Need to handle this scenario
  }

  onUndoFileChange = () => {
    this.props.undoFileChange();
  };

  onRedoFileChange = () => {
    this.props.redoFileChange();
  };

  render() {
    const { files } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.control}>
          <Link to={routes.HOME}>BACK</Link>
          <button type="button">RESTORE LIST</button>
          <button type="button">SAVE</button>
          <button
            type="button"
            disabled={!this.state.canUndo}
            onClick={this.onUndoFileChange}
          >
            UNDO
          </button>
          <button
            type="button"
            disabled={!this.state.canRedo}
            onClick={this.onRedoFileChange}
          >
            REDO
          </button>
        </div>
        <DragAndDrop files={files} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  files: state.files.present,
  canUndo: state.files.past.length > 0,
  canRedo: state.files.future.length > 0
});

const mapDispatchToProps = (dispatch: Dispatch<ClearFilesAction>) => ({
  clearFiles: () => dispatch(clearFiles()),
  undoFileChange: () => dispatch(ReduxUndoActionCreators.undo()),
  redoFileChange: () => dispatch(ReduxUndoActionCreators.redo())
});

export const Preview = connect(
  mapStateToProps,
  mapDispatchToProps
)(PreviewComponent);
