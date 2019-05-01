import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'

import Navbar from './Navbar'
import ColorBox from './ColorBox'
import PaletteFooter from './PaletteFooter'

const styles = {
  Palette: {
    height: '100vh',
    // display: 'flex',
    // flexDirection: 'column',
  },
  Palette__colors: {
    height: '90%',
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridAutoRows: '1fr',
  },
}

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
