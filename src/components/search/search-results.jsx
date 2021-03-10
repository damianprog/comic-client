import { CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import SearchResultsList from './search-results-list';

import './search-results.scss';

const SearchResults = ({ comics, loading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [comicsPerPage] = useState(10);

  const indexOfLastComic = currentPage * comicsPerPage;
  const indexOfFirstComic = indexOfLastComic - comicsPerPage;
  const currentComics = comics.slice(indexOfFirstComic, indexOfLastComic);

  return (
    <div className="search-results">
      {loading ? (
        <div className="loading">
          <CircularProgress />
        </div>
      ) : (
        <SearchResultsList
          comics={currentComics}
          allComicsLength={comics.length}
        ></SearchResultsList>
      )}
    </div>
  );
};

export default SearchResults;
