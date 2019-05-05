import React, { Component } from 'react'
import 'emoji-mart/css/emoji-mart.css'

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { Picker } from 'emoji-mart'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

class FormDialog extends Component {
  state = {
    stage: 'form',
    newPaletteName: '',
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('paletteNameUnique', value =>
      this.props.palettes.every(
        palette =>
          palette.paletteName.toLowerCase() !== value.toLowerCase().trim()
      )
    )
  }

  handleInputChange = e => this.setState({ [e.target.name]: e.target.value })

  showEmojiPicker = () => {
    this.setState({ stage: 'emoji' })
  }

  savePalette = emoji => {
    this.props.paletteFormSubmit(this.state.newPaletteName, emoji.native)
  }

  render() {
    const { handleHideForm } = this.props
    const { newPaletteName } = this.state

    return (
      <>
        {/* EMOJI PICKER */}
        <Dialog
          open={this.state.stage === 'emoji'}
          onClose={handleHideForm}
          aria-labelledby="emoji-dialog-title"
        >
          <DialogTitle id="emoji-dialog-title">
            Choose a Palette Emoji
          </DialogTitle>
          <Picker onSelect={this.savePalette} />
        </Dialog>

        {/* PALETTE NAME */}
        <Dialog
          open={this.state.stage === 'form'}
          onClose={handleHideForm}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Choose a Palette Name
          </DialogTitle>
          <ValidatorForm onSubmit={this.showEmojiPicker}>
            <DialogContent>
              <DialogContentText>
                Please enter a unique name for your color palette
              </DialogContentText>
              {/* PALETTE NAME INPUT */}
              <TextValidator
                label="Palette Name"
                name="newPaletteName"
                value={newPaletteName}
                onChange={this.handleInputChange}
                validators={['required', 'paletteNameUnique']}
                errorMessages={['Enter palette name', 'Name already used']}
                fullWidth
                margin="normal"
                autoFocus
              />
            </DialogContent>
            <DialogActions>
              {/* CANCEL BUTTON */}
              <Button onClick={handleHideForm} color="primary">
                Cancel
              </Button>
              {/* SAVE PALETTE BUTTON */}
              <Button variant="contained" color="primary" type="submit">
                Save Palette
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </>
    )
  }
}

export default FormDialog
