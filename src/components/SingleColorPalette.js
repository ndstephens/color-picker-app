import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/styles'
import styles from '../styles/PaletteStyles'

import Navbar from './Navbar'
import ColorBox from './ColorBox'
import PaletteFooter from './PaletteFooter'

class SingleColorPalette extends Component {
  constructor(props) {
    super(props)
    this.state = { colorFormat: 'hex' }
    this._shades = this.gatherShades(this.props.palette, this.props.colorId)
  }

  gatherShades = (palette, colorId) => {
    const shades = Object.values(palette.colors).map(shadeList => {
      return shadeList.find(shade => shade.id.split('-')[0] === colorId)
    })
    return shades.slice(1) // remove first value, we don't use it
  }

  colorFormatChange = e => {
    this.setState({ colorFormat: e.target.value })
  }

  render() {
    const { paletteName, id, emoji } = this.props.palette
    const { classes } = this.props
    const { colorFormat } = this.state

    const shadeBoxes = this._shades.map(shade => (
      <ColorBox
        key={shade.id}
        name={shade.name}
        background={shade[colorFormat]}
        displayLink={false}
      />
    ))

    return (
      <div className={classes.Palette}>
        <Navbar
          colorFormat={colorFormat}
          colorFormatChange={this.colorFormatChange}
          displayLevelSlider={false}
        />

        <div
          className={classes.Palette__colors}
          style={{ gridTemplateRows: 'repeat(2, 1fr)' }}
        >
          {shadeBoxes}
          <div className={classes.goBackBox}>
            <Link to={`/palette/${id}`} className={classes.goBackBtn}>
              Go Back
            </Link>
          </div>
        </div>

        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    )
  }
}

export default withStyles(styles)(SingleColorPalette)
