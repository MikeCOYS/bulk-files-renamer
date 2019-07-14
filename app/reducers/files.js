// @flow
import undoable, { includeAction } from 'redux-undo';

import type { FilesActions } from '../actions/files';
import type { AcceptedFiles } from '../components/Drop-zone';

import {
  ADD_FILES,
  CLEAR_FILES,
  RESTORE_LIST,
  DELETE_FILE,
  REORDER_FILES,
  EDIT_FILE
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

const editFile = (state, action) => [
  ...state.filter((file) => action.id !== file.id),
  {
    ...state.find((file) => action.id === file.id),
    name: action.updatedFilename
  }
];

const sortFiles = (state, files) => {
  files.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

  return [...state, ...files];
};

const files = (
  state: FilesState[] = filesReducerDefaultState,
  action: FilesActions
) => {
  switch (action.type) {
    case ADD_FILES:
      return sortFiles(state, action.files);
    case CLEAR_FILES:
      return [];
    case RESTORE_LIST:
      return state;
    case DELETE_FILE:
      return state.filter((file) => action.id !== file.id);
    case REORDER_FILES:
      return reorder(action);
    case EDIT_FILE:
      return editFile(state, action);
    default:
      return state;
  }
};

const configuration = {
  // Undo and Redo should happen after the user have added their files,
  // and on user interacted file actions
  filter: includeAction([DELETE_FILE, REORDER_FILES, EDIT_FILE])
};

// provide the functionality to undo / redo a user change
const undoableFiles = undoable(files, configuration);

export default undoableFiles;
