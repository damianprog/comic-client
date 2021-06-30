import React from 'react';
import { Fragment } from 'react';
import { Waypoint } from 'react-waypoint';
import UserActivitiesListItem from './user-activities-list-item';

import './user-activities-list.scss';
const UserActivitiesList = ({ userActivities, fetchMore }) => {
  return (
    <div className="user-activities-list">
      {userActivities.map((userActivity, index) => (
        <Fragment key={userActivity.id + userActivity.__typename}>
          <UserActivitiesListItem userActivity={userActivity} />
          {index === userActivities.length - 4 && (
            <Waypoint
              onEnter={() => {
                fetchMore({
                  variables: {
                    first: 6,
                    lastCreatedAt:
                      userActivities[userActivities.length - 1].createdAt,
                  },
                  updateQuery: (pv, { fetchMoreResult }) => {
                    if (!fetchMoreResult) {
                      return pv;
                    }

                    return {
                      userActivities: [
                        ...userActivities,
                        ...fetchMoreResult.userActivities,
                      ],
                    };
                  },
                });
              }}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default UserActivitiesList;
