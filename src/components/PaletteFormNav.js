import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Button from '@material-ui/core/Button'

class PaletteFormNav extends Component {
  state = {
    newPaletteName: '',
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('paletteNameUnique', value =>
      this.props.palettes.every(
        palette =>
          palette.paletteName.toLowerCase() !== value.toLowerCase().trim()
      )
    )
  }

  handleInputChange = e => this.setState({ [e.target.name]: e.target.value })

  render() {
    const { classes, open, paletteFormSubmit, handleDrawerOpen } = this.props
    const { newPaletteName } = this.state

    return (
      <div>
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
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Persistent drawer
            </Typography>

            {/* SAVE NEW PALETTE FORM */}
            <ValidatorForm onSubmit={() => paletteFormSubmit(newPaletteName)}>
              {/* PALETTE NAME INPUT */}
              <TextValidator
                label="Palette Name"
                name="newPaletteName"
                value={newPaletteName}
                onChange={this.handleInputChange}
                validators={['required', 'paletteNameUnique']}
                errorMessages={['Enter palette name', 'Name already used']}
              />
              {/* SAVE PALETTE BUTTON */}
              <Button variant="contained" color="primary" type="submit">
                Save Palette
              </Button>
              {/* GO BACK BUTTON */}
              <Link to="/">
                <Button variant="contained" color="secondary">
                  Go Back
                </Button>
              </Link>
            </ValidatorForm>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default PaletteFormNav
