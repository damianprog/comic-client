import { Avatar } from '@material-ui/core';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GetFormattedDate from '../../../utils/get-formatted-date';
import GetUserProfileImage from '../../../utils/get-user-profile-image';
import './comic-reviews-list-item.scss';

const ComicReviewsListItem = ({ review }) => {
  const [more, setMore] = useState(false);
  const { user, createdAt, text } = review;

  const publishedDate = () => {
    let formattedDate = '';
    if (createdAt) {
      const dateOptions = { month: 'long', day: 'numeric', year: 'numeric' };
      formattedDate = GetFormattedDate(+createdAt, dateOptions);
    }

    return formattedDate;
  };

  const toggleMore = () => {
    setMore(!more);
  };

  const reviewText = () => {
    return more ? text : text.substring(0, 500);
  };

  return (
    <div className="comic-reviews-list-item">
      <Link to={`/profile/${user.nickname}`}>
        <Avatar
          className="avatar"
          alt="Signed User Image"
          src={GetUserProfileImage(user)}
        />
      </Link>
      <div className="content">
        <div className="header">
          <Link to={`/profile/${user.nickname}`}>{user.nickname}</Link>
          <span>{publishedDate()}</span>
        </div>
        <p>
          {reviewText()}
          {text.length > 500 && (
            <span className="more-less" onClick={toggleMore}>
              {more ? ' less' : ' ...more'}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default ComicReviewsListItem;
