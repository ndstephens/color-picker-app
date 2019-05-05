import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

import PaletteMetaForm from './PaletteMetaForm'

import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Button from '@material-ui/core/Button'

const drawerWidth = 340

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '64px',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  navBtns: {
    marginRight: '1rem',
    '& a': {
      textDecoration: 'none',
    },
  },
  button: {
    margin: '0 0.5rem',
  },
})

class PaletteFormNav extends Component {
  state = {
    formIsVisible: false,
  }

  handleInputChange = e => this.setState({ [e.target.name]: e.target.value })

  handleDisplayForm = () => this.setState({ formIsVisible: true })

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
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
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
          />
        )}
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav)
