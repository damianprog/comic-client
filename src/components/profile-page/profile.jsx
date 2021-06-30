import React, { useState } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { useLazyQuery, useQuery } from '@apollo/client';
import { USER, USER_ACTIVITIES } from '../../graphql/graphql';
import { connect } from 'react-redux';
import { DateRange } from '@material-ui/icons';
import EditProfileDialog from '../edit-profile/edit-profile-dialog';

import './profile.scss';
import ProfileAvatarBackground from './profile-avatar-background';
import { Link, useParams } from 'react-router-dom';
import UserActivitiesList from '../user-activities/user-activities-list';

const Profile = ({ signedUser }) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const { nickname } = useParams();

  const toggleEditDialog = () => {
    setOpenEditDialog(!openEditDialog);
  };

  const [getUserActivities, { data: { userActivities } = {}, fetchMore }] =
    useLazyQuery(USER_ACTIVITIES);

  const { data: { user: profileUser } = {} } = useQuery(USER, {
    variables: {
      nickname,
    },
    onCompleted({ user }) {
      getUserActivities({ variables: { userId: user.id, first: 6 } });
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
        <header>
          <ProfileAvatarBackground
            profileImage={profileImage}
            backgroundImage={backgroundImage}
          />
          <div className="header-details">
            {signedUser && signedUser.id === profileUser.id ? (
              <div className="edit-profile-buttons">
                <Button
                  className="edit-dialog-btn"
                  variant="outlined"
                  onClick={toggleEditDialog}
                >
                  Edit Profile
                </Button>
                <Link className="edit-profile-link" to="/edit-profile">
                  <Button variant="outlined">Edit Profile</Button>
                </Link>
              </div>
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
            <Link
              to={`/profile/${profileUser.nickname}/library`}
              className="library-link"
            >
              <b>{nickname}'s</b> Library
            </Link>
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
          </div>
        </header>
        <div className="profile-content">
          {userActivities && (
            <UserActivitiesList
              userActivities={userActivities}
              fetchMore={fetchMore}
            />
          )}
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

const mapStateToProps = (state) => ({
  signedUser: state.user.signedUser,
});

export default connect(mapStateToProps)(Profile);
