import React from 'react';
import './date-selector.scss';

const DateSelector = ({ onChange, error }) => {
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
    <div className="date-selector">
      <select
        className={`${error ? 'error' : ''} select-day`}
        name="day"
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
        className={`${error ? 'error' : ''} select-month`}
        name="month"
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
        className={`${error ? 'error' : ''} select-year`}
        name="year"
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
  );
};

export default DateSelector;
