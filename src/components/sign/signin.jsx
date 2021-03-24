import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import SignupForm from './signup-form';
import './sign.scss';
import { DialogContent } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import { Button, CircularProgress } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import gql from 'graphql-tag';

const Signin = ({ open, closeSignin }) => {
  return (
    <Dialog
      open={open}
      onClose={closeSignin}
      aria-labelledby="form-dialog-title"
      className="sign"
      scroll="body"
      disableBackdropClick
    >
      <div className="close-container">
        <Close onClick={closeSignin} />
      </div>
      <DialogContent className="content">
        <form>
          <input placeholder="Email" name="email" type="email"></input>
          <input placeholder="Password" name="password" type="password"></input>
        </form>
        <Button
          type="submit"
          variant="contained"
          className="create-button"
          form="signup-form"
        >
          {/* {loading ? (
            <CircularProgress color="inherit" size={30} />
          ) : ( */}
          <span>Sign In</span>
          {/* )} */}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default Signin;
