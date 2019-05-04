import React, { Component } from 'react'

import chroma from 'chroma-js'
import { ChromePicker } from 'react-color'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import Button from '@material-ui/core/Button'

class ColorPickerForm extends Component {
  componentDidMount() {
    ValidatorForm.addValidationRule('colorNameUnique', value =>
      this.props.colors.every(
        color => color.name.toLowerCase() !== value.toLowerCase().trim()
      )
    )
    ValidatorForm.addValidationRule('colorValueUnique', value =>
      this.props.colors.every(color => color.color !== this.props.currentColor)
    )
  }

  getTextColor = () =>
    chroma(this.props.currentColor).luminance() >= 0.55
      ? 'rgba(0, 0, 0, 0.65)'
      : 'white'

  render() {
    const {
      colorName,
      currentColor,
      paletteIsFull,
      handleInputChange,
      updateCurrentColor,
      addNewColor,
    } = this.props

    const textColor = this.getTextColor()

    return (
      <div>
        {/* COLOR PICKER */}
        <ChromePicker
          color={currentColor}
          onChangeComplete={updateCurrentColor}
        />

        <ValidatorForm onSubmit={addNewColor}>
          {/* COLOR NAME INPUT */}
          <TextValidator
            name="colorName"
            value={colorName}
            onChange={handleInputChange}
            validators={['required', 'colorNameUnique', 'colorValueUnique']}
            errorMessages={[
              'Enter color name',
              'Name already used',
              'Color already used',
            ]}
          />
          {/* ADD COLOR BUTTON */}
          <Button
            disabled={paletteIsFull}
            variant="contained"
            type="submit"
            color="primary"
            style={{
              backgroundColor: paletteIsFull ? 'lightgrey' : currentColor,
              color: paletteIsFull ? 'rgba(0, 0, 0, 0.65)' : textColor,
            }}
          >
            {paletteIsFull ? 'Palette Full' : 'Add Color'}
          </Button>
        </ValidatorForm>
      </div>
    )
  }
}

export default ColorPickerForm
