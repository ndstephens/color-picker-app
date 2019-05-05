import React from 'react'
import { SortableContainer } from 'react-sortable-hoc'
import { withStyles } from '@material-ui/styles'
import styles from '../styles/DraggableColorListStyles'

import DraggableColorBox from './DraggableColorBox'

const DraggableColorList = props => {
  const { colors, removeColor, boxColorFocus, classes } = props

  return (
    <div className={classes.root}>
      {colors.map((color, i) => (
        <DraggableColorBox
          index={i}
          key={color.name}
          {...color}
          removeColor={removeColor}
          boxColorFocus={boxColorFocus}
        />
      ))}
    </div>
  )
}

export default SortableContainer(withStyles(styles)(DraggableColorList))
