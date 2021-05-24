import React from 'react';
import './library-categories-list.scss';
import { List, ListItem, ListItemText } from '@material-ui/core';

const LibraryCategoriesList = ({ categories, onClickCategory }) => {
  return (
    <div className="library-page-categories">
      <h3 className="header">Categories</h3>
      <List>
        {categories.map((category) => (
          <ListItem
            onClick={() => onClickCategory(category)}
            key={category}
            button
          >
            <ListItemText primary={category} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default LibraryCategoriesList;
