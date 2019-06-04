// @flow
import type { AcceptedFile, AcceptedFiles } from '../components/Drop-zone';

export const ADD_FILES = 'ADD_FILES';
export const CLEAR_FILES = 'CLEAR_FILES';
export const EDIT_FILE = 'EDIT_FILE';
export const RESTORE_LIST = 'RESTORE_LIST';

export type FilesActions =
  | RestoreListAction
  | AddFilesAction
  | ClearFilesAction
  | EditFileAction;

export type RestoreListAction = {|
  type: typeof RESTORE_LIST
|};

export function restoreList(): RestoreListAction {
  return {
    type: RESTORE_LIST
  };
}

export type AddFilesAction = {|
  type: typeof ADD_FILES,
  files: AcceptedFiles
|};

export function addFiles(files: AcceptedFiles): AddFilesAction {
  return {
    type: ADD_FILES,
    files
  };
}

export type ClearFilesAction = {|
  type: typeof CLEAR_FILES
|};

export function clearFiles(): ClearFilesAction {
  return {
    type: CLEAR_FILES
  };
}

export type EditFileAction = {|
  type: typeof EDIT_FILE,
  file: AcceptedFile
|};

export function editFile(file: AcceptedFile): EditFileAction {
  return {
    type: EDIT_FILE,
    file
  };
}
