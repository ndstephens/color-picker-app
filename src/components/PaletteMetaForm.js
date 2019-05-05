import React, { Component } from 'react'
import 'emoji-mart/css/emoji-mart.css'

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { Picker } from 'emoji-mart'

import Button from '@material-ui/core/Button'
// import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

class FormDialog extends Component {
  state = {
    open: true,
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

  // handleClickOpen = () => {
  //   this.setState({ open: true })
  // }

  // handleClose = () => {
  //   this.setState({ open: false })
  // }

  render() {
    const { paletteFormSubmit, handleHideForm } = this.props
    const { newPaletteName } = this.state

    return (
      <Dialog
        open={this.state.open}
        // onClose={this.handleClose}
        onClose={handleHideForm}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
        <ValidatorForm onSubmit={() => paletteFormSubmit(newPaletteName)}>
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

        {/* EMOJI PICKER */}
        <Picker />
      </Dialog>
    )
  }
}

export default FormDialog
