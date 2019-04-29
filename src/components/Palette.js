import React, { Component } from 'react'

import './Palette.css'

import Navbar from './Navbar'
import ColorBox from './ColorBox'

class Palette extends Component {
  state = { level: 500, colorFormat: 'hex' }

  changeLevel = level => {
    this.setState({ level })
  }

  colorFormatChange = e => {
    this.setState({ colorFormat: e.target.value })
  }

  render() {
    const { colors } = this.props.palette
    const { level, colorFormat } = this.state

    const colorBoxes = colors[level].map(color => (
      <ColorBox background={color[colorFormat]} name={color.name} />
    ))

    return (
      <div className="Palette">
        <Navbar
          level={level}
          changeLevel={this.changeLevel}
          colorFormat={colorFormat}
          colorFormatChange={this.colorFormatChange}
        />
        <div className="Palette__colors">{colorBoxes}</div>
        {/* Footer goes here */}
      </div>
    )
  }
}

export default Palette
