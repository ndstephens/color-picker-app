import React, { Component } from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { ChromePicker } from 'react-color'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Button from '@material-ui/core/Button'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

import DraggableColorBox from './DraggableColorBox'

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
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    marginTop: '64px',
    // padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
})

class NewPaletteForm extends Component {
  state = {
    open: true,
    currentColor: '',
    colorName: '',
    colors: [],
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isColorNameUnique', value =>
      this.state.colors.every(
        color => color.name.toLowerCase() !== value.toLowerCase().trim()
      )
    )
    ValidatorForm.addValidationRule('isColorValueUnique', value =>
      this.state.colors.every(color => color.color !== this.state.currentColor)
    )
  }

  handleDrawerOpen = () => this.setState({ open: true })

  handleDrawerClose = () => this.setState({ open: false })

  updateCurrentColor = newColor => this.setState({ currentColor: newColor.hex })

  updateColorName = e => this.setState({ colorName: e.target.value })

  addNewColor = () =>
    this.setState(prevSt => ({
      colors: [
        ...prevSt.colors,
        { color: prevSt.currentColor, name: prevSt.colorName.trim() },
      ],
      colorName: '',
    }))

  handleSave = () => {
    const newName = 'New test palette'
    const newPalette = {
      paletteName: newName,
      id: newName.toLowerCase().replace(/ /g, '-'),
      colors: this.state.colors,
    }
    this.props.savePalette(newPalette)
    this.props.history.push('/')
  }

  render() {
    const { classes } = this.props
    const { open, currentColor, colorName, colors } = this.state

    return (
      <div className={classes.root}>
        <CssBaseline />

        {/* NAVBAR */}
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
          color="default"
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Persistent drawer
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSave}
            >
              Save Palette
            </Button>
          </Toolbar>
        </AppBar>

        {/* DRAWER -- start */}
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>

          <Divider />

          <Typography variant="h4">Design Your Palette</Typography>
          <div>
            <Button variant="contained" color="secondary">
              Clear Palette
            </Button>
            <Button variant="contained" color="primary">
              Random Color
            </Button>
          </div>

          {/* COLOR PICKER */}
          <ChromePicker
            color={currentColor}
            onChangeComplete={this.updateCurrentColor}
          />

          {/* COLOR NAME INPUT */}
          <ValidatorForm onSubmit={this.addNewColor}>
            <TextValidator
              value={colorName}
              onChange={this.updateColorName}
              validators={[
                'required',
                'isColorNameUnique',
                'isColorValueUnique',
              ]}
              errorMessages={[
                'Enter a name',
                'Name already used',
                'Color already used',
              ]}
            />
            <Button
              variant="contained"
              type="submit"
              color="primary"
              style={{ backgroundColor: currentColor }}
            >
              Add Color
            </Button>
          </ValidatorForm>
        </Drawer>
        {/* -- END DRAWER -- */}

        {/* COLOR PALETTE */}
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          {/* <div className={classes.drawerHeader} /> */}
          {colors.map(color => (
            <DraggableColorBox {...color} key={color.name} />
          ))}
        </main>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm)
