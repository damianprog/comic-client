import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import SignupForm from './signup-form';
import './sign-in-up.scss';
import { DialogContent } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const Signup = ({ open, closeSignup }) => {
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
  };

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log(result);
    },
    variables: {
      nickname: values.nickname,
      email: values.email,
      password: values.password,
      birthDate: values.birthDate,
    },
  });

  const getFullBirthDate = () => {
    return `${values.birthDay.padStart(2, '0')}-${values.birthMonth.padStart(
      2,
      '0'
    )}-${values.birthYear}`;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await setValues({
      ...values,
      birthDate: getFullBirthDate(),
    });

    addUser();
  };

  return (
    <Dialog
      open={open}
      onClose={closeSignup}
      aria-labelledby="form-dialog-title"
      className="signup"
      scroll="body"
    >
      <DialogTitle className="title" id="form-dialog-title">
        Create your account
      </DialogTitle>
      <DialogContent className="content">
        <SignupForm onChange={onChange} onSubmit={onSubmit} />
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
