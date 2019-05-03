import React from 'react'
import { SortableContainer } from 'react-sortable-hoc'
import { withStyles } from '@material-ui/styles'

import DraggableColorBox from './DraggableColorBox'

const styles = {
  root: {
    height: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridTemplateRows: 'repeat(4, 1fr)',
    backgroundColor: 'lightgrey',
  },
}

const DraggableColorList = ({
  colors,
  removeColor,
  boxColorFocus,
  classes,
}) => {
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
