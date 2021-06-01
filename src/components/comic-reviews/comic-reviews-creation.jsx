import React from 'react';
import ComicReviewsCreationComic from './comic-reviews-creation-comic';
import ComicReviewsCreationForm from './comic-reviews-creation-form';
import './comic-reviews-creation.scss';

const ComicReviewsCreation = ({ comic }) => {
  return (
    <div className="comic-reviews-creation">
      <h2>Create Review</h2>
      <ComicReviewsCreationComic comic={comic} />
      <ComicReviewsCreationForm comic={comic} />
    </div>
  );
};

export default ComicReviewsCreation;
