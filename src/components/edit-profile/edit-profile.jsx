import React from 'react';
import { Button } from '@material-ui/core';
import './edit-profile.scss';

const EditProfile = () => {
  return (
    <div className="edit-profile">
      <div className="header">
        <h2>Edit Profile</h2>
        <Button disableElevation variant="contained">
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditProfile;
