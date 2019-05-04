import React, { Component } from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import arrayMove from 'array-move'

import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

import PaletteFormNav from './PaletteFormNav'
import ColorPickerForm from './ColorPickerForm'
import DraggableColorList from './DraggableColorList'

const drawerWidth = 340

const styles = theme => ({
  root: {
    display: 'flex',
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
    colorName: '',
    currentColor: '#000',
    colors: this.props.palettes[0].colors,
  }

  handleDrawerOpen = () => this.setState({ open: true })

  handleDrawerClose = () => this.setState({ open: false })

  clearPalette = () => this.setState({ colors: [] })

  genRandomColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padEnd(6, '0')
    this.setState({ currentColor: `#${randomColor}` })
  }

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

  handleInputChange = e => this.setState({ [e.target.name]: e.target.value })

  paletteFormSubmit = newPaletteName => {
    const paletteName = newPaletteName.trim()
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
    const { classes, maxColors, palettes } = this.props
    const { open, colorName, currentColor, colors } = this.state

    const paletteIsFull = colors.length >= maxColors

    return (
      <div className={classes.root}>
        {/* NAVBAR COMPONENT */}
        <PaletteFormNav
          open={open}
          palettes={palettes}
          paletteFormSubmit={this.paletteFormSubmit}
          handleDrawerOpen={this.handleDrawerOpen}
        />

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
          {/* CLOSE DRAWER BUTTON/ICON */}
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>

          <Divider />

          <Typography variant="h4">Design Your Palette</Typography>

          <div>
            {/* CLEAR PALETTE BUTTON */}
            <Button
              variant="contained"
              color="secondary"
              onClick={this.clearPalette}
            >
              Clear Palette
            </Button>
            {/* RANDOM COLOR BUTTON */}
            <Button
              variant="contained"
              color="primary"
              onClick={this.genRandomColor}
            >
              Random Color
            </Button>
          </div>

          {/* COLOR PICKER COMPONENT */}
          <ColorPickerForm
            colors={colors}
            colorName={colorName}
            currentColor={currentColor}
            paletteIsFull={paletteIsFull}
            handleInputChange={this.handleInputChange}
            updateCurrentColor={this.updateCurrentColor}
            addNewColor={this.addNewColor}
          />
        </Drawer>
        {/* -- END DRAWER -- */}

        {/* THE COLOR PALETTE */}
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

NewPaletteForm.defaultProps = {
  maxColors: 20,
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm)
