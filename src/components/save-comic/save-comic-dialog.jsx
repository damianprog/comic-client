import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import './save-comic-dialog.scss';
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import SaveComicCategoriesList from './save-comic-categories-list';
import SaveComicCreateCategory from './save-comic-create-category';

const SaveComicDialog = ({ comic, open, closeDialog }) => {
  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      aria-labelledby="form-dialog-title"
      className="save-comic-dialog"
      disableBackdropClick
    >
      <DialogTitle className="dialog-title">
        <span>Save at...</span>
        <IconButton className="close-btn" color="inherit" onClick={closeDialog}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent className="dialog-content">
        <SaveComicCategoriesList comic={comic} />
      </DialogContent>
      <DialogActions className="dialog-actions">
        <SaveComicCreateCategory comic={comic} onCreate={closeDialog} />
      </DialogActions>
    </Dialog>
  );
};

export default SaveComicDialog;
