import React from 'react';

import './search-results-list';
import SearchResultsListItem from './search-results-list-item';

const SearchResultsList = ({ comics }) => {
  return (
    <div className="search-results-list">
      {comics.map((comic) => (
        <SearchResultsListItem title={comic.title}></SearchResultsListItem>
      ))}
    </div>
  );
};

export default SearchResultsList;
