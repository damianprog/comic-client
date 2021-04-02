import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, CircularProgress, Divider } from '@material-ui/core';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { setSignedUser } from '../redux/user/user-actions';

import './sign.scss';
import './signin.scss';

const Signin = ({ switchForm, setSignedUser, onSign }) => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: null });
  };

  const [loginUser, { loading }] = useMutation(SIGNIN_USER, {
    update(_, result) {
      console.log(result.data.signin);
      setSignedUser(result.data.signin.user);
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
      <form onSubmit={onSubmit}>
        {errors.email && <p>{errors.email}</p>}
        <input
          placeholder="Email"
          name="email"
          type="email"
          className={errors.email ? 'error' : ''}
          onChange={onChange}
          required
        ></input>
        {errors.password && <p>{errors.password}</p>}
        <input
          placeholder="Password"
          name="password"
          type="password"
          className={errors.password ? 'error' : ''}
          onChange={onChange}
          required
        ></input>
        <Button type="submit" variant="contained" className="sign-button">
          {loading ? (
            <CircularProgress color="inherit" size={30} />
          ) : (
            <span>Sign In</span>
          )}
        </Button>
      </form>
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
      user {
        id
        nickname
        email
        createdAt
      }
      token
    }
  }
`;

const mapDispatchToProps = (dispatch) => ({
  setSignedUser: (user) => dispatch(setSignedUser(user)),
});

export default connect(null, mapDispatchToProps)(Signin);