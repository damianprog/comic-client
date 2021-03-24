import React, { Fragment } from 'react';
import './sign.scss';
import './signin.scss';
import { useMutation } from '@apollo/client';
import { Button, CircularProgress, Divider } from '@material-ui/core';
import gql from 'graphql-tag';

const Signin = ({ switchForm }) => {
  return (
    <div className="signin">
      <h2 className="title">Sign in to your account</h2>
      <form>
        <input placeholder="Email" name="email" type="email"></input>
        <input placeholder="Password" name="password" type="password"></input>
      </form>
      <Button
        type="submit"
        variant="contained"
        className="sign-button"
        form="signup-form"
      >
        {/* {loading ? (
            <CircularProgress color="inherit" size={30} />
          ) : ( */}
        <span>Sign In</span>
        {/* )} */}
      </Button>
      <Divider />
      <div className="create-button-container">
        <Button onClick={switchForm} variant="outlined">
          Create an account
        </Button>
      </div>
    </div>
  );
};

export default Signin;
