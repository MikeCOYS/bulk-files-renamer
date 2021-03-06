// @flow
import type { Dispatch } from 'redux'

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import React from 'react'
import { ActionCreators as ReduxUndoActionCreators } from 'redux-undo'

import routes from '../constants/routes'
import { DragAndDrop } from './Drag-and-drop'
import styles from './Preview.css'

import type { ClearFilesAction } from '../actions/files'
import type { AcceptedFiles } from './Drop-zone'

type PreviewProps = {
  files: AcceptedFiles,
  restoreFilesList: () => void,
  undoFileChange: () => void,
  redoFileChange: () => void,
  canRestore: boolean,
  canUndo: boolean,
  canRedo: boolean
};

export class PreviewComponent extends React.Component<PreviewProps> {
  onRestoreFilesList = () => {
    this.props.restoreFilesList()
  }

  onUndoFileChange = () => {
    this.props.undoFileChange()
  }

  onRedoFileChange = () => {
    this.props.redoFileChange()
  }

  render() {
    const { files } = this.props
    return (
      <div className={styles.container}>
        <div className={styles.control}>
          <Link to={routes.HOME}>BACK</Link>
          <button
            type="button"
            disabled={!this.props.canRestore}
            onClick={this.onRestoreFilesList}
          >
            RESTORE LIST
          </button>
          <button type="button">SAVE</button>
          <button
            type="button"
            disabled={!this.props.canUndo}
            onClick={this.onUndoFileChange}
          >
            UNDO
          </button>
          <button
            type="button"
            disabled={!this.props.canRedo}
            onClick={this.onRedoFileChange}
          >
            REDO
          </button>
        </div>
        <DragAndDrop files={files} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  files: state.files.present,
  canRestore: state.files.past.length > 0,
  canUndo: state.files.past.length > 0,
  canRedo: state.files.future.length > 0
})

const mapDispatchToProps = (dispatch: Dispatch<ClearFilesAction>) => ({
  restoreFilesList: () => dispatch(ReduxUndoActionCreators.jumpToPast(0)),
  undoFileChange: () => dispatch(ReduxUndoActionCreators.undo()),
  redoFileChange: () => dispatch(ReduxUndoActionCreators.redo())
})

export const Preview = connect(
  mapStateToProps,
  mapDispatchToProps
)(PreviewComponent)
