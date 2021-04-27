import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, CircularProgress, Divider } from '@material-ui/core';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { setSignedUser } from '../redux/user/user-actions';

import './sign.scss';
import './signin.scss';
import SigninForm from './signin-form';

const Signin = ({ switchForm, setSignedUser, onSign }) => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const onChange = (keyValue) => {
    setValues({ ...values, ...keyValue });
    const key = Object.keys(keyValue)[0];
    setErrors({ ...errors, [key]: null });
  };

  const [loginUser, { loading }] = useMutation(SIGNIN_USER, {
    update(_, result) {
      setSignedUser(result.data.signin);
      onSign();
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.exception.errors);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: {
      nickname: values.nickname,
      email: values.email,
      password: values.password,
      birthDate: values.birthDate,
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    loginUser();
  };

  return (
    <div className="signin">
      <h2 className="title">Sign in to your account</h2>
      {errors.general && (
        <div className="errors-info">
          {errors.general && <p>{errors.general}</p>}
        </div>
      )}
      <SigninForm onChange={onChange} onSubmit={onSubmit} errors={errors} />
      <Button
        disabled={loading}
        type="submit"
        variant="contained"
        className="sign-button"
        form="signin-form"
      >
        {loading ? (
          <CircularProgress color="inherit" size={30} />
        ) : (
          <span>Sign In</span>
        )}
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

const SIGNIN_USER = gql`
  mutation signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      nickname
      email
      createdAt
    }
  }
`;

const mapDispatchToProps = (dispatch) => ({
  setSignedUser: (user) => dispatch(setSignedUser(user)),
});

export default connect(null, mapDispatchToProps)(Signin);
