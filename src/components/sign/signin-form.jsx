import React from 'react';

const SigninForm = ({ onChange, onSubmit, errors = {} }) => {
  const onInputChange = (event) => {
    const keyValue = { [event.target.name]: event.target.value };
    onChange(keyValue);
  };

  return (
    <form id="signin-form" onSubmit={onSubmit}>
      {errors.email && <p>{errors.email}</p>}
      <input
        placeholder="Email"
        name="email"
        type="email"
        className={errors.email ? 'error' : ''}
        onChange={onInputChange}
        required
      ></input>
      {errors.password && <p>{errors.password}</p>}
      <input
        placeholder="Password"
        name="password"
        type="password"
        className={errors.password ? 'error' : ''}
        onChange={onInputChange}
        required
      ></input>
    </form>
  );
};

export default SigninForm;
