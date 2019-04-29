import React from 'react'
import { withStyles } from '@material-ui/styles'

const styles = {
  root: {
    backgroundColor: 'white',
    border: '1px solid black',
    borderRadius: '5px',
    padding: '0.5rem',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  colors: {
    backgroundColor: 'white',
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridAutoRows: '30px',
  },
  miniColor: {
    height: '100%',
    width: '100%',
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0',
    paddingTop: '0.5rem',
    color: 'black',
    fontSize: '1rem',
    position: 'relative',
  },
  emoji: {
    marginLeft: '0.5rem',
    fontSize: '1.5rem',
  },
}

const MiniPalette = props => {
  const { classes, paletteName, id, emoji, colors, goToPalette } = props

  const handleClick = () => goToPalette(id)

  const miniColorBoxes = colors.map(color => (
    <div
      className={classes.miniColor}
      style={{ backgroundColor: color.color }}
      key={color.name}
    />
  ))

  return (
    <div className={classes.root} onClick={handleClick}>
      <div className={classes.colors}>{miniColorBoxes}</div>
      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  )
}

export default withStyles(styles)(MiniPalette)
