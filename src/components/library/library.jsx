import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { USER_COMICS } from '../../graphql/graphql';
import { connect } from 'react-redux';
import './library.scss';
import LibraryCategories from './library-categories';
import LibraryCategory from './library-category';
import { useParams } from 'react-router';
import { Fragment } from 'react';
import { CircularProgress } from '@material-ui/core';

const Library = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const { nickname } = useParams();

  const { data: { userComics } = {}, loading } = useQuery(USER_COMICS, {
    variables: {
      nickname,
    },
  });

  useEffect(() => {
    if (userComics && categories.length === 0) {
      const uniqueCategories = getUniqueCategories();

      uniqueCategories.sort();
      setSelectedCategory(uniqueCategories[0]);

      setCategories(uniqueCategories);
    }
  }, [userComics]);

  const getUniqueCategories = () => {
    const userComicsCategories = userComics.map(
      (userComic) => userComic.category
    );
    const uniqueCategories = [...new Set(userComicsCategories)];
    return uniqueCategories;
  };

  return (
    <div className="library">
      {loading ? (
        <div className="loading">
          <CircularProgress />
        </div>
      ) : userComics.length > 0 ? (
        <Fragment>
          <div className="library-list">
            <h3 className="library-header">{nickname}'s Library</h3>
            <LibraryCategories
              categories={categories}
              onSelectCategory={setSelectedCategory}
            />
          </div>

          <LibraryCategory
            category={selectedCategory}
            userComics={userComics}
          />
        </Fragment>
      ) : (
        <h3 className="library-empty-info">
          {nickname}'s Library has no any saved comics yet!
        </h3>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  signedUser: state.user.signedUser,
});

export default connect(mapStateToProps)(Library);
