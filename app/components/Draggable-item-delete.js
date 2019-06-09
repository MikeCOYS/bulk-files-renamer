// @flow
import React from 'react';
import { connect } from 'react-redux';

import { deleteFile } from '../actions/files';

import styles from './Draggable-item-delete.css';

import type { DeleteFilesAction } from '../actions/files';
import type { AcceptedFile } from './Drop-zone';

type DraggableItemDeleteProps = {
  file: AcceptedFile
};

class DraggableItemDeleteComponent extends React.Component<DraggableItemDeleteProps> {
  handleDeleteFile = () => {
    const { file } = this.props;

    this.props.deleteFile(file.id);
  };

  render() {
    return (
      <button
        type="button"
        className={styles.item__control}
        onClick={this.handleDeleteFile}
      >
        <div className={styles.item__control_delete} />
      </button>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<DeleteFilesAction>) => ({
  deleteFile: (id) => dispatch(deleteFile(id))
});

export const DraggableItemDelete = connect(
  undefined,
  mapDispatchToProps
)(DraggableItemDeleteComponent);
