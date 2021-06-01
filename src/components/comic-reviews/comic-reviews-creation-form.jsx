import { gql, useMutation } from '@apollo/client';
import { Button, CircularProgress } from '@material-ui/core';
import { useState } from 'react';
import { withRouter } from 'react-router';
import './comic-reviews-creation-form.scss';

const ComicReviewsCreationForm = ({ comic, history }) => {
  const [errors, setErrors] = useState({});
  const [reviewText, setReviewText] = useState('');

  const onReviewInputChange = (event) => {
    setErrors({});
    setReviewText(event.target.value);
  };

  const [createReview, { loading }] = useMutation(CREATE_REVIEW, {
    update() {
      history.push(`/comic/${comic.id}`);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: {
      ...comic,
      text: reviewText,
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();
    createReview();
  };

  return (
    <form className="comic-reviews-creation-form" onSubmit={onSubmit}>
      <label>
        What did you think?
        {errors.text && <p className="error-info">{errors.text}</p>}
        <textarea
          value={reviewText}
          onInput={onReviewInputChange}
          className={`${errors.text ? 'error' : ''}`}
          required
        ></textarea>
      </label>
      <Button
        type="submit"
        variant="outlined"
        color="primary"
        disabled={loading}
      >
        {loading ? (
          <CircularProgress color="inherit" size={25} />
        ) : (
          <span>Post</span>
        )}
      </Button>
    </form>
  );
};

const CREATE_REVIEW = gql`
  mutation createReview(
    $id: ID!
    $title: String!
    $description: String
    $coverImage: String
    $onsaleDate: String
    $writer: String
    $inker: String
    $penciler: String
    $seriesId: ID
    $text: String!
  ) {
    createReview(
      newComicInput: {
        id: $id
        title: $title
        description: $description
        coverImage: $coverImage
        onsaleDate: $onsaleDate
        writer: $writer
        inker: $inker
        penciler: $penciler
        seriesId: $seriesId
      }
      text: $text
    ) {
      id
      user {
        id
        nickname
      }
      comic {
        id
        title
        coverImage
        writer
        inker
        penciler
      }
      text
      createdAt
    }
  }
`;

export default withRouter(ComicReviewsCreationForm);
