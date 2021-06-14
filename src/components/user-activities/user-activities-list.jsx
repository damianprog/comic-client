import React from 'react';
import UserActivitiesListItem from './user-activities-list-item';

import './user-activities-list.scss';
const UserActivitiesList = ({ userActivities }) => {
  return (
    <div className="user-activities-list">
      {userActivities.map((userActivity) => (
        <UserActivitiesListItem
          key={userActivity.id + userActivity.__typename}
          userActivity={userActivity}
        />
      ))}
    </div>
  );
};

export default UserActivitiesList;
