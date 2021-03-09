import React from 'react';

import './search-results-list-item.scss';

const SearchResultsListItem = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

export default SearchResultsListItem;
