import React from 'react';
import './library-category.scss';
import ComicsPreviewItem from '../comics-preview-item/comics-preview-item';
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { deleteUserComicFromCache } from '../../graphql/utils';
import { useMutation } from '@apollo/client';
import { DELETE_USER_COMIC } from '../../graphql/graphql';

const LibraryCategory = ({ category, userComics }) => {
  const [deleteUserComic] = useMutation(DELETE_USER_COMIC, {
    update(cache, { data: { deleteUserComic } }) {
      deleteUserComicFromCache(cache, deleteUserComic);
    },
    onError(err) {
      console.log(err);
    },
  });

  const sortedUserComics = () => {
    const userComicsCopy = [...userComics];

    return userComicsCopy.sort(
      (a, b) => parseInt(b.createdAt) - parseInt(a.createdAt)
    );
  };

  return (
    <div className="library-category">
      <div className="library-category-content">
        <h3 className="header">{category}</h3>
        <div className="items-container">
          {sortedUserComics().map((userComic) => (
            <ComicsPreviewItem
              key={userComic.id}
              comic={userComic.comic}
              showControls
              disableAnimation
              controlDropdownContent={
                <Card className="dropdown-card">
                  <CardContent className="dropdown-card-content">
                    <List>
                      <ListItem
                        onClick={() =>
                          deleteUserComic({ variables: { id: userComic.id } })
                        }
                        button
                      >
                        <ListItemText primary="Delete" />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LibraryCategory;
