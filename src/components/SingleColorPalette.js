import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/styles'

import Navbar from './Navbar'
import ColorBox from './ColorBox'
import PaletteFooter from './PaletteFooter'

const styles = {
  Palette: {
    height: '100vh',
    // display: 'flex',
    // flexDirection: 'column',
  },
  Palette__colors: {
    height: '90%',
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridAutoRows: '1fr',
  },
  goBackBox: {
    position: 'relative',
    backgroundColor: 'black',
  },
  goBackBtn: {
    color: 'white',
    width: '100px',
    height: '30px',
    position: 'absolute',
    display: 'inline-block',
    top: '50%',
    left: '50%',
    marginLeft: '-50px',
    marginTop: '-15px',
    textAlign: 'center',
    outline: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    fontSize: '1rem',
    lineHeight: '30px',
    textTransform: 'uppercase',
    border: 'none',
    cursor: 'pointer',
    opacity: '1',
    textDecoration: 'none',
  },
}

class SingleColorPalette extends Component {
  constructor(props) {
    super(props)
    this.state = { colorFormat: 'hex' }
    this._shades = this.gatherShades(this.props.palette, this.props.colorId)
  }

  gatherShades = (palette, colorId) => {
    const shades = Object.values(palette.colors).map(shadeList => {
      return shadeList.find(shade => shade.id.split('-')[0] === colorId)
    })
    return shades.slice(1) // remove first value
  }

  colorFormatChange = e => {
    this.setState({ colorFormat: e.target.value })
  }

  render() {
    const { paletteName, id, emoji } = this.props.palette
    const { classes } = this.props
    const { colorFormat } = this.state

    const shadeBoxes = this._shades.map(shade => (
      <ColorBox
        key={shade.id}
        name={shade.name}
        background={shade[colorFormat]}
        displayLink={false}
      />
    ))

    return (
      <div className={classes.Palette}>
        <Navbar
          colorFormat={colorFormat}
          colorFormatChange={this.colorFormatChange}
          displayLevelSlider={false}
        />

        <div className={classes.Palette__colors}>
          {shadeBoxes}
          <div className={classes.goBackBox}>
            <Link to={`/palette/${id}`} className={classes.goBackBtn}>
              Go Back
            </Link>
          </div>
        </div>

        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    )
  }
}

export default withStyles(styles)(SingleColorPalette)
