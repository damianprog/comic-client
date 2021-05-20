import React, { useEffect, useState } from 'react';
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { USER, USER_COMICS_CATEGORIES } from '../../graphql/graphql';
import { connect } from 'react-redux';
import './library-category.scss';
import ComicsPreview from '../comics-preview/comics-preview';
import ComicsPreviewItem from '../comics-preview-item/comics-preview-item';
import { List, ListItem, ListItemText } from '@material-ui/core';

const LibraryCategory = ({ category, userComics }) => {
  const comicsFromUserComics = userComics.map((userComic) => userComic.comic);

  const libraryCategoryFunction = (clickedUserComicId) => {
    console.log('Running function from library-category!');
    console.log('Clicked UserComic Id: ', clickedUserComicId);
  };

  return (
    <div className="library-category">
      <div className="test">
        <div className="items-container">
          {userComics.map((userComic) => (
            <ComicsPreviewItem
              key={userComic.id}
              comic={userComic.comic}
              showControls
              disableAnimation
              controlDropdownContent={
                <List>
                  <ListItem
                    onClick={() => libraryCategoryFunction(userComic.id)}
                    button
                  >
                    <ListItemText primary="Delete" />
                  </ListItem>
                </List>
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LibraryCategory;
