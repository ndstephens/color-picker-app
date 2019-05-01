import React from 'react'
import { withStyles } from '@material-ui/styles'

const styles = {
  Palette__footer: {
    height: '4vh',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  emoji: {
    margin: '0 1rem',
    fontSize: '1.5rem',
  },
}

const PaletteFooter = ({ paletteName, emoji, classes }) => {
  return (
    <footer className={classes.Palette__footer}>
      {paletteName}
      <span className={classes.emoji}>{emoji}</span>
    </footer>
  )
}

export default withStyles(styles)(PaletteFooter)
