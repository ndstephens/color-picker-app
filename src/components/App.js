import React, { Component } from 'react'
import seedColors from '../seedColors'
import { generatePalette } from '../colorHelpers'

import Palette from './Palette'

class App extends Component {
  render() {
    console.log(generatePalette(seedColors[4]))
    return (
      <div>
        <Palette palette={generatePalette(seedColors[4])} />
      </div>
    )
  }
}

export default App
