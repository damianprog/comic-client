import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { USER_COMICS, USER_COMICS_CATEGORIES } from '../../graphql/graphql';
import { connect } from 'react-redux';
import './library.scss';
import LibraryCategories from './library-categories';
import LibraryCategory from './library-category';

const Library = ({ signedUser }) => {
  const [selectedCategory, setSelectedCategory] = useState('');

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

  useEffect(() => {
    if (userComicsCategories) {
      setSelectedCategory(userComicsCategories[0]);
    }
  }, [userComicsCategories]);

  return (
    <div className="library">
      <div className="library-list">
        {signedUser ? (
          <div>
            <h2 className="library-header">{signedUser.nickname}'s Library</h2>
          </div>
        ) : null}
        {userComicsCategories ? (
          <LibraryCategories
            categories={userComicsCategories}
            onSelectCategory={setSelectedCategory}
          />
        ) : null}
      </div>
      {userComics && (
        <LibraryCategory category={selectedCategory} userComics={userComics} />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  signedUser: state.user.signedUser,
});

export default connect(mapStateToProps)(Library);
