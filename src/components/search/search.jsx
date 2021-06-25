import React, { useState } from 'react';
import GetComicsByTitle from '../../api-utils/get-comics-by-title';

import { Search } from '@material-ui/icons';

import './search.scss';
import SearchResults from './search-results';

const SearchComics = () => {
  const [title, setTitle] = useState('');
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noMatches, setNoMatches] = useState(false);

  const updateTitle = (event) => {
    const { value } = event.target;
    setTitle(value);
  };

  const getComics = async (event) => {
    event.preventDefault();
    setLoading(true);
    setNoMatches(false);

    const foundComics = await GetComicsByTitle(title, 100);

    setComics(foundComics);
    setLoading(false);
    setNoMatches(foundComics.length === 0);
  };

  return (
    <div className="search">
      <div className="search-input-container">
        <Search />
        <form onSubmit={getComics}>
          <input onChange={updateTitle} placeholder="search" />
        </form>
      </div>
      {noMatches && <p className="no-matches-info">No matches found!</p>}
      <SearchResults comics={comics} loading={loading}></SearchResults>
    </div>
  );
};

export default SearchComics;
