// @flow
import type { Dispatch } from 'redux';
import type { DropResult } from 'react-beautiful-dnd';

import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import Modal from 'react-modal';
import debounce from 'lodash.debounce';

import { DroppableList } from './Droppable-list';
import { reorderFiles } from '../actions/files';
import styles from './Drag-and-drop.css';

import type { AcceptedFiles } from './Drop-zone';
import type { ReorderFilesAction } from '../actions/files';

Modal.setAppElement('#root');

type DragAndDropProps = {
  reorderFiles: (
    files: AcceptedFiles,
    sourceIndex: number,
    destinationIndex: number
  ) => ReorderFilesAction,
  files: AcceptedFiles
};

type DragAndDropState = {
  genericName: string,
  showModal: boolean
};

class DragAndDropComponent extends React.Component<
  DragAndDropProps,
  DragAndDropState
> {
  state = {
    genericName: '',
    showModal: false
  };

  onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    this.props.reorderFiles(
      this.props.files,
      result.source.index,
      result.destination.index
    );
  };

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleRenameOnClick = () => {
    this.handleOpenModal();
  };

  handleConfirm = () => {
    console.log('confirm');
  };

  genericNameInputValue = null;

  debouncedHandleGenericNameInput = debounce((genericName) => {
    this.setState(() => ({ genericName }));
  }, 100);

  handleGenericNameInput = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.genericNameInputValue = event.target.value;
    this.debouncedHandleGenericNameInput(this.genericNameInputValue);
  };

  render() {
    return (
      <>
        <div className={styles.list__header_group}>
          <input
            type="search"
            placeholder="Enter a generic name for all files..."
            onKeyUp={this.handleGenericNameInput}
          />
          <button
            type="button"
            disabled={!this.state.genericName}
            onClick={this.handleRenameOnClick}
          >
            Update List
          </button>
        </div>

        <DragDropContext onDragEnd={this.onDragEnd}>
          <DroppableList files={this.props.files} />
        </DragDropContext>
        <Modal
          isOpen={this.state.showModal}
          onRequestClose={this.handleCloseModal}
          shouldCloseOnOverlayClick
          className={styles.update_list_modal}
          overlayClassName={styles.update_list_modal__overlay}
        >
          <div className={styles.update_list_modal__button_container}>
            <button
              className={styles.confirm}
              type="button"
              onClick={this.handleConfirm}
            >
              OK
            </button>
            <button
              className={styles.close}
              type="button"
              onClick={this.handleCloseModal}
            >
              Close Modal
            </button>
          </div>

          <p className={styles.update_list_modal__message}>
            Please ensure the files are sorted in the correct order before
            clicking OK.
          </p>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  files: state.files.present
});

const mapDispatchToProps = (dispatch: Dispatch<ReorderFilesAction>) => ({
  reorderFiles: (files, sourceIndex, destinationIndex) =>
    dispatch(reorderFiles(files, sourceIndex, destinationIndex))
});

export const DragAndDrop = connect(
  mapStateToProps,
  mapDispatchToProps
)(DragAndDropComponent);
