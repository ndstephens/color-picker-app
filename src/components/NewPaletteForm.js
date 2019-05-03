import React, { Component } from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { ChromePicker } from 'react-color'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import arrayMove from 'array-move'

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

import DraggableColorList from './DraggableColorList'

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
    paletteName: '',
    colorName: '',
    currentColor: '',
    colors: [],
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('colorNameUnique', value =>
      this.state.colors.every(
        color => color.name.toLowerCase() !== value.toLowerCase().trim()
      )
    )
    ValidatorForm.addValidationRule('colorValueUnique', value =>
      this.state.colors.every(color => color.color !== this.state.currentColor)
    )
    ValidatorForm.addValidationRule('paletteNameUnique', value =>
      this.props.palettes.every(
        palette =>
          palette.paletteName.toLowerCase() !== value.toLowerCase().trim()
      )
    )
  }

  handleDrawerOpen = () => this.setState({ open: true })

  handleDrawerClose = () => this.setState({ open: false })

  updateCurrentColor = newColor => this.setState({ currentColor: newColor.hex })

  addNewColor = () =>
    this.setState(prevSt => ({
      colors: [
        ...prevSt.colors,
        { color: prevSt.currentColor, name: prevSt.colorName.trim() },
      ],
      colorName: '',
    }))

  removeColor = colorName => {
    this.setState(prevSt => ({
      colors: prevSt.colors.filter(color => color.name !== colorName),
    }))
  }

  boxColorFocus = colorValue => this.setState({ currentColor: colorValue })

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  handleSubmit = () => {
    const paletteName = this.state.paletteName.trim()
    const newPalette = {
      paletteName,
      id: paletteName.toLowerCase().replace(/ /g, '-'),
      colors: this.state.colors,
    }
    this.props.savePalette(newPalette)
    this.props.history.push('/')
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }))
  }

  render() {
    const { classes } = this.props
    const { open, currentColor, colorName, colors, paletteName } = this.state

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

            {/* SAVE PALETTE */}
            <ValidatorForm onSubmit={this.handleSubmit}>
              <TextValidator
                label="Palette Name"
                name="paletteName"
                value={paletteName}
                onChange={this.handleChange}
                validators={['required', 'paletteNameUnique']}
                errorMessages={['Enter palette name', 'Name already used']}
              />
              <Button variant="contained" color="primary" type="submit">
                Save Palette
              </Button>
            </ValidatorForm>
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
              name="colorName"
              value={colorName}
              onChange={this.handleChange}
              validators={['required', 'colorNameUnique', 'colorValueUnique']}
              errorMessages={[
                'Enter color name',
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

          <DraggableColorList
            axis="xy"
            distance={5}
            onSortEnd={this.onSortEnd}
            colors={colors}
            removeColor={this.removeColor}
            boxColorFocus={this.boxColorFocus}
          />
        </main>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm)
