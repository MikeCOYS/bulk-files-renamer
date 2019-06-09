// @flow
import undoable, { includeAction, excludeAction } from 'redux-undo';

import type { FilesActions } from '../actions/files';
import type { AcceptedFiles } from '../components/Drop-zone';

import {
  ADD_FILES,
  CLEAR_FILES,
  RESTORE_LIST,
  DELETE_FILE,
  REORDER_FILES
} from '../actions/files';

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

const reorder = ({
  files: list,
  sourceIndex: startIndex,
  destinationIndex: endIndex
}) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
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
    case DELETE_FILE:
      return state.filter((file) => action.id !== file.id);
    case REORDER_FILES:
      return reorder(action);
    default:
      return state;
  }
};

const configuration = {
  // Undo and Redo should happen after the user have added their files,
  // and on user interacted file actions
  filter: includeAction([DELETE_FILE, REORDER_FILES])
};

// provide the functionality to undo / redo a user change
const undoableFiles = undoable(files, configuration);

export default undoableFiles;
