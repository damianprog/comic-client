import React, { useEffect, useState } from 'react';
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { USER, USER_COMICS_CATEGORIES } from '../../graphql/graphql';
import { connect } from 'react-redux';
import './library.scss';
import LibraryCategoriesList from './library-categories-list';
import LibraryCategory from './library-category';

const Library = ({ signedUser }) => {
  const [selectedCategory, setSelectedCategory] = useState();
  const [userComicsFromCategory, setUserComicsFromCategory] = useState([]);

  const [getUserComics, { data: { userComics } = {} }] = useLazyQuery(
    USER_COMICS,
    {
      variables: {
        userId: signedUser ? signedUser.id : '',
      },
    }
  );

  const [getUserComicsCategories, { data: { userComicsCategories } = {} }] =
    useLazyQuery(USER_COMICS_CATEGORIES, {
      variables: {
        userId: signedUser ? signedUser.id : '',
      },
    });

  useEffect(() => {
    if (signedUser) {
      getUserComics();
      getUserComicsCategories();
    }
  }, [signedUser]);

  const filterUserComicsByCategory = (category) => {
    setSelectedCategory(category);
    const filteredUserComics = userComics.filter(
      (userComic) => userComic.category === category
    );
    setUserComicsFromCategory(filteredUserComics);
  };

  return (
    <div className="library">
      {signedUser ? (
        <h2 className="page-header">{signedUser.nickname}'s Library</h2>
      ) : null}
      <div className="content">
        {userComicsCategories ? (
          <LibraryCategoriesList
            categories={userComicsCategories}
            onClickCategory={filterUserComicsByCategory}
          />
        ) : null}
        <LibraryCategory
          category={selectedCategory}
          userComics={userComicsFromCategory}
        />
      </div>
    </div>
  );
};

export const USER_COMICS = gql`
  query ($userId: ID, $comicId: ID) {
    userComics(userId: $userId, comicId: $comicId) {
      id
      category
      comic {
        id
        title
        coverImage
        writer
        inker
        penciler
      }
    }
  }
`;

const mapStateToProps = (state) => ({
  signedUser: state.user.signedUser,
});

export default connect(mapStateToProps)(Library);
