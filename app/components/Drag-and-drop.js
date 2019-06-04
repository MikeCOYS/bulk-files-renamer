import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Modal from 'react-modal';

import { DroppableList } from './Droppable-list';
import styles from './Drag-and-drop.css';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

Modal.setAppElement('#root');

export class DragAndDrop extends React.Component {
  state = {
    files: this.props.files,
    showModal: false
  };

  onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const files = reorder(
      this.state.files,
      result.source.index,
      result.destination.index
    );

    this.setState(() => ({ files }));
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

  render() {
    return (
      <>
        <div className={styles.list__header_group}>
          <input
            type="search"
            placeholder="Enter a generic name for all files..."
          />
          <button onClick={this.handleRenameOnClick}>Update List</button>
        </div>

        <DragDropContext onDragEnd={this.onDragEnd}>
          <DroppableList files={this.state.files} />
        </DragDropContext>
        <Modal
          isOpen={this.state.showModal}
          onRequestClose={this.handleCloseModal}
          shouldCloseOnOverlayClick
          className={styles.update_list_modal}
          overlayClassName={styles.update_list_modal__overlay}
        >
          <button onClick={this.handleCloseModal}>Close Modal</button>
          <p className={styles.update_list_modal__message}>
            Please ensure the files are sorted in the correct order before
            clicking OK.
          </p>
        </Modal>
      </>
    );
  }
}
