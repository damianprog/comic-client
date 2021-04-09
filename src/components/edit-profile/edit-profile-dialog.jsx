import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import './edit-profile-dialog.scss';
import { Button, DialogContent } from '@material-ui/core';
import ToggleHtmlScroll from '../../utils/toggle-html-scroll';
import { Close } from '@material-ui/icons';
import EditProfile from './edit-profile';

const EditProfileDialog = ({ open, closeDialog }) => {
  ToggleHtmlScroll(open);

  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      aria-labelledby="form-dialog-title"
      className="edit-profile-dialog"
      scroll="body"
      disableBackdropClick
    >
      <div className="close-container">
        <Close onClick={closeDialog} />
      </div>
      <DialogContent className="content">
        <EditProfile />
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
