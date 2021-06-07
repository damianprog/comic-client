import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import ComicReviewsPrompt from './comic-reviews-prompt';
import './comic-reviews.scss';
import ComicReviewsList from './list/comic-reviews-list';

const ComicReviews = ({ signedUser }) => {
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
    <div className="comic-reviews">
      <div className="wrapper">
        <h2>Reviews</h2>
        {signedUser && reviews && (
          <ComicReviewsPrompt user={signedUser} reviews={reviews} />
        )}
        {reviews && <ComicReviewsList reviews={reviews} />}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  signedUser: state.user.signedUser,
});

const REVIEWS = gql`
  query ($comicId: ID) {
    reviews(comicId: $comicId) {
      id
      user {
        id
        nickname
        userDetails {
          profileImage
        }
      }
      comic {
        id
      }
      text
      createdAt
    }
  }
`;

export default connect(mapStateToProps)(ComicReviews);
