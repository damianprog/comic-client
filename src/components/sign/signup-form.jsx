import React from 'react';
import DateSelector from '../date-selector/date-selector';
import './signup-form.scss';

const SignupForm = ({ onChange, onSubmit, errors = {} }) => {
  const onBirthDateChange = (event) => {
    event.target.name = `birth${event.target.name[0].toUpperCase()}${event.target.name.slice(
      1
    )}`;

    onChange(event);
  };

  return (
    <form id="signup-form" onSubmit={onSubmit}>
      {errors.nickname && <p>{errors.nickname}</p>}
      <input
        placeholder="Nickname"
        name="nickname"
        type="text"
        className={errors.nickname ? 'error' : ''}
        onChange={onChange}
        required
      ></input>
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
        type="password"
        placeholder="Password"
        name="password"
        className={errors.password ? 'error' : ''}
        onChange={onChange}
        required
      ></input>
      <input
        type="password"
        placeholder="Confirm Password"
        name="confirmPassword"
        className={errors.password ? 'error' : ''}
        onChange={onChange}
        required
      ></input>
      {errors.birthDate && <p>{errors.birthDate}</p>}
      <p className="outer-label">Birth Date</p>
      <DateSelector
        onChange={onBirthDateChange}
        error={errors.birthDate}
      ></DateSelector>
    </form>
  );
};

export default SignupForm;
