import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import seedColors from '../seedColors'
import { generatePalette } from '../colorHelpers'

import PaletteList from './PaletteList'
import NewPaletteForm from './NewPaletteForm'
import Palette from './Palette'
import SingleColorPalette from './SingleColorPalette'
import Page from './Page'

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
            <CSSTransition key={location.key} classNames="page" timeout={500}>
              <Switch location={location}>
                <Route
                  exact
                  path="/"
                  render={routeProps => (
                    <Page>
                      <PaletteList
                        deletePalette={this.deletePalette}
                        palettes={palettes}
                        {...routeProps}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/palette/new"
                  render={routeProps => (
                    <Page>
                      <NewPaletteForm
                        savePalette={this.savePalette}
                        palettes={palettes}
                        {...routeProps}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/palette/:id"
                  render={routeProps => (
                    <Page>
                      <Palette
                        palette={generatePalette(
                          this.findPalette(routeProps.match.params.id)
                        )}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/palette/:paletteId/:colorId"
                  render={routeProps => (
                    <Page>
                      <SingleColorPalette
                        colorId={routeProps.match.params.colorId}
                        palette={generatePalette(
                          this.findPalette(routeProps.match.params.paletteId)
                        )}
                      />
                    </Page>
                  )}
                />
                {/* DEFAULT FALLBACK ROUTE */}
                <Route
                  render={routeProps => (
                    <Page>
                      <PaletteList
                        deletePalette={this.deletePalette}
                        palettes={palettes}
                        {...routeProps}
                      />
                    </Page>
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
