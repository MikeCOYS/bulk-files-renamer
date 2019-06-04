import React from 'react';

import { DraggableItem } from './Draggable-item';

export function DraggableItems({ files }) {
  return files.map((file, index) => (
    <DraggableItem key={file.id} file={file} index={index} />
  ));
}
