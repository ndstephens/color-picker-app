import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import seedColors from '../seedColors'
import { generatePalette } from '../colorHelpers'

import Palette from './Palette'

class App extends Component {
  findPalette = id => seedColors.find(palette => palette.id === id)

  render() {
    // console.log(generatePalette(seedColors[4]))
    return (
      <Switch>
        <Route exact path="/" render={() => <h1>PALETTE LIST GOES HERE</h1>} />
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
      </Switch>
    )
  }
}

export default App
