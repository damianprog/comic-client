import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { useLazyQuery, useQuery } from '@apollo/client';
import { USER, USER_ACTIVITIES } from '../../graphql/graphql';
import { connect } from 'react-redux';
import { DateRange } from '@material-ui/icons';

import './profile.scss';
import ProfileAvatarBackground from './profile-avatar-background';
import { Link, useParams } from 'react-router-dom';
import UserActivitiesList from '../user-activities/user-activities-list';
import EditProfileActivator from '../edit-profile/edit-profile-activator';

const Profile = ({ signedUser }) => {
  const { nickname } = useParams();

  const [getUserActivities, { data: { userActivities } = {}, fetchMore }] =
    useLazyQuery(USER_ACTIVITIES, { fetchPolicy: 'network-only' });

  const { data: { user: profileUser } = {} } = useQuery(USER, {
    fetchPolicy: 'network-only',
    variables: {
      nickname,
    },
    onCompleted({ user }) {
      getUserActivities({ variables: { userId: user.id, quantity: 30 } });
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
            {signedUser && signedUser.id === profileUser.id && (
              <EditProfileActivator profileUser={profileUser} />
            )}
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
