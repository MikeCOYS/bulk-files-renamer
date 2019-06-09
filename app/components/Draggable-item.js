import React from 'react';
import classnames from 'classnames';
import debounce from 'lodash.debounce';
import { Draggable } from 'react-beautiful-dnd';

import { DraggableItemDelete } from './Draggable-item-delete';

import styles from './Draggable-item.css';

const updateFilesList = (event) => {
  console.log(event, 'on search before');
};

const debouncedUpdateFilesList = debounce(updateFilesList, 500);

export class DraggableItem extends React.Component {
  state = {
    disableInteractiveElementBlocking: true
  };

  handleInputChange = (event) => {
    console.log('on change');
    debouncedUpdateFilesList(event);
  };

  handleDoubleClickOnInput = () => {
    this.setState(() => ({
      disableInteractiveElementBlocking: false
    }));
  };

  handleOnBlurOnInput = () => {
    this.setState(() => ({
      disableInteractiveElementBlocking: true
    }));
  };

  render() {
    const { file, index } = this.props;

    return (
      <Draggable
        disableInteractiveElementBlocking={
          this.state.disableInteractiveElementBlocking
        }
        draggableId={file.id}
        index={index}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={classnames(styles.item, {
              [styles['item--dragging_is_active']]: snapshot.isDragging
            })}
          >
            <div>{index + 1}</div>
            <input
              type="text"
              className={styles.item__display_name}
              defaultValue={file.name}
              onChange={this.handleInputChange}
              onBlur={this.handleOnBlurOnInput}
              onDoubleClick={this.handleDoubleClickOnInput}
            />

            <DraggableItemDelete file={file} />
          </div>
        )}
      </Draggable>
    );
  }
}
