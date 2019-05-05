import React from 'react'
import { withStyles } from '@material-ui/styles'
import styles from '../styles/MiniPaletteStyles'

import DeleteIcon from '@material-ui/icons/Delete'

const MiniPalette = props => {
  const {
    classes,
    paletteName,
    id,
    emoji,
    colors,
    goToPalette,
    deletePalette,
  } = props

  const handlePaletteClick = () => goToPalette(id)

  const handleDeleteClick = e => {
    e.stopPropagation()
    deletePalette(id)
  }

  const miniColorBoxes = colors.map(color => (
    <div
      className={classes.miniColor}
      style={{ backgroundColor: color.color }}
      key={color.name}
    />
  ))

  return (
    <div className={classes.root} onClick={handlePaletteClick}>
      <DeleteIcon
        className={classes.deleteIcon}
        style={{ transition: 'opacity 300ms' }}
        onClick={handleDeleteClick}
      />
      <div className={classes.colors}>{miniColorBoxes}</div>
      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  )
}

export default withStyles(styles)(MiniPalette)
