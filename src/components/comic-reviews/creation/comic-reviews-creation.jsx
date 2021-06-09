import React from 'react';
import ComicReviewsComic from '../comic-reviews-comic';
import ComicReviewsCreationForm from './comic-reviews-creation-form';
import './comic-reviews-creation.scss';

const ComicReviewsCreation = ({ comic, update, review }) => {
  return (
    <div className="comic-reviews-creation">
      <h2>{update ? 'Update' : 'Create'} Review</h2>
      <ComicReviewsComic comic={comic} />
      <ComicReviewsCreationForm update review={review} comic={comic} />
    </div>
  );
};

export default ComicReviewsCreation;
