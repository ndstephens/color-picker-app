import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import chroma from 'chroma-js'
import { withStyles } from '@material-ui/styles'

import { CopyToClipboard } from 'react-copy-to-clipboard'

const styles = {
  ColorBox: {
    position: 'relative',
    cursor: 'pointer',
    '&:hover button': {
      opacity: '1',
    },
  },
  textColor: {
    color: props =>
      chroma(props.background).luminance() >= 0.55
        ? 'rgba(0, 0, 0, 0.65)'
        : 'white',
  },
  colorName: {
    padding: '10px',
    width: '100%',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px',
    position: 'absolute',
    left: '0',
    top: '0',
  },
  copyBtn: {
    position: 'absolute',
    display: 'inline-block',
    top: '50%',
    left: '50%',
    marginLeft: '-50px',
    marginTop: '-15px',
    width: '100px',
    height: '30px',
    textAlign: 'center',
    outline: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    fontSize: '1rem',
    lineHeight: '30px',
    textTransform: 'uppercase',
    border: 'none',
    cursor: 'pointer',
    opacity: '0',
    transition: 'opacity 500ms',
  },
  moreBtn: {
    position: 'absolute',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    border: 'none',
    width: '60px',
    height: '30px',
    textAlign: 'center',
    lineHeight: '30px',
    textTransform: 'uppercase',
  },
  copyMsgHeading: {
    fontWeight: '400',
    textShadow: '1px 2px #000',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: '100%',
    textAlign: 'center',
    marginBottom: '0',
    padding: '1rem',
    textTransform: 'uppercase',
  },
  copyMsgText: {
    fontSize: '2rem',
    fontWeight: '100',
  },
  copyOverlay: {
    opacity: '0',
    zIndex: '0',
    width: '100%',
    height: '100%',
    transform: 'scale(0)',
    transition: 'transform 500ms ease-in',
  },
  displayOverlay: {
    opacity: '1',
    transform: 'scale(15)',
    zIndex: '10',
    position: 'absolute',
  },
  copyMsg: {
    position: 'fixed',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '4rem',
    transform: 'scale(0)',
    opacity: '0',
    color: 'white',
  },
  displayMsg: {
    opacity: '1',
    transform: 'scale(1)',
    zIndex: '20',
    transition: 'all 250ms ease-in 200ms',
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
