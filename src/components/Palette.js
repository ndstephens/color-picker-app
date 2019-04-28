import React, { Component } from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import './Palette.css'

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
        <div className="slider">
          <Slider
            defaultValue={level}
            min={100}
            max={900}
            step={100}
            onAfterChange={this.changeLevel}
          />
        </div>
        {/* NavBar goes here */}
        <div className="Palette__colors">{colorBoxes}</div>
        {/* Footer goes here */}
      </div>
    )
  }
}

export default Palette
