import { Avatar, Button } from '@material-ui/core';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import profilePlaceholder from '../../assets/placeholders/profile-placeholder.png';
import './comic-reviews-prompt.scss';

const ComicReviewsPrompt = ({ user, reviews }) => {
  const { comicId } = useParams();

  const profileImage = () => {
    const {
      userDetails: { profileImage },
    } = user;

    return profileImage ? profileImage : profilePlaceholder;
  };

  const userReview = reviews.find(
    (review) => review.user.id === user.id && review.comic.id === comicId
  );

  return (
    <div className="comic-reviews-prompt">
      <Link to={`/profile/${user.nickname}`}>
        <Avatar
          className="avatar"
          alt="Signed User Image"
          src={profileImage()}
        />
      </Link>
      <div className="info">
        <Link to={`/profile/${user.nickname}`}>{user.nickname}</Link>
        {userReview ? (
          <Link to={`/comic/${comicId}/reviews/create`}>
            <Button variant="outlined" color="primary">
              See your review
            </Button>
          </Link>
        ) : (
          <Link to={`/comic/${comicId}/reviews/create`}>
            <Button variant="outlined" color="primary">
              Write a review
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ComicReviewsPrompt;
