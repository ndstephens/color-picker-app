import React, { Component } from 'react'
import ColorBox from './ColorBox'

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

  render() {
    console.log(this._shades)
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
      <div className="Palette">
        <h1>Single Color Component</h1>
        <div className="Palette__colors">{shadeBoxes}</div>
      </div>
    )
  }
}

export default SingleColorPalette
