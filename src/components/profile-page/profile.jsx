import React, { useState } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { Divider } from '@material-ui/core';
import { DateRange } from '@material-ui/icons';
import EditProfileDialog from '../edit-profile/edit-profile-dialog';

import './profile.scss';
import ProfileAvatarBackground from './profile-avatar-background';

const Profile = ({ signedUser, match: { params } }) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const toggleEditDialog = () => {
    setOpenEditDialog(!openEditDialog);
  };

  const { data: { user: profileUser } = {} } = useQuery(USER, {
    variables: {
      nickname: params.nickname,
    },
  });

  const joinedDate = () => {
    const parsedDate = new Date(parseInt(profileUser.createdAt));
    const dateOptions = { month: 'long', year: 'numeric' };
    return parsedDate.toLocaleDateString('en-US', dateOptions);
  };

  let profileMarkup;

  if (profileUser) {
    const {
      nickname,
      userDetails: { about, interests, profileImage, backgroundImage },
    } = profileUser;

    profileMarkup = (
      <section className="profile">
        <div className="wrapper">
          <header>
            <ProfileAvatarBackground
              profileImage={profileImage}
              backgroundImage={backgroundImage}
            />
            <div className="header-details">
              {signedUser && signedUser.id === profileUser.id ? (
                <Button
                  className="edit-profile-btn"
                  variant="outlined"
                  onClick={toggleEditDialog}
                >
                  Edit Profile
                </Button>
              ) : null}
              <h2>{nickname}</h2>
              <p className="joined">
                <DateRange /> <span>Joined {joinedDate()}</span>
              </p>
              <p className="statistics">
                <span>
                  <b>12</b> Reviews
                </span>
                <span>
                  <b>28</b> Ratings
                </span>
                <span>
                  <b>32</b> Read
                </span>
              </p>
              <Divider />
              <div className="about">
                <p>
                  <b>Interests: </b>
                  {interests}
                </p>
                <p>
                  <b>About Me: </b>
                  {about}
                </p>
              </div>
              <Divider />
            </div>
          </header>
        </div>
        <EditProfileDialog
          open={openEditDialog}
          closeDialog={toggleEditDialog}
          profileUser={profileUser}
        ></EditProfileDialog>
      </section>
    );
  } else {
    profileMarkup = (
      <section className="profile">
        <div className="loading">
          <CircularProgress />
        </div>
      </section>
    );
  }

  return profileMarkup;
};

const USER = gql`
  query($nickname: String) {
    user(nickname: $nickname) {
      id
      nickname
      birthDate
      email
      createdAt
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

const mapStateToProps = (state) => ({
  signedUser: state.user.signedUser,
});

export default connect(mapStateToProps)(Profile);
