import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import seedColors from '../seedColors'
import { generatePalette } from '../colorHelpers'

import PaletteList from './PaletteList'
import NewPaletteForm from './NewPaletteForm'
import Palette from './Palette'
import SingleColorPalette from './SingleColorPalette'

class App extends Component {
  state = { palettes: seedColors }

  findPalette = id => this.state.palettes.find(palette => palette.id === id)

  savePalette = newPalette => {
    this.setState(prevSt => ({
      palettes: [...prevSt.palettes, newPalette],
    }))
  }

  render() {
    const { palettes } = this.state

    console.log(generatePalette(palettes[0]))

    return (
      <Switch>
        <Route
          exact
          path="/"
          render={routeProps => (
            <PaletteList palettes={palettes} {...routeProps} />
          )}
        />
        <Route
          exact
          path="/palette/new"
          render={routeProps => (
            <NewPaletteForm savePalette={this.savePalette} {...routeProps} />
          )}
        />
        <Route
          exact
          path="/palette/:id"
          render={routeProps => (
            <Palette
              palette={generatePalette(
                this.findPalette(routeProps.match.params.id)
              )}
            />
          )}
        />
        <Route
          exact
          path="/palette/:paletteId/:colorId"
          render={routeProps => (
            <SingleColorPalette
              colorId={routeProps.match.params.colorId}
              palette={generatePalette(
                this.findPalette(routeProps.match.params.paletteId)
              )}
            />
          )}
        />
      </Switch>
    )
  }
}

export default App
