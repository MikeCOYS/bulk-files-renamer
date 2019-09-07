import React from 'react'
import { connect } from 'react-redux'

import { editFile } from '../actions/files'

import styles from './Draggable-item-input.css'

import type { AcceptedFile } from './Drop-zone'
import type { EditFileAction } from '../actions/files'

export class DraggableItemInputComponent extends React.PureComponent<{
  file: AcceptedFile
}> {
  handleInputChange = ({ target: { value } }) => {
    const { editFile, file } = this.props

    editFile({
      id: file.id,
      updatedFilename: value
    })
  }

  render() {
    const { name } = this.props.file

    return (
      <input
        type="text"
        className={styles.item__display_name}
        value={name}
        onChange={this.handleInputChange}
        onBlur={this.props.handleOnBlurOnInput}
        onDoubleClick={this.props.handleDoubleClickOnInput}
      />
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch<EditFileAction>) => ({
  editFile: ({ id, updatedFilename }) => {
    return dispatch(editFile({ id, updatedFilename }))
  }
})

export const DraggableItemInput = connect(
  undefined,
  mapDispatchToProps
)(DraggableItemInputComponent)
