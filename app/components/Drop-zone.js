// @flow
import type { Dispatch } from 'redux'
import type { RouterHistory } from 'react-router-dom'
import { promises } from 'fs'
import { extname, basename } from 'path'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import React from 'react'
import uuidv1 from 'uuid/v1'

import { addFiles, clearFiles } from '../actions/files'
import { recursiveGetFiles, getFileDetails } from '../utils/file-system'
import { flattenDeep } from '../utils/array'

import routes from '../constants/routes'
import styles from './Drop-zone.css'

import type { AddFilesAction, ClearFilesAction } from '../actions/files'

type DropZoneComponentProps = {
  addFiles: (AcceptedFiles) => AddFilesAction,
  clearFiles: () => ClearFilesAction,
  history: RouterHistory,
  clearReduxHistory: () => void
};

export type AcceptedFile = {
  id: string,
  name: string,
  path: string,
  type: string,
  size: number,
  lastModifiedMS: number,
  lastModifiedDate: string,
  createdMS: number,
  createdDate: string,
  indexNode: number
};

export type AcceptedFiles = AcceptedFile[];

const transformFiles = async (files: FileList) => {
  const retrievedFiles = await Promise.all(
    Object.values(files).map(async ({ path }) => recursiveGetFiles(path))
  )

  return Promise.all(
    flattenDeep(retrievedFiles).map(async (filePath) => ({
      id: uuidv1(),
      ...(await getFileDetails(filePath))
    }))
  )
}

export class DropZoneComponent extends React.Component<DropZoneComponentProps> {
  constructor(props: DropZoneComponentProps) {
    super(props)
    props.clearFiles()
    props.clearReduxHistory()
  }

  onDragOver = (event: Event) => event.preventDefault()

  handleOnDrop = async (event: SyntheticDragEvent<HTMLDivElement>) => {
    event.preventDefault()
    this.handleFiles(event.dataTransfer.files)
  }

  handleOnChange = async (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.handleFiles(event.target.files)
  }

  async handleFiles(files: FileList) {
    if (!files.length) return // TODO: highlight dash border to red to indicate unaccepted file.

    const transformedFiles = await transformFiles(files)

    this.props.addFiles(transformedFiles)
    this.props.history.push(routes.PREVIEW)
  }

  render() {
    return (
      <div
        className={styles.drag_and_drop_zone}
        onDragOver={this.onDragOver}
        onDrop={this.handleOnDrop}
      >
        <input type="file" multiple="multiple" onChange={this.handleOnChange} />
        <p>Drag & drop files or folder here, or click to select.</p>
      </div>
    )
  }
}

const DropZoneComponentWithRouter = withRouter(DropZoneComponent)

const mapDispatchToProps = (
  dispatch: Dispatch<AddFilesAction | ClearFilesAction>
) => ({
  addFiles: (files) => dispatch(addFiles(files)),
  clearFiles: () => dispatch(clearFiles()),
  clearReduxHistory: () => dispatch({ type: '@@INIT' }) // An action from Redux
})

export const DropZone = connect(
  undefined,
  mapDispatchToProps
)(DropZoneComponentWithRouter)
