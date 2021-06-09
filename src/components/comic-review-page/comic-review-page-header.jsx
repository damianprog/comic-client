import { Avatar } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import GetUserProfileImage from '../../utils/get-user-profile-image';
import GetFormattedDate from '../../utils/get-formatted-date';

import './comic-review-page-header.scss';

const ComicReviewPageHeader = ({ review }) => {
  const { user, createdAt } = review;

  const publishedDate = () => {
    let formattedDate = '';
    if (createdAt) {
      const dateOptions = { month: 'long', day: 'numeric', year: 'numeric' };
      formattedDate = GetFormattedDate(+createdAt, dateOptions);
    }

    return formattedDate;
  };
  return (
    <header className="comic-review-page-header">
      <Link to={`/profile/${user.nickname}`}>
        <Avatar
          className="avatar"
          alt="Signed User Image"
          src={GetUserProfileImage(user)}
        />
      </Link>
      <div className="review-details">
        <div className="info">
          <Link to={`/profile/${user.nickname}`}>{user.nickname}</Link>
          <p>{publishedDate()}</p>
        </div>
        <Link className="update" to={`/reviews/${review.id}/update`}>
          Update Review
        </Link>
      </div>
    </header>
  );
};

export default ComicReviewPageHeader;
