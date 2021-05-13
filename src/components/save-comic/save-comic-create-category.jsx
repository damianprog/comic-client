import React, { useState } from 'react';
import './save-comic-create-category.scss';
import { useMutation } from '@apollo/client';
import { CREATE_USER_COMIC } from '../../graphql/graphql';
import { Button, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { Add } from '@material-ui/icons';
import { addUserComicToCachedUserComics } from '../../graphql/utils';

const SaveComicCreateCategory = ({ comic, close }) => {
  const [showForm, setShowForm] = useState(false);
  const [category, setCategory] = useState('');

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const createCategory = (e) => {
    e.preventDefault();
    createUserComic({
      variables: {
        ...comic,
        category,
      },
    });
  };

  const onChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const [createUserComic] = useMutation(CREATE_USER_COMIC, {
    update(cache, { data: { createUserComic } }) {
      addUserComicToCachedUserComics(cache, createUserComic);
      cache.modify({
        fields: {
          userComicsCategories(cachedCategories = []) {
            return [...cachedCategories, createUserComic.category];
          },
        },
      });

      close();
    },
    onError(err) {
      console.log(err);
    },
  });

  return (
    <div className="save-comic-create-category">
      {showForm ? (
        <form onSubmit={createCategory}>
          <TextField
            focused
            placeholder="Enter category name..."
            onChange={onChangeCategory}
            label="Name"
          />
          <Button type="submit" className="create-btn" disableRipple>
            Create
          </Button>
        </form>
      ) : (
        <Button onClick={toggleForm} className="create-btn" disableRipple>
          <Add />
          Create new category
        </Button>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  signedUser: state.user.signedUser,
});

export default connect(mapStateToProps)(SaveComicCreateCategory);