// @flow
import type { FilesActions } from '../actions/files';
import type { AcceptedFiles } from '../components/Drop-zone';

import { ADD_FILES, CLEAR_FILES, RESTORE_LIST } from '../actions/files';

const filesReducerDefaultState = [];

export type FilesState = {
  files: AcceptedFiles
};

export default function files(
  state: FilesState[] = filesReducerDefaultState,
  action: FilesActions
) {
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
}
