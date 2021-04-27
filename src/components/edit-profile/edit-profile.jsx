import React, { useState } from 'react';
import { Button, IconButton } from '@material-ui/core';
import './edit-profile.scss';
import { Close } from '@material-ui/icons';
import ProfileAvatarBackground from '../profile-page/profile-avatar-background';
import DateSelector from '../date-selector/date-selector';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const EditProfile = ({
  profileUser: { nickname, userDetails },
  showClose,
  close,
}) => {
  const [values, setValues] = useState({
    nickname: nickname,
    interests: userDetails.interests,
    about: userDetails.about,
  });

  const onChange = (object) => {
    setValues({ ...values, ...object });
  };

  const formInputHandler = (event) => {
    onChange({ [event.target.name]: event.target.value });
  };

  const [updateUser, { loading }] = useMutation(UPDATE_USER, {
    update(_, result) {
      close();
    },
    onError(err) {
      console.log(err);
    },
    variables: {
      nickname: values.nickname,
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
          disableElevation
          variant="contained"
          className="save"
        >
          Save
        </Button>
      </div>
      <div className="content">
        <ProfileAvatarBackground
          onChange={onChange}
          profileImage={userDetails.profileImage}
          backgroundImage={userDetails.backgroundImage}
          showControlIcons
        />
        <form>
          <input
            value={values.nickname}
            onInput={formInputHandler}
            name="nickname"
            placeholder="Nickname"
          ></input>
          <input
            value={values.interests}
            onInput={formInputHandler}
            name="interests"
            placeholder="Interests"
          ></input>
          <textarea
            value={values.about}
            onInput={formInputHandler}
            name="about"
            placeholder="About Me"
            className="about"
          ></textarea>
          <p className="outer-label">Birth Date</p>
          <DateSelector></DateSelector>
        </form>
      </div>
    </div>
  );
};

const UPDATE_USER = gql`
  mutation updateUser(
    $nickname: String
    $about: String
    $interests: String
    $profileImageBase64: String
    $backgroundImageBase64: String
  ) {
    updateUser(
      input: {
        nickname: $nickname
        about: $about
        interests: $interests
        profileImageBase64: $profileImageBase64
        backgroundImageBase64: $backgroundImageBase64
      }
    ) {
      id
      nickname
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

export default EditProfile;
