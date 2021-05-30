import React, { useState } from 'react';
import { connect } from 'react-redux';
import './comic-page-details-info.scss';

import he from 'he';

const ComicPageDetailsInfo = ({ comic, comicSeries, signedUser }) => {
  const publishedDate = () => {
    const { onsaleDate } = comic;
    let formattedDate = '';
    if (onsaleDate) {
      const parsedDate = new Date(Date.parse(onsaleDate));
      const dateOptions = { month: 'long', day: 'numeric', year: 'numeric' };
      formattedDate = parsedDate.toLocaleDateString('en-US', dateOptions);
    }

    return formattedDate;
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

  const { title, writer, inker, penciler } = comic;

  const published = publishedDate();

  return (
    <div className="comic-page-details-info">
      <h2>{title}</h2>
      <h3>Published:</h3>
      <span>{published}</span>
      <div className="info-row">
        {writer !== '' ? (
          <div>
            <h3>Writer:</h3>
            <span>{writer}</span>
          </div>
        ) : null}
        {inker !== '' ? (
          <div>
            <h3>Penciler:</h3>
            <span>{inker}</span>
          </div>
        ) : null}
      </div>
      {penciler !== '' ? (
        <div>
          <h3>Cover Artist:</h3>
          <span>{penciler}</span>
        </div>
      ) : null}

      <div className="info-description">{description()}</div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  signedUser: state.user.signedUser,
});

export default connect(mapStateToProps)(ComicPageDetailsInfo);
