import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import './edit-profile-dialog.scss';
import { DialogContent } from '@material-ui/core';
import ToggleHtmlScroll from '../../utils/toggle-html-scroll';
import EditProfile from './edit-profile';

const EditProfileDialog = ({ profileUser, open, closeDialog }) => {
  ToggleHtmlScroll(open);

  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      aria-labelledby="form-dialog-title"
      className="edit-profile-dialog"
      disableBackdropClick
    >
      <DialogContent className="dialog-content">
        <EditProfile profileUser={profileUser} showClose close={closeDialog} />
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
