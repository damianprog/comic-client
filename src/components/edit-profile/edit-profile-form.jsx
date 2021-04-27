import React from 'react';
import DateSelector from '../date-selector/date-selector';

import './edit-profile-form.scss';

const EditProfileForm = ({ onChange, values }) => {
  const onInputChange = (event) => {
    const keyValue = { [event.target.name]: event.target.value };
    onChange(keyValue);
  };

  const onBirthDateChange = (date) => {
    const keyValue = { birthDate: date.toString() };
    onChange(keyValue);
  };

  const { nickname, birthDate, about, interests } = values;

  return (
    <form className="edit-profile-form">
      <input
        value={nickname}
        onInput={onInputChange}
        name="nickname"
        placeholder="Nickname"
      ></input>
      <input
        value={interests}
        onInput={onInputChange}
        name="interests"
        placeholder="Interests"
      ></input>
      <textarea
        value={about}
        onInput={onInputChange}
        name="about"
        placeholder="About Me"
        className="about"
      ></textarea>
      <p className="outer-label">Birth Date</p>
      <DateSelector
        onChange={onBirthDateChange}
        defaultDate={new Date(parseInt(birthDate))}
      ></DateSelector>
    </form>
  );
};

export default EditProfileForm;
