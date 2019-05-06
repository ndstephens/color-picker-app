import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/styles'
import styles from '../styles/PaletteListStyles'

import { CSSTransition, TransitionGroup } from 'react-transition-group'
import MiniPalette from './MiniPalette'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import blue from '@material-ui/core/colors/blue'
import red from '@material-ui/core/colors/red'

class PaletteList extends Component {
  state = { dialogIsOpen: false, deletePaletteId: '' }

  goToPalette = id => {
    this.props.history.push(`/palette/${id}`)
  }

  handleDisplayDialog = id => {
    this.setState({ dialogIsOpen: true, deletePaletteId: id })
  }

  handleHideDialog = () =>
    this.setState({ dialogIsOpen: false, deletePaletteId: '' })

  handleConfirmDelete = () => {
    this.props.deletePalette(this.state.deletePaletteId)
    this.handleHideDialog()
  }

  render() {
    const { classes, palettes } = this.props
    const { dialogIsOpen } = this.state

    const paletteList = palettes.map(palette => (
      <CSSTransition key={palette.id} classNames="fade" timeout={500}>
        <MiniPalette
          {...palette}
          goToPalette={this.goToPalette}
          handleDisplayDialog={this.handleDisplayDialog}
          key={palette.id}
        />
      </CSSTransition>
    ))

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>React Colors</h1>
            <Link to="/palette/new">Create Palette</Link>
          </nav>
          <TransitionGroup className={classes.palettes}>
            {paletteList}
          </TransitionGroup>
        </div>

        {/* CONFIRM DELETION DIALOG */}
        <Dialog
          open={dialogIsOpen}
          aria-labelledby="delete-dialog"
          onClose={this.handleHideDialog}
        >
          <DialogTitle id="delete-dialog">Confirm Deletion...</DialogTitle>
          <List>
            {/* DELETE BUTTON */}
            <ListItem button onClick={this.handleConfirmDelete}>
              <ListItemAvatar>
                <Avatar
                  style={{ backgroundColor: blue[100], color: blue[600] }}
                >
                  <CheckIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Delete" />
            </ListItem>
            {/* CANCEL BUTTON */}
            <ListItem button onClick={this.handleHideDialog}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                  <CloseIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Cancel" />
            </ListItem>
          </List>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(PaletteList)
