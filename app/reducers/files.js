// @flow
import undoable from 'redux-undo';

import type { FilesActions } from '../actions/files';
import type { AcceptedFiles } from '../components/Drop-zone';

import { ADD_FILES, CLEAR_FILES, RESTORE_LIST } from '../actions/files';

const filesReducerDefaultState = [];

type ReduxUndo = {
  past: AcceptedFiles[],
  present: AcceptedFiles[],
  future: AcceptedFiles[],
  history: AcceptedFiles[]
};

export type FilesState = {
  files: {
    past: ReduxUndo[],
    present: ReduxUndo[],
    history: ReduxUndo[]
  }
};

const files = (
  state: FilesState[] = filesReducerDefaultState,
  action: FilesActions
) => {
  switch (action.type) {
    case ADD_FILES:
      return [...state, ...action.files];
    case CLEAR_FILES:
      return [];
    case RESTORE_LIST:
      return state;
    default:
      return state;
  }
};

// provide the functionality to undo/redo a user change
const undoableFiles = undoable(files);

export default undoableFiles;
