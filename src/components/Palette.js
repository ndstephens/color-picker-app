import React, { Component } from 'react'

import './Palette.css'

import Navbar from './Navbar'
import ColorBox from './ColorBox'

class Palette extends Component {
  state = { level: 500 }

  changeLevel = level => {
    this.setState({ level })
  }

  render() {
    const { colors } = this.props.palette
    const { level } = this.state

    const colorBoxes = colors[level].map(({ hex, name }) => (
      <ColorBox background={hex} name={name} />
    ))

    return (
      <div className="Palette">
        <Navbar level={level} changeLevel={this.changeLevel} />
        <div className="Palette__colors">{colorBoxes}</div>
        {/* Footer goes here */}
      </div>
    )
  }
}

export default Palette
