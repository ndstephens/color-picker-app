import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import chroma from 'chroma-js'
import './ColorBox.css'

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
    const { name, background, paletteId, colorId, displayLink } = this.props
    const { copied } = this.state
    const isDarkBG = chroma(background).luminance() <= 0.1
    const isLightBG = chroma(background).luminance() >= 0.55

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
            <p className={isLightBG ? 'dark-text' : ''}>{background}</p>
          </div>
          {/* COPY-OVERLAY -- end */}

          <div className="copy-container">
            <div className="box-content">
              <span className={isDarkBG ? 'light-text' : ''}>{name}</span>
            </div>
            <button className={`copy-button ${isLightBG ? 'dark-text' : ''}`}>
              Copy
            </button>
          </div>

          {/* 'MORE' LINK */}
          {displayLink && (
            <Link
              to={`/palette/${paletteId}/${colorId.split('-')[0]}`}
              onClick={e => e.stopPropagation()}
            >
              <span className={`see-more ${isLightBG ? 'dark-text' : ''}`}>
                More
              </span>
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

export default ColorBox
