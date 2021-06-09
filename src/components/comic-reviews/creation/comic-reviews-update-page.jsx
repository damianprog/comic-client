import { useQuery } from '@apollo/client';
import React from 'react';
import { useParams, withRouter } from 'react-router';
import ComicReviewsCreation from './comic-reviews-creation';
import { REVIEW } from '../../../graphql/graphql';

import './comic-reviews-creation-page.scss';
import { connect } from 'react-redux';

const ComicReviewsUpdatePage = ({ signedUser, history }) => {
  const { reviewId } = useParams();

  const isSignedUserReviewAuthor = (userReview) =>
    userReview.user.id === signedUser.id;

  const { data: { review } = {}, loading } = useQuery(REVIEW, {
    variables: {
      id: reviewId,
    },
    onCompleted({ review }) {
      if (!isSignedUserReviewAuthor(review)) {
        history.push(`/comic/${review.comic.id}/reviews/create`);
      }
    },
  });

  return (
    <div className="comic-reviews-creation-page">
      <div className="wrapper">
        {review && isSignedUserReviewAuthor(review) && (
          <ComicReviewsCreation update review={review} comic={review.comic} />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  signedUser: state.user.signedUser,
});

export default connect(mapStateToProps)(withRouter(ComicReviewsUpdatePage));
