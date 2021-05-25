import React from 'react';
import './library-categories.scss';
import { List, ListItem, ListItemText } from '@material-ui/core';

const LibraryCategories = ({ categories, onClickCategory }) => {
  const sortedCategories = () => {
    return [...categories].sort();
  };

  return (
    <div className="library-categories">
      <h3 className="header">Categories</h3>
      <List className="list">
        {sortedCategories().map((category) => (
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

export default LibraryCategories;
