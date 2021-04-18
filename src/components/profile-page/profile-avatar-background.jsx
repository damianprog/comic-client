import React, { useState, useRef } from 'react';
import { Close } from '@material-ui/icons';
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';
import './profile-avatar-background.scss';
import { IconButton } from '@material-ui/core';

const ProfileAvatarBackground = ({
  profileImage,
  backgroundImage,
  showControlIcons = false,
}) => {
  const [currentBackgroundImage, setCurrentBackgroundImage] = useState(
    backgroundImage
  );

  const bgImageInput = useRef(null);

  const handleBgImageInputClick = () => {
    bgImageInput.current.click();
  };

  const handleBgImageInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setCurrentBackgroundImage(reader.result);
      };
    }
  };

  return (
    <div className="profile-avatar-background">
      <div
        style={{
          backgroundImage: `${
            showControlIcons
              ? 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),'
              : ''
          }
          url('${currentBackgroundImage}')`,
        }}
        className="background-image"
      >
        {showControlIcons ? (
          <div className="control-icons">
            <IconButton onClick={handleBgImageInputClick} color="inherit">
              <AddAPhotoOutlinedIcon />
            </IconButton>
            <input
              className="photo-input"
              type="file"
              onChange={handleBgImageInputChange}
              ref={bgImageInput}
            />
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
