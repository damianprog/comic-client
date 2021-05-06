import React from 'react';

import he from 'he';

import './comic-page-details.scss';

const ComicPageDetails = ({ comic, comicSeries }) => {
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

  const { title, coverImage, writer, inker, penciler } = comic;

  const published = publishedDate();

  return (
    <div className="comic-details">
      <div
        style={{ backgroundImage: `url(${coverImage})` }}
        className="comic-details-bg"
      ></div>
      <div className="wrapper">
        <div className="main-img-container">
          <img alt="main-img" src={coverImage} />
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

          <div className="comic-info-description">{description()}</div>
        </div>
      </div>
    </div>
  );
};

export default ComicPageDetails;
