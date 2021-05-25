import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { USER_COMICS, USER_COMICS_CATEGORIES } from '../../graphql/graphql';
import { connect } from 'react-redux';
import './library.scss';
import LibraryCategories from './library-categories';
import LibraryCategory from './library-category';

const Library = ({ signedUser }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
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
      onCompleted({ userComicsCategories }) {
        if (userComicsCategories && userComicsCategories[0]) {
          handleSelectCategory(userComicsCategories[0]);
        }
      },
    });

  useEffect(() => {
    if (signedUser) {
      getUserComics();
      getUserComicsCategories();
    }
  }, [signedUser]);

  useEffect(() => {
    if (userComics) {
      filterUserComicsByCategory(selectedCategory);
    }
  }, [userComics]);

  const filterUserComicsByCategory = (category) => {
    const filteredUserComics = userComics.filter(
      (userComic) => userComic.category === category
    );
    setUserComicsFromCategory(filteredUserComics);
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    filterUserComicsByCategory(category);
  };

  return (
    <div className="library">
      <div className="library-list">
        {signedUser ? (
          <h2 className="library-header">{signedUser.nickname}'s Library</h2>
        ) : null}
        {userComicsCategories ? (
          <LibraryCategories
            categories={userComicsCategories}
            onSelectCategory={handleSelectCategory}
          />
        ) : null}
      </div>

      <LibraryCategory
        category={selectedCategory}
        userComics={userComicsFromCategory}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  signedUser: state.user.signedUser,
});

export default connect(mapStateToProps)(Library);
