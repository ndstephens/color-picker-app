import React, { Component } from 'react'

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
    return shades.slice(1) // remove first value
  }

  colorFormatChange = e => {
    this.setState({ colorFormat: e.target.value })
  }

  render() {
    const { colorFormat } = this.state
    const { paletteName, emoji } = this.props.palette

    const shadeBoxes = this._shades.map(shade => (
      <ColorBox
        key={shade.id}
        name={shade.name}
        background={shade[colorFormat]}
        displayLink={false}
      />
    ))

    return (
      <div className="Palette">
        <Navbar
          colorFormat={colorFormat}
          colorFormatChange={this.colorFormatChange}
          displayLevelSlider={false}
        />

        <div className="Palette__colors">{shadeBoxes}</div>

        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    )
  }
}

export default SingleColorPalette
