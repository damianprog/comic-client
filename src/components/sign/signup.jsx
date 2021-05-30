import React, { useState } from 'react';
import SignupForm from './signup-form';
import { useMutation } from '@apollo/client';
import { Button, CircularProgress } from '@material-ui/core';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { setSignedUser } from '../redux/user/user-actions';

import './sign.scss';
import './signup.scss';

const Signup = ({ switchForm, setSignedUser, onSign }) => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
  });

  const onChange = (keyValue) => {
    setValues({ ...values, ...keyValue });
    const key = Object.keys(keyValue)[0];
    setErrors({ ...errors, [key]: null });
  };

  const [registerUser, { loading }] = useMutation(SIGNUP_USER, {
    update(_, result) {
      setSignedUser(result.data.signup);
      onSign();
    },
    onError(err) {
      console.log(err);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: {
      nickname: values.nickname,
      email: values.email,
      password: values.password,
      birthDate: values.birthDate,
    },
  });

  const passwordsMatch = () => {
    const match = values.password === values.confirmPassword;
    if (!match) {
      setErrors({ ...errors, password: 'Passwords must match' });
    }

    return match;
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (passwordsMatch()) registerUser();
  };

  return (
    <div className="signup">
      <h2 className="title">Create your account</h2>
      <SignupForm onChange={onChange} onSubmit={onSubmit} errors={errors} />
      <Button
        disabled={loading}
        type="submit"
        variant="contained"
        className="sign-button"
        form="signup-form"
      >
        {loading ? (
          <CircularProgress color="inherit" size={30} />
        ) : (
          <span>Create Account</span>
        )}
      </Button>
      <p className="signin-info">
        Already have an account? <b onClick={switchForm}>Sign In</b>
      </p>
    </div>
  );
};

const SIGNUP_USER = gql`
  mutation signup(
    $nickname: String!
    $email: String!
    $password: String!
    $birthDate: String!
  ) {
    signup(
      signupInput: {
        nickname: $nickname
        email: $email
        password: $password
        birthDate: $birthDate
      }
    ) {
      id
      nickname
      birthDate
      email
      createdAt
      userDetails {
        id
        about
        interests
        profileImage
        backgroundImage
      }
    }
  }
`;

const mapDispatchToProps = (dispatch) => ({
  setSignedUser: (user) => dispatch(setSignedUser(user)),
});

export default connect(null, mapDispatchToProps)(Signup);
