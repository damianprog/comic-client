import React from 'react';
import ComicReview from './comic-review';

import './comic-review-page.scss';

const ComicReviewPage = () => {
  return (
    <div className="comic-review-page">
      <div className="wrapper">
        <ComicReview />
      </div>
    </div>
  );
};

export default ComicReviewPage;
