import React from 'react';
import { connect } from 'react-redux';
import ComicReviewsPrompt from './comic-reviews-prompt';
import './comic-reviews.scss';

const ComicReviews = ({ comic, signedUser }) => {
  return (
    <div className="comic-reviews">
      <div className="wrapper">
        <h2>Reviews</h2>
        {signedUser && <ComicReviewsPrompt user={signedUser} />}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  signedUser: state.user.signedUser,
});

export default connect(mapStateToProps)(ComicReviews);
