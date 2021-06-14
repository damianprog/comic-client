import { Avatar } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import GetFormattedDate from '../../../utils/get-formatted-date';
import GetUserProfileImage from '../../../utils/get-user-profile-image';
import MoreLess from '../../more-less/more-less';
import './comic-reviews-list-item.scss';

const ComicReviewsListItem = ({ review }) => {
  const { user, createdAt, text } = review;

  const publishedDate = () => {
    let formattedDate = '';
    if (createdAt) {
      const dateOptions = { month: 'long', day: 'numeric', year: 'numeric' };
      formattedDate = GetFormattedDate(+createdAt, dateOptions);
    }

    return formattedDate;
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
        <MoreLess text={text} length={500} />
        <Link className="more" to={`/reviews/${review.id}`}>
          see review
        </Link>
      </div>
    </div>
  );
};

export default ComicReviewsListItem;
