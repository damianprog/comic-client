import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Close } from '@material-ui/icons';
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';
import './profile-avatar-background.scss';
import { IconButton } from '@material-ui/core';

const ProfileAvatarBackground = ({
  profileImage,
  backgroundImage,
  showControlIcons = false,
}) => {
  return (
    <div className="profile-avatar-background">
      <div
        style={{
          backgroundImage: `${
            showControlIcons
              ? 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),'
              : ''
          }
          url('${backgroundImage}')`,
        }}
        className="background-image"
      >
        {showControlIcons ? (
          <div className="control-icons">
            <IconButton color="inherit">
              <AddAPhotoOutlinedIcon />
            </IconButton>
            <IconButton color="inherit">
              <Close />
            </IconButton>
          </div>
        ) : null}
      </div>
      <div
        alt="profile picture"
        style={{
          backgroundImage: `${
            showControlIcons
              ? 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),'
              : ''
          }
          url('${profileImage}')`,
        }}
        className="avatar"
      >
        {showControlIcons ? (
          <div className="control-icons">
            <IconButton color="inherit">
              <AddAPhotoOutlinedIcon />
            </IconButton>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProfileAvatarBackground;
