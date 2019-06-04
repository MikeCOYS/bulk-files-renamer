// @flow

import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import classnames from 'classnames';

import { DraggableItems } from './Draggable-items';
import { Tooltip } from './Tooltip';
import styles from './Droppable-list.css';

import type { AcceptedFiles } from '../components/Drop-zone';

type DroppableListProps = {
  files: AcceptedFiles
};

export function DroppableList({ files }: DroppableListProps) {
  return (
    <Droppable droppableId="droppable">
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={classnames(styles.list, {
            [styles['list--dragging_is_active']]: snapshot.isDraggingOver
          })}
        >
          <div className={styles.list__header_group}>
            <h3>Drag and Drop the items below...</h3>
            <Tooltip
              classNames={styles.list__info}
              content="Triple-click the file name to edit"
              direction="LEFT"
            />
          </div>

          <DraggableItems files={files} />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
