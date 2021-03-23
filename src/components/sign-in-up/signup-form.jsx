import React from 'react';
import { Button } from '@material-ui/core';

const SignupForm = ({ onChange, onSubmit }) => {
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
    <form onSubmit={onSubmit}>
      <input
        placeholder="Nickname"
        name="nickname"
        type="text"
        onChange={onChange}
      ></input>
      <input
        placeholder="Email"
        name="email"
        type="email"
        onChange={onChange}
      ></input>
      <input
        type="password"
        placeholder="Password"
        name="password"
        onChange={onChange}
      ></input>
      <input
        type="password"
        placeholder="Confirm Password"
        name="confirmPassword"
        onChange={onChange}
      ></input>
      <div className="select-birth-date">
        <select className="select-day" name="birthDay" onChange={onChange}>
          {getDays().map((dayNum) => (
            <option key={`dayNum${dayNum}`} value={dayNum}>
              {dayNum}
            </option>
          ))}
        </select>
        <select className="select-month" name="birthMonth" onChange={onChange}>
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
        <select className="select-years" name="birthYear" onChange={onChange}>
          {getYears().map((year) => (
            <option key={`year${year}`}>{year}</option>
          ))}
        </select>
      </div>
      <Button type="submit" variant="contained" className="create-button">
        Create Account
      </Button>
    </form>
  );
};

export default SignupForm;
