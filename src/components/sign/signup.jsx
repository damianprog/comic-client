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

const Signup = ({ open, closeSignup }) => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDay: '',
    birthMonth: '',
    birthYear: '',
    birthDate: '',
  });

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    const valueName = event.target.name.includes('birth')
      ? 'birthDate'
      : event.target.name;
    setErrors({ ...errors, [valueName]: null });
  };

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      console.log(result);
      closeSignup();
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

  const getFullBirthDate = () => {
    let fullBirthDate = '';

    if (
      values.birthDay !== '' &&
      values.birthMonth !== '' &&
      values.birthYear !== ''
    ) {
      fullBirthDate = `${values.birthDay.padStart(
        2,
        '0'
      )}-${values.birthMonth.padStart(2, '0')}-${values.birthYear}`;
    }

    return fullBirthDate;
  };

  const passwordsMatch = () => {
    const match = values.password === values.confirmPassword;
    if (!match) {
      setErrors({ ...errors, password: 'Passwords must match' });
    }

    return match;
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (passwordsMatch()) {
      await setValues({
        ...values,
        birthDate: getFullBirthDate(),
      });

      addUser();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={closeSignup}
      aria-labelledby="form-dialog-title"
      className="sign"
      scroll="body"
      disableBackdropClick
    >
      <div className="close-container">
        <Close onClick={closeSignup} />
      </div>
      <DialogTitle className="title" id="form-dialog-title">
        Create your account
      </DialogTitle>
      <DialogContent className="content">
        <SignupForm onChange={onChange} onSubmit={onSubmit} errors={errors} />
        <Button
          disabled={loading}
          type="submit"
          variant="contained"
          className="create-button"
          form="signup-form"
        >
          {loading ? (
            <CircularProgress color="inherit" size={30} />
          ) : (
            <span>Create Account</span>
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

const REGISTER_USER = gql`
  mutation signUp(
    $nickname: String!
    $email: String!
    $password: String!
    $birthDate: String!
  ) {
    signUp(
      signUpInput: {
        nickname: $nickname
        email: $email
        password: $password
        birthDate: $birthDate
      }
    ) {
      id
      nickname
      email
      createdAt
      token
    }
  }
`;

export default Signup;
