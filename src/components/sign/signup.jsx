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

  const [registerUser, { loading }] = useMutation(SIGNUP_USER, {
    update(_, result) {
      console.log('result.data.signup: ', result.data.signup);
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

      registerUser();
    }
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
      email
      createdAt
    }
  }
`;

const mapDispatchToProps = (dispatch) => ({
  setSignedUser: (user) => dispatch(setSignedUser(user)),
});

export default connect(null, mapDispatchToProps)(Signup);
