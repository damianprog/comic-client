import React from 'react';
import ComicReviewsListItem from './comic-reviews-list-item';
import './comic-reviews-list.scss';

const ComicReviewsList = ({ reviews }) => {
  const sortedReviews = () => {
    return [...reviews].sort(
      (a, b) => parseInt(b.createdAt) - parseInt(a.createdAt)
    );
  };

  return (
    <div className="comic-reviews-list">
      {reviews.length > 0 ? (
        sortedReviews().map((review) => (
          <ComicReviewsListItem key={review.id} review={review} />
        ))
      ) : (
        <p className="empty-info">There are no reviews of this comic yet!</p>
      )}
    </div>
  );
};

export default ComicReviewsList;
