import { useQuery } from '@apollo/client';
import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import ComicReviewsComic from '../comic-reviews/comic-reviews-comic';
import ComicReviewPageHeader from './comic-review-page-header';
import { REVIEW } from '../../graphql/graphql';

import './comic-review-page.scss';

const ComicReviewPage = ({ signedUser }) => {
  const { reviewId } = useParams();

  const { data: { review } = {}, loading } = useQuery(REVIEW, {
    variables: {
      id: reviewId,
    },
  });

  return (
    <div className="comic-review-page">
      <div className="wrapper">
        {loading ? (
          <div className="loading">
            <CircularProgress />
          </div>
        ) : (
          <Fragment>
            <ComicReviewPageHeader review={review} />
            <ComicReviewsComic comic={review.comic} />
            <p className="review-text">{review.text}</p>
          </Fragment>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  signedUser: state.user.signedUser,
});

export default connect(mapStateToProps)(ComicReviewPage);
