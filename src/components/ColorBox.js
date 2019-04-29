import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
            <p>{background}</p>
          </div>
          {/* COPY-OVERLAY -- end */}

          <div className="copy-container">
            <div className="box-content">
              <span>{name}</span>
            </div>
            <button className="copy-button">Copy</button>
          </div>

          {/* 'MORE' LINK */}
          {displayLink && (
            <Link
              to={`/palette/${paletteId}/${colorId.split('-')[0]}`}
              onClick={e => e.stopPropagation()}
            >
              <span className="see-more">More</span>
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
