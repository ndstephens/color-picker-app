import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/styles'

import MiniPalette from './MiniPalette'

const styles = {
  root: {
    backgroundColor: 'blue',
    height: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  container: {
    width: '90%',
    maxWidth: '800px',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  nav: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    color: 'white',
  },
  palettes: {
    boxSizing: 'border-box',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '5%',
  },
}

class PaletteList extends Component {
  goToPalette = id => {
    this.props.history.push(`/palette/${id}`)
  }

  render() {
    const { classes, palettes } = this.props

    const paletteList = palettes.map(palette => (
      <MiniPalette {...palette} goToPalette={this.goToPalette} />
    ))

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>React Colors</h1>
          </nav>
          <div className={classes.palettes}>{paletteList}</div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(PaletteList)
