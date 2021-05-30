import { Avatar, Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import profilePlaceholder from '../../assets/placeholders/profile-placeholder.png';
import './comic-reviews-prompt.scss';

const ComicReviewsPrompt = ({ user, onButtonClick }) => {
  const profileImage = () => {
    const {
      userDetails: { profileImage },
    } = user;

    return profileImage ? profileImage : profilePlaceholder;
  };

  return (
    <div className="comic-reviews-propmpt">
      <Avatar className="avatar" alt="Signed User Image" src={profileImage()} />
      <div className="info">
        <p>
          <Link to={`/profile/${user.nickname}`}>{user.nickname}</Link>
        </p>
        <Button onClick={onButtonClick} variant="outlined" color="primary">
          Write a review
        </Button>
      </div>
    </div>
  );
};

export default ComicReviewsPrompt;
