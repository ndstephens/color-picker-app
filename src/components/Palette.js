import React, { Component } from 'react'
import './Palette.css'

import ColorBox from './ColorBox'

class Palette extends Component {
  render() {
    const colorBoxes = this.props.colors.map(({ color, name }) => (
      <ColorBox background={color} name={name} />
    ))

    return (
      <div className="Palette">
        {/* NavBar goes here */}
        <div className="Palette__colors">{colorBoxes}</div>
        {/* Footer goes here */}
      </div>
    )
  }
}

export default Palette
