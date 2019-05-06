import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import seedColors from '../seedColors'
import { generatePalette } from '../colorHelpers'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import '../styles/App.css'

import PaletteList from './PaletteList'
import NewPaletteForm from './NewPaletteForm'
import Palette from './Palette'
import SingleColorPalette from './SingleColorPalette'

class App extends Component {
  state = {
    palettes: JSON.parse(localStorage.getItem('palettes')) || seedColors,
  }

  findPalette = id => this.state.palettes.find(palette => palette.id === id)

  savePalette = newPalette => {
    this.setState(
      prevSt => ({
        palettes: [...prevSt.palettes, newPalette],
      }),
      this.syncLocalStorage
    )
  }

  deletePalette = id => {
    this.setState(
      prevSt => ({
        palettes: prevSt.palettes.filter(palette => palette.id !== id),
      }),
      this.syncLocalStorage
    )
  }

  syncLocalStorage = () => {
    localStorage.setItem('palettes', JSON.stringify(this.state.palettes))
  }

  render() {
    const { palettes } = this.state

    return (
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} classNames="fade" timeout={500}>
              <Switch location={location}>
                <Route
                  exact
                  path="/"
                  render={routeProps => (
                    <div className="page">
                      <PaletteList
                        deletePalette={this.deletePalette}
                        palettes={palettes}
                        {...routeProps}
                      />
                    </div>
                  )}
                />
                <Route
                  exact
                  path="/palette/new"
                  render={routeProps => (
                    <div className="page">
                      <NewPaletteForm
                        savePalette={this.savePalette}
                        palettes={palettes}
                        {...routeProps}
                      />
                    </div>
                  )}
                />
                <Route
                  exact
                  path="/palette/:id"
                  render={routeProps => (
                    <div className="page">
                      <Palette
                        palette={generatePalette(
                          this.findPalette(routeProps.match.params.id)
                        )}
                      />
                    </div>
                  )}
                />
                <Route
                  exact
                  path="/palette/:paletteId/:colorId"
                  render={routeProps => (
                    <div className="page">
                      <SingleColorPalette
                        colorId={routeProps.match.params.colorId}
                        palette={generatePalette(
                          this.findPalette(routeProps.match.params.paletteId)
                        )}
                      />
                    </div>
                  )}
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    )
  }
}

export default App
