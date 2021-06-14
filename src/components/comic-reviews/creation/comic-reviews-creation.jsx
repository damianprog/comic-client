import React from 'react';
import ComicTeaser from '../../comic-teaser/comic-teaser';
import ComicReviewsCreationForm from './comic-reviews-creation-form';
import './comic-reviews-creation.scss';

const ComicReviewsCreation = ({ comic, update, review }) => {
  return (
    <div className="comic-reviews-creation">
      <h2>{update ? 'Update' : 'Create'} Review</h2>
      <ComicTeaser comic={comic} />
      <ComicReviewsCreationForm update={update} review={review} comic={comic} />
    </div>
  );
};

export default ComicReviewsCreation;
