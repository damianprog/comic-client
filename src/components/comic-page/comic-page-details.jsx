import React from 'react';
import GetComicMainImage from '../../utils/get-comic-main-image';

import he from 'he';

import './comic-page-details.scss';

const ComicPageDetails = ({ comic, comicSeries }) => {
  const publishedDate = () => {
    const { dates } = comic;
    let formattedDate = '';
    if (dates) {
      const onsaleDate = dates.find((date) => date.type === 'onsaleDate');
      const parsedDate = new Date(Date.parse(onsaleDate.date));
      const dateOptions = { month: 'long', day: 'numeric', year: 'numeric' };
      formattedDate = parsedDate.toLocaleDateString('en-US', dateOptions);
    }

    return formattedDate;
  };

  const creatorByRole = (role) => {
    const { creators } = comic;
    let creatorName = '';
    if (creators) {
      const creator = creators.items.find((creator) =>
        creator.role.includes(role)
      );
      creatorName = creator ? creator.name : '';
    }

    return creatorName;
  };

  const stripHtmlTags = (string) => {
    const stripedHtml = string.replace(/(<([^>]+)>)/gi, '');
    const decodedStripedHtml = he.decode(stripedHtml);
    return decodedStripedHtml;
  };

  const description = () => {
    let description = '';

    if (comic.description && comic.description !== '') {
      description = comic.description;
    } else if (comicSeries.description && comicSeries.description !== '') {
      description = comicSeries.description;
    }

    description = stripHtmlTags(description);

    return description;
  };

  const { title } = comic;

  const published = publishedDate();
  const writer = creatorByRole('writer');
  const penciler = creatorByRole('inker');
  const coverArtist = creatorByRole('penciler');

  return (
    <div className="comic-details">
      <div
        style={{ backgroundImage: `url(${GetComicMainImage(comic)})` }}
        className="comic-details-bg"
      ></div>
      <div className="wrapper">
        <div className="main-img-container">
          <img alt="main-img" src={GetComicMainImage(comic)} />
        </div>
        <div className="comic-info">
          <h2>{title}</h2>
          <div>
            <h3>Published:</h3>
            <span>{published}</span>
          </div>
          <div className="comic-info-row">
            {writer !== '' ? (
              <div>
                <h3>Writer:</h3>
                <span>{writer}</span>
              </div>
            ) : null}
            {penciler !== '' ? (
              <div>
                <h3>Penciler:</h3>
                <span>{penciler}</span>
              </div>
            ) : null}
          </div>
          {coverArtist !== '' ? (
            <div>
              <h3>Cover Artist:</h3>
              <span>{coverArtist}</span>
            </div>
          ) : null}

          <div className="comic-info-description">{description()}</div>
        </div>
      </div>
    </div>
  );
};

export default ComicPageDetails;
