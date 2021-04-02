import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import './sign.scss';
import { DialogContent } from '@material-ui/core';
import Signin from './signin';
import Signup from './signup';
import { Close } from '@material-ui/icons';

const SignDialog = ({ open, closeDialog, form = 'signin', switchForm }) => {
  const toggleHtmlScroll = () => {
    document.documentElement.style.overflow = open ? 'hidden' : 'auto';
  };

  toggleHtmlScroll();

  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      aria-labelledby="form-dialog-title"
      className="sign"
      scroll="body"
      disableBackdropClick
    >
      <div className="close-container">
        <Close onClick={closeDialog} />
      </div>
      <DialogContent className="content">
        {form === 'signin' ? (
          <Signin switchForm={switchForm} onSign={closeDialog} />
        ) : (
          <Signup switchForm={switchForm} onSign={closeDialog} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SignDialog;