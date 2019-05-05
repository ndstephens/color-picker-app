import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import styles from '../styles/PaletteFormNavStyles'

import PaletteMetaForm from './PaletteMetaForm'

import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

class PaletteFormNav extends Component {
  state = {
    formIsVisible: false,
  }

  handleInputChange = e => this.setState({ [e.target.name]: e.target.value })

  handleDisplayForm = () => this.setState({ formIsVisible: true })

  handleHideForm = () => this.setState({ formIsVisible: false })

  render() {
    const {
      classes,
      open,
      palettes,
      paletteFormSubmit,
      handleDrawerOpen,
    } = this.props
    const { formIsVisible } = this.state

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
          color="default"
        >
          <Toolbar disableGutters={!open}>
            {/* OPEN DRAWER BUTTON/ICON */}
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <ChevronRightIcon />
            </IconButton>

            {/* NAV TITLE */}
            <Typography variant="h6" color="inherit" noWrap>
              Create A Palette
            </Typography>
          </Toolbar>

          {/* NEW PALETTE FORM */}
          <div className={classes.navBtns}>
            {/* SAVE PALETTE BUTTON */}
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleDisplayForm}
              className={classes.button}
            >
              Save Palette
            </Button>
            {/* GO BACK BUTTON */}
            <Link to="/">
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
              >
                Go Back
              </Button>
            </Link>
          </div>
        </AppBar>
        {formIsVisible && (
          <PaletteMetaForm
            palettes={palettes}
            paletteFormSubmit={paletteFormSubmit}
            handleHideForm={this.handleHideForm}
          />
        )}
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav)
