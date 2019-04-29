import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import MiniPalette from './MiniPalette'

class PaletteList extends Component {
  render() {
    const { palettes } = this.props

    const paletteList = palettes.map(palette => <MiniPalette {...palette} />)

    return (
      <div className="PaletteList">
        <h1>React Colors</h1>
        {paletteList}
      </div>
    )
  }
}

export default PaletteList
