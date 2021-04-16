import React from 'react';
import { Button } from '@material-ui/core';
import './edit-profile.scss';
import ProfileAvatarBackground from '../profile-page/profile-avatar-background';

const EditProfile = () => {
  return (
    <div className="edit-profile">
      <div className="header">
        <h2>Edit Profile</h2>
        <Button disableElevation variant="contained">
          Save
        </Button>
      </div>
      <ProfileAvatarBackground
        profileImage="http://i.annihil.us/u/prod/marvel/i/mg/8/b0/5e00da382a27d.jpg"
        backgroundImage="https://wallpapercave.com/wp/wp3787493.jpg"
        showControlIcons={true}
      />
    </div>
  );
};

export default EditProfile;
