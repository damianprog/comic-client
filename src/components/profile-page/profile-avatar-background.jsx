import React, { useState, useEffect } from 'react';
import { Close } from '@material-ui/icons';
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';
import './profile-avatar-background.scss';
import backgroundPlaceholder from '../../assets/placeholders/background-placeholder.png';
import profilePlaceholder from '../../assets/placeholders/profile-placeholder.png';

const ProfileAvatarBackground = ({
  onChange,
  profileImage,
  backgroundImage,
  showControlIcons = false,
}) => {
  const [currentBackgroundImage, setCurrentBackgroundImage] = useState('');
  const [currentProfileImage, setCurrentProfileImage] = useState('');

  useEffect(() => {
    setCurrentBackgroundImage(
      backgroundImage ? backgroundImage : backgroundPlaceholder
    );
    setCurrentProfileImage(profileImage ? profileImage : profilePlaceholder);
  }, [profileImage, backgroundImage]);

  const onImageInputChange = (event) => {
    const file = event.target.files[0];
    const inputName = event.target.name;
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        inputName === 'backgroundImage'
          ? setCurrentBackgroundImage(reader.result)
          : setCurrentProfileImage(reader.result);
        onChange({ [event.target.name]: reader.result });
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
            <label>
              <AddAPhotoOutlinedIcon />
              <input
                className="image-input"
                type="file"
                name="backgroundImage"
                onChange={onImageInputChange}
              />
            </label>

            <label>
              <Close />
            </label>
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
          url('${currentProfileImage}')`,
        }}
        className="avatar"
      >
        {showControlIcons ? (
          <div className="control-icons">
            <label>
              <AddAPhotoOutlinedIcon />
              <input
                className="image-input"
                type="file"
                name="profileImage"
                onChange={onImageInputChange}
              />
            </label>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProfileAvatarBackground;
