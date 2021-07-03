import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { REVIEWS } from '../../../graphql/graphql';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import ComicIssueReviewsPrompt from './comic-issue-reviews-prompt';
import './comic-issue-reviews.scss';
import ComicIssueReviewsList from './list/comic-issue-reviews-list';

const ComicIssueReviews = ({ signedUser }) => {
  const { comicId } = useParams();

  const { data: { reviews } = {}, refetch } = useQuery(REVIEWS, {
    variables: {
      comicId: comicId,
    },
  });

  useEffect(() => {
    if (refetch) {
      refetch();
    }
  }, []);

  return (
    <div className="comic-issue-reviews">
      <div className="wrapper">
        <h2>Reviews</h2>
        {signedUser && reviews && (
          <ComicIssueReviewsPrompt user={signedUser} reviews={reviews} />
        )}
        {reviews && <ComicIssueReviewsList reviews={reviews} />}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  signedUser: state.user.signedUser,
});

export default connect(mapStateToProps)(ComicIssueReviews);
