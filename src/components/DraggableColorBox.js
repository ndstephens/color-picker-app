import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  root: {
    width: '20%',
    height: '25%',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    // margin: '0 auto',
    // marginBottom: '-3.5px'
  },
}

const DraggableColorBox = ({ color, classes }) => {
  return (
    <div className={classes.root} style={{ backgroundColor: color }}>
      {color}
    </div>
  )
}

export default withStyles(styles)(DraggableColorBox)
