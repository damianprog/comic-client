import React from 'react';
import GetComicsByTitle from '../../api-utils/get-comics-by-title';

import { Search } from '@material-ui/icons';

import './search.scss';
import SearchResults from './search-results';

class SearchComics extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      comics: [],
      loading: false,
    };
  }

  updateTitle = (event) => {
    const { value } = event.target;
    this.setState({ title: value });
  };

  getComics = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const { title } = this.state;
    const foundComics = await GetComicsByTitle(title, 100);
    this.setState({ comics: foundComics, loading: false });
  };

  render() {
    const { comics, loading } = this.state;

    return (
      <div className="search">
        <div className="search-input-container">
          <Search />
          <form onSubmit={this.getComics}>
            <input onChange={this.updateTitle} placeholder="search" />
          </form>
        </div>
        <SearchResults comics={comics} loading={loading}></SearchResults>
      </div>
    );
  }
}

export default SearchComics;
