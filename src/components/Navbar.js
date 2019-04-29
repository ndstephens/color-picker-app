import React, { Component } from 'react'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Slider from 'rc-slider'

import 'rc-slider/assets/index.css'
import './Navbar.css'

class Navbar extends Component {
  state = { snackbarIsOpen: false }

  colorFormatChange = e => {
    this.props.colorFormatChange(e)
    this.setState({ snackbarIsOpen: true })
  }

  closeSnackbar = () => this.setState({ snackbarIsOpen: false })

  render() {
    const { level, changeLevel, colorFormat } = this.props

    return (
      <header className="Navbar">
        {/* LOGO */}
        <div className="logo">
          <a href="#">reactcolorpicker</a>
        </div>

        {/* LEVEL SLIDER */}
        <div className="slider-container">
          <span>Level: {level}</span>
          <div className="slider">
            <Slider
              defaultValue={level}
              min={100}
              max={900}
              step={100}
              onAfterChange={changeLevel}
            />
          </div>
        </div>

        {/* COLOR FORMAT SELECTOR */}
        <div className="select-container">
          <Select value={colorFormat} onChange={this.colorFormatChange}>
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255,255,255,1.0)</MenuItem>
          </Select>
        </div>

        {/* SNACKBAR (display on color format update) */}
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={this.state.snackbarIsOpen}
          autoHideDuration={3000}
          message={
            <span id="snackbar-id">
              Color format updated - {colorFormat.toUpperCase()}
            </span>
          }
          ContentProps={{ 'aria-describedby': 'snackbar-id' }}
          onClose={this.closeSnackbar}
          action={[
            <IconButton
              onClick={this.closeSnackbar}
              color="inherit"
              key="close"
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </header>
    )
  }
}

export default Navbar
