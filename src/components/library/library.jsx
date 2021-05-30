import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { USER_COMICS, USER_COMICS_CATEGORIES } from '../../graphql/graphql';
import { connect } from 'react-redux';
import './library.scss';
import LibraryCategories from './library-categories';
import LibraryCategory from './library-category';
import { useParams } from 'react-router';

const Library = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const { nickname } = useParams();

  const { data: { userComics } = {} } = useQuery(USER_COMICS, {
    variables: {
      nickname,
    },
  });

  const { data: { userComicsCategories } = {} } = useQuery(
    USER_COMICS_CATEGORIES,
    {
      variables: {
        nickname,
      },
    }
  );

  useEffect(() => {
    if (userComicsCategories) {
      setSelectedCategory(userComicsCategories[0]);
    }
  }, [userComicsCategories]);

  return (
    <div className="library">
      <div className="library-list">
        <div>
          <h2 className="library-header">{nickname}'s Library</h2>
        </div>
        {userComicsCategories && (
          <LibraryCategories
            categories={userComicsCategories}
            onSelectCategory={setSelectedCategory}
          />
        )}
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
