import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { connectTo } from '../../utils/generic'
import * as actions from '../../actions/editor'

export default connectTo(
  state => state.editor,
  actions,
  ({ changeLink, exitLinkPrompt, submitLink }) => (
    <Dialog
      open={true}
      onClose={exitLinkPrompt}
      aria-labelledby="form-dialog-link"
    >
      <DialogTitle id="form-dialog-link">Enter the URL</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="url"
          label="URL"
          type="url"
          style={{ minWidth: 320 }}
          fullWidth
          onChange={({ target: { value } }) => changeLink(value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={exitLinkPrompt} color='primary'>
          Cancel
        </Button>
        <Button onClick={submitLink} color='primary'>
          Submit
        </Button>
      </DialogActions>      
    </Dialog>
  )
)