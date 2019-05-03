import React from 'react'
import { withStyles } from '@material-ui/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import chroma from 'chroma-js'

const styles = {
  root: {
    width: '20%',
    height: '25%',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
  },
  boxContent: {
    width: '100%',
    position: 'absolute',
    left: '0',
    top: '0',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px',
    color: props =>
      chroma(props.color).luminance() >= 0.55 ? 'rgba(0, 0, 0, 0.65)' : 'white',
  },
  deleteIcon: {
    transform: 'scale(1)',
    '&:hover': {
      transform: 'scale(1.3)',
    },
    transition: 'transform 200ms',
  },
}

const DraggableColorBox = ({ color, name, removeColor, classes }) => {
  return (
    <div className={classes.root} style={{ backgroundColor: color }}>
      <div className={classes.boxContent}>
        <span>{name}</span>
        <DeleteIcon className={classes.deleteIcon} onClick={removeColor} />
      </div>
    </div>
  )
}

export default withStyles(styles)(DraggableColorBox)
