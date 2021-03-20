import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import './sign-in-up.scss';
import { DialogContent, Button } from '@material-ui/core';

const Signup = ({ open, closeSignup }) => {
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
        <form>
          <input placeholder="Nickname"></input>
          <input placeholder="Email"></input>
          <input type="password" placeholder="Password"></input>
          <input type="password" placeholder="Confirm Password"></input>
          <div className="select-birth-date">
            <select className="select-day" name="day">
              {getDays().map((dayNum) => (
                <option key={`dayNum${dayNum}`} value={dayNum}>
                  {dayNum}
                </option>
              ))}
            </select>
            <select className="select-month">
              <option>Jan</option>
              <option>Feb</option>
              <option>Mar</option>
              <option>Apr</option>
              <option>May</option>
              <option>Jun</option>
              <option>Jul</option>
              <option>Aug</option>
              <option>Sep</option>
              <option>Oct</option>
              <option>Nov</option>
              <option>Dec</option>
            </select>
            <select className="select-years">
              {getYears().map((year) => (
                <option key={`year${year}`}>{year}</option>
              ))}
            </select>
          </div>
          <Button type="submit" variant="contained" className="create-button">
            Create Account
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Signup;
