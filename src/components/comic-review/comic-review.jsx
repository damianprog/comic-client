import { useQuery } from '@apollo/client';
import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { Fragment } from 'react';
import { useParams } from 'react-router';
import ComicTeaser from '../comic-teaser/comic-teaser';
import ComicReviewHeader from './comic-review-header';
import { REVIEW } from '../../graphql/graphql';

import './comic-review.scss';

const ComicReview = () => {
  const { reviewId } = useParams();

  const { data: { review } = {}, loading } = useQuery(REVIEW, {
    variables: {
      id: reviewId,
    },
  });

  return (
    <div className="comic-review">
      <div className="wrapper">
        {loading ? (
          <div className="loading">
            <CircularProgress />
          </div>
        ) : (
          <Fragment>
            <ComicReviewHeader review={review} />
            <ComicTeaser comic={review.comic} />
            <p className="review-text">{review.text}</p>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default ComicReview;
