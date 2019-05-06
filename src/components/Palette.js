import React, { Component } from 'react'

import { withStyles } from '@material-ui/styles'
import styles from '../styles/PaletteStyles'

import Navbar from './Navbar'
import ColorBox from './ColorBox'
import PaletteFooter from './PaletteFooter'

class Palette extends Component {
  state = { level: 500, colorFormat: 'hex' }

  changeLevel = level => {
    this.setState({ level })
  }

  colorFormatChange = e => {
    this.setState({ colorFormat: e.target.value })
  }

  render() {
    const { colors, paletteName, id, emoji } = this.props.palette
    const { classes } = this.props
    const { level, colorFormat } = this.state

    const colorBoxes = colors[level].map(color => (
      <ColorBox
        background={color[colorFormat]}
        name={color.name}
        colorId={color.id}
        paletteId={id}
        key={color.id}
      />
    ))

    return (
      <div className={classes.Palette}>
        {/* NAVBAR */}
        <Navbar
          level={level}
          changeLevel={this.changeLevel}
          colorFormat={colorFormat}
          colorFormatChange={this.colorFormatChange}
        />

        {/* COLOR PALETTE */}
        <div className={classes.Palette__colors}>{colorBoxes}</div>

        {/* FOOTER */}
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    )
  }
}

export default withStyles(styles)(Palette)
