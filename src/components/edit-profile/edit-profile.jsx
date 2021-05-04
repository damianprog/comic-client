import React, { useState } from 'react';
import { Button, CircularProgress, IconButton } from '@material-ui/core';
import './edit-profile.scss';
import { Close } from '@material-ui/icons';
import ProfileAvatarBackground from '../profile-page/profile-avatar-background';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import EditProfileForm from './edit-profile-form';
import { withRouter } from 'react-router-dom';

const EditProfile = ({
  profileUser: { nickname, birthDate, userDetails },
  showClose,
  close,
  history,
}) => {
  const [values, setValues] = useState({
    nickname,
    birthDate,
    interests: userDetails.interests,
    about: userDetails.about,
  });

  const onChange = (keyValue) => {
    setValues({ ...values, ...keyValue });
  };

  const [updateUser, { loading }] = useMutation(UPDATE_USER, {
    update(_, result) {
      if (showClose) close();
      history.push(`/profile/${result.data.updateUser.nickname}`);
    },
    onError(err) {
      console.log(err);
    },
    variables: {
      nickname: values.nickname,
      birthDate: values.birthDate,
      about: values.about,
      interests: values.interests,
      profileImageBase64: values.profileImage,
      backgroundImageBase64: values.backgroundImage,
    },
  });

  const onSave = async () => {
    updateUser();
  };

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
        <Button
          onClick={onSave}
          disabled={loading}
          disableElevation
          variant="contained"
          className="save"
        >
          {loading ? (
            <CircularProgress color="inherit" size={23} />
          ) : (
            <span>Save</span>
          )}
        </Button>
      </div>
      <div className="content">
        <ProfileAvatarBackground
          onChange={onChange}
          profileImage={userDetails.profileImage}
          backgroundImage={userDetails.backgroundImage}
          showControlIcons
        />
        <EditProfileForm onChange={onChange} values={values} />
      </div>
    </div>
  );
};

const UPDATE_USER = gql`
  mutation updateUser(
    $nickname: String
    $birthDate: String
    $about: String
    $interests: String
    $profileImageBase64: String
    $backgroundImageBase64: String
  ) {
    updateUser(
      input: {
        nickname: $nickname
        birthDate: $birthDate
        about: $about
        interests: $interests
        profileImageBase64: $profileImageBase64
        backgroundImageBase64: $backgroundImageBase64
      }
    ) {
      id
      nickname
      birthDate
      userDetails {
        id
        about
        interests
        profileImage
        backgroundImage
      }
    }
  }
`;

export default withRouter(EditProfile);
