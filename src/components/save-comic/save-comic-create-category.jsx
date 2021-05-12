import React, { useEffect, useState } from 'react';
import './save-comic-create-category.scss';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Button, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { Add } from '@material-ui/icons';

const SaveComicCreateCategory = ({ comic, signedUser }) => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const createCategory = (e) => {
    e.preventDefault();
  };

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  return (
    <div className="save-comic-create-category">
      {showForm ? (
        <form onSubmit={createCategory}>
          <TextField
            focused
            placeholder="Enter category name..."
            onChange={onChangeName}
            label="Name"
          />
          <Button onClick={toggleForm} className="create-btn" disableRipple>
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
