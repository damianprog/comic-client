import React from 'react';

import { Search } from '@material-ui/icons';

import './search.scss';

class SearchComic extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
    };
  }

  updateTitle = (event) => {
    const { value } = event.target;
    this.setState({ title: value });
  };

  render() {
    return (
      <div className="search">
        <div className="search-input-container">
          <Search />
          <input onChange={this.updateTitle} placeholder="search" />
        </div>
      </div>
    );
  }
}

export default SearchComic;
