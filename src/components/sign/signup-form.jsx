import React from 'react';
import './signup-form.scss';

const SignupForm = ({ onChange, onSubmit, errors = {} }) => {
  const getDays = () => {
    const days = [];
    for (let i = 1; i <= 31; i++) {
      days.push(i);
    }

    return days;
  };

  const getYears = () => {
    const years = [];
    const maxYear = new Date().getFullYear();
    const minYear = maxYear - 120;

    for (let i = maxYear; i >= minYear; i--) {
      years.push(i);
    }

    return years;
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
      <div className="select-birth-date">
        <select
          className={`${errors.birthDate ? 'error' : ''} select-day`}
          name="birthDay"
          onChange={onChange}
          defaultValue={''}
          required
        >
          <option value="" disabled hidden>
            Day
          </option>
          {getDays().map((dayNum) => (
            <option key={`dayNum${dayNum}`} value={dayNum}>
              {dayNum}
            </option>
          ))}
        </select>
        <select
          className={`${errors.birthDate ? 'error' : ''} select-month`}
          name="birthMonth"
          onChange={onChange}
          defaultValue={''}
          required
        >
          <option value="" disabled hidden>
            Month
          </option>
          <option value="1">Jan</option>
          <option value="2">Feb</option>
          <option value="3">Mar</option>
          <option value="4">Apr</option>
          <option value="5">May</option>
          <option value="6">Jun</option>
          <option value="7">Jul</option>
          <option value="8">Aug</option>
          <option value="9">Sep</option>
          <option value="10">Oct</option>
          <option value="11">Nov</option>
          <option value="12">Dec</option>
        </select>
        <select
          className={`${errors.birthDate ? 'error' : ''} select-year`}
          name="birthYear"
          onChange={onChange}
          defaultValue={''}
          required
        >
          <option value="" disabled hidden>
            Year
          </option>
          {getYears().map((year) => (
            <option key={`year${year}`}>{year}</option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default SignupForm;
