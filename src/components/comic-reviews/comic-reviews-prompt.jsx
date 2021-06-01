import { Avatar, Button } from '@material-ui/core';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import profilePlaceholder from '../../assets/placeholders/profile-placeholder.png';
import './comic-reviews-prompt.scss';

const ComicReviewsPrompt = ({ user, onButtonClick }) => {
  const { comicId } = useParams();

  const profileImage = () => {
    const {
      userDetails: { profileImage },
    } = user;

    return profileImage ? profileImage : profilePlaceholder;
  };

  return (
    <div className="comic-reviews-propmpt">
      <Link to={`/profile/${user.nickname}`}>
        <Avatar
          className="avatar"
          alt="Signed User Image"
          src={profileImage()}
        />
      </Link>
      <div className="info">
        <p>
          <Link to={`/profile/${user.nickname}`}>{user.nickname}</Link>
        </p>
        <Link to={`/comic/${comicId}/reviews/create`}>
          <Button onClick={onButtonClick} variant="outlined" color="primary">
            Write a review
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ComicReviewsPrompt;
