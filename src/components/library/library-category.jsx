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

const LibraryCategory = ({ category, userComics }) => {
  const libraryCategoryFunction = (clickedUserComicId) => {};

  return (
    <div className="library-category">
      <h3 className="library-category-header">{category}</h3>
      <div className="items-container">
        {userComics.map((userComic) => (
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
                      onClick={() => libraryCategoryFunction(userComic.id)}
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
  );
};

export default LibraryCategory;
