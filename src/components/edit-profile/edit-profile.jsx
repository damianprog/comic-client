import React from 'react';
import { Button, IconButton } from '@material-ui/core';
import './edit-profile.scss';
import { Close } from '@material-ui/icons';
import ProfileAvatarBackground from '../profile-page/profile-avatar-background';
import DateSelector from '../date-selector/date-selector';

const EditProfile = ({ showClose, close }) => {
  return (
    <div className="edit-profile">
      <div className="header">
        <div className="close-label">
          {showClose ? (
            <IconButton color="inherit" onClick={close}>
              <Close />
            </IconButton>
          ) : null}
          <h2>Edit Profile</h2>
        </div>
        <Button disableElevation variant="contained" className="save">
          Save
        </Button>
      </div>
      <div className="content">
        <ProfileAvatarBackground
          profileImage="http://i.annihil.us/u/prod/marvel/i/mg/8/b0/5e00da382a27d.jpg"
          backgroundImage="https://wallpapercave.com/wp/wp3787493.jpg"
          showControlIcons
        />
        <form>
          <input placeholder="Name"></input>
          <input placeholder="Interests"></input>
          <textarea placeholder="About Me" className="about"></textarea>
          <p className="outer-label">Birth Date</p>
          <DateSelector></DateSelector>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
