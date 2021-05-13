import React from 'react';
import './save-comic-categories.scss';
import { gql, useQuery } from '@apollo/client';
import { List } from '@material-ui/core';
import { connect } from 'react-redux';
import SaveComicCategoriesListItem from './save-comic-categories-list-item';

const SaveComicCategoriesList = ({ comic, signedUser }) => {
  const { data: { userComics } = {} } = useQuery(USER_COMICS, {
    variables: {
      userId: signedUser.id,
      comicId: comic.id,
    },
  });

  const { data: { userComicsCategories } = {} } = useQuery(
    USER_COMICS_CATEGORIES,
    {
      variables: {
        userId: signedUser.id,
      },
    }
  );

  const sortedUserComicsCategories = () => {
    const sortedArray = userComicsCategories
      ? [...userComicsCategories].sort()
      : [];

    return sortedArray;
  };

  return (
    <div className="save-comic">
      <List className="categories-list">
        {sortedUserComicsCategories().map((category) => (
          <SaveComicCategoriesListItem
            key={category}
            category={category}
            comic={comic}
            userComics={userComics}
          />
        ))}
      </List>
    </div>
  );
};

export const USER_COMICS = gql`
  query ($userId: ID, $comicId: ID) {
    userComics(userId: $userId, comicId: $comicId) {
      id
      category
    }
  }
`;

export const USER_COMICS_CATEGORIES = gql`
  query ($userId: ID) {
    userComicsCategories(userId: $userId)
  }
`;

const mapStateToProps = (state) => ({
  signedUser: state.user.signedUser,
});

export default connect(mapStateToProps)(SaveComicCategoriesList);
