import React from 'react'

import { withStyles } from '@material-ui/styles'
import styles from '../styles/DraggableColorBoxStyles'

import { SortableElement } from 'react-sortable-hoc'
import DeleteIcon from '@material-ui/icons/Delete'

const DraggableColorBox = props => {
  const { color, name, removeColor, boxColorFocus, classes } = props

  return (
    <div
      className={classes.root}
      style={{ backgroundColor: color }}
      onClick={() => {
        boxColorFocus(color)
      }}
    >
      <div className={classes.boxContent}>
        <span>{name}</span>
        <DeleteIcon
          className={classes.deleteIcon}
          onClick={e => {
            e.stopPropagation()
            removeColor(name)
          }}
        />
      </div>
    </div>
  )
}

export default SortableElement(withStyles(styles)(DraggableColorBox))
