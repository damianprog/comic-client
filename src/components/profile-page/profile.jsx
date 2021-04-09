import React, { useState } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { Divider } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { DateRange } from '@material-ui/icons';
import EditProfileDialog from '../edit-profile/edit-profile-dialog';

import './profile.scss';

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
      userDetails: { about, interests },
    } = profileUser;

    profileMarkup = (
      <section className="profile">
        <div className="wrapper">
          <header>
            <div className="background-image">
              <div className="avatar-container">
                <Avatar
                  alt="profile picture"
                  src="http://i.annihil.us/u/prod/marvel/i/mg/8/b0/5e00da382a27d.jpg"
                  className="avatar"
                />
              </div>
            </div>
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
      email
      createdAt
      userDetails {
        id
        about
        interests
      }
    }
  }
`;

const mapStateToProps = (state) => ({
  signedUser: state.user.signedUser,
});

export default connect(mapStateToProps)(Profile);
