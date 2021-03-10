import React from 'react';
import { Link } from 'react-router-dom';
import GetComicMainImage from '../../utils/get-comic-main-image';

import './search-results-list-item.scss';

const SearchResultsListItem = ({ comic, comic: { id, title, dates } }) => {
  const publishedYear = () => {
    let year = '';
    if (dates) {
      const onsaleDate = dates.find((date) => date.type === 'onsaleDate');
      const parsedDate = new Date(Date.parse(onsaleDate.date));
      const dateOptions = { year: 'numeric' };
      year = parsedDate.toLocaleDateString('en-US', dateOptions);
    }

    return year;
  };

  return (
    <div className="search-item">
      <Link to={`/comic/${id}`}>
        <div
          style={{ backgroundImage: `url(${GetComicMainImage(comic)})` }}
          className="search-item-image"
        ></div>
      </Link>
      <div className="search-item-details-wrapper">
        <div className="search-item-details">
          <b className="item-type">Comic Issue</b>
          <Link to={`/comic/${id}`}>
            <h2>{title}</h2>
          </Link>
          <b>{publishedYear()}</b>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsListItem;
