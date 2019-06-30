import React from 'react';
import classnames from 'classnames';
import { Draggable } from 'react-beautiful-dnd';

import { DraggableItemDelete } from './Draggable-item-delete';
import { DraggableItemInput } from './Draggable-item-input';

import styles from './Draggable-item.css';
export class DraggableItem extends React.Component {
  state = {
    disableInteractiveElementBlocking: true
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
            <DraggableItemInput
              file={file}
              handleOnBlurOnInput={this.handleOnBlurOnInput}
              handleDoubleClickOnInput={this.handleDoubleClickOnInput}
            />
            <DraggableItemDelete file={file} />
          </div>
        )}
      </Draggable>
    );
  }
}
