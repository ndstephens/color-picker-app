import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/styles'
import styles from '../styles/ColorBoxStyles'

import { CopyToClipboard } from 'react-copy-to-clipboard'

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
        <div
          style={{ backgroundColor: background }}
          className={classes.ColorBox}
        >
          {/* COLOR NAME */}
          <div className={`${classes.colorName} ${classes.textColor}`}>
            {name}
          </div>

          {/* 'MORE' LINK */}
          {displayLink && (
            <Link
              to={`/palette/${paletteId}/${colorId.split('-')[0]}`}
              onClick={e => e.stopPropagation()}
            >
              <span className={`${classes.moreBtn} ${classes.textColor}`}>
                More
              </span>
            </Link>
          )}

          {/* COPY BUTTON - displays when hovered */}
          <button className={`${classes.copyBtn} ${classes.textColor}`}>
            Copy
          </button>

          {/* COPY-OVERLAY -- start */}
          <div
            style={{ backgroundColor: background }}
            className={`${classes.copyOverlay} ${copied &&
              classes.displayOverlay}`}
          />
          <div className={`${classes.copyMsg} ${copied && classes.displayMsg}`}>
            <h1 className={classes.copyMsgHeading}>Copied!</h1>
            <p className={`${classes.copyMsgText} ${classes.textColor}`}>
              {background}
            </p>
          </div>
          {/* COPY-OVERLAY -- end */}
        </div>
      </CopyToClipboard>
    )
  }
}

ColorBox.defaultProps = {
  displayLink: true,
}

export default withStyles(styles)(ColorBox)
