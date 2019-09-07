// @flow
import type { AcceptedFile, AcceptedFiles } from '../components/Drop-zone'

export const ADD_FILES = 'ADD_FILES'
export const CLEAR_FILES = 'CLEAR_FILES'
export const EDIT_FILE = 'EDIT_FILE'
export const RESTORE_LIST = 'RESTORE_LIST'
export const DELETE_FILE = 'DELETE_FILE'
export const REORDER_FILES = 'REORDER_FILES'
export const UPDATE_LIST = 'UPDATE_LIST'

export type FilesActions =
  | RestoreListAction
  | AddFilesAction
  | ClearFilesAction
  | EditFileAction
  | DeleteFileAction
  | ReorderFilesAction
  | UpdateListAction;

export type RestoreListAction = {|
  type: typeof RESTORE_LIST
|};

export const restoreList = (): RestoreListAction => ({
  type: RESTORE_LIST
})

export type AddFilesAction = {|
  type: typeof ADD_FILES,
  files: AcceptedFiles
|};

export const addFiles = (files: AcceptedFiles): AddFilesAction => ({
  type: ADD_FILES,
  files
})

export type ClearFilesAction = {|
  type: typeof CLEAR_FILES
|};

export const clearFiles = (): ClearFilesAction => ({
  type: CLEAR_FILES
})

export type EditFileAction = {|
  type: typeof EDIT_FILE,
  id: string,
  updatedFilename: string
|};

export const editFile = ({
  id,
  updatedFilename
}: {
  id: string,
  updatedFilename: string
}): EditFileAction => ({
  type: EDIT_FILE,
  id,
  updatedFilename
})

export type UpdateListAction = {|
  type: typeof UPDATE_LIST,
  genericName: string
|};

export const updateList = (genericName: string): UpdateListAction => ({
  type: UPDATE_LIST,
  genericName
})

export type DeleteFileAction = {|
  type: typeof DELETE_FILE,
  id: string
|};

export const deleteFile = (id: string): DeleteFileAction => ({
  type: DELETE_FILE,
  id
})

export type ReorderFilesAction = {|
  type: typeof REORDER_FILES,
  files: AcceptedFiles,
  sourceIndex: number,
  destinationIndex: number
|};

export const reorderFiles = (
  files: AcceptedFiles,
  sourceIndex: number,
  destinationIndex: number
): ReorderFilesAction => ({
  type: REORDER_FILES,
  files,
  sourceIndex,
  destinationIndex
})
