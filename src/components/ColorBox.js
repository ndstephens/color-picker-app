import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import chroma from 'chroma-js'
import { withStyles } from '@material-ui/styles'
import './ColorBox.css'

import { CopyToClipboard } from 'react-copy-to-clipboard'

const styles = {
  textColor: {
    color: props =>
      chroma(props.background).luminance() >= 0.55
        ? 'rgba(0, 0, 0, 0.65)'
        : 'white',
  },
}

class ColorBox extends Component {
  state = {
    copied: false,
  }

  changeCopyState = () => {
    this.setState({ copied: true }, () => {
      setTimeout(() => {
        this.setState({ copied: false })
      }, 1800)
    })
  }

  render() {
    // prettier-ignore
    const { name, background, paletteId, colorId, displayLink, classes } = this.props
    const { copied } = this.state

    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div style={{ backgroundColor: background }} className="ColorBox">
          {/* COPY-OVERLAY -- start */}
          <div
            style={{ backgroundColor: background }}
            className={`copy-overlay ${copied ? 'show' : ''}`}
          />
          <div className={`copy-msg ${copied ? 'show' : ''}`}>
            <h1>copied!</h1>
            <p className={classes.textColor}>{background}</p>
          </div>
          {/* COPY-OVERLAY -- end */}

          <div className="copy-container">
            <div className="box-content">
              <span className={classes.textColor}>{name}</span>
            </div>
            <button className={`copy-button ${classes.textColor}`}>Copy</button>
          </div>

          {/* 'MORE' LINK */}
          {displayLink && (
            <Link
              to={`/palette/${paletteId}/${colorId.split('-')[0]}`}
              onClick={e => e.stopPropagation()}
            >
              <span className={`see-more ${classes.textColor}`}>More</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    )
  }
}

ColorBox.defaultProps = {
  displayLink: true,
}

export default withStyles(styles)(ColorBox)
