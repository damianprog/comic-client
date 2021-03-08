import React from 'react';

import './comic-page-details.scss';

const ComicPageDetails = ({ comic, comicSeries }) => {
  const mainImage = () => {
    const { images } = comic;
    return images && images[0]
      ? `${images[0].path}.${images[0].extension}`
      : '';
  };

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

  const description = () => {
    let description = '';

    if (comic.description && comic.description !== '') {
      description = comic.description;
    } else if (comicSeries.description && comicSeries.description !== '') {
      description = comicSeries.description;
    }

    return description;
  };

  const { title } = comic;

  return (
    <div className="comic-details">
      <div
        style={{ backgroundImage: `url(${mainImage()})` }}
        className="comic-details-bg"
      ></div>
      <div className="wrapper">
        <div className="main-img-container">
          <img alt="main-img" src={mainImage()} />
        </div>
        <div className="comic-info">
          <h2>{title}</h2>
          <div>
            <h3>Published:</h3>
            <span>{publishedDate()}</span>
          </div>
          <div className="comic-info-row">
            <div>
              <h3>Writer:</h3>
              <span>{creatorByRole('writer')}</span>
            </div>
            <div>
              <h3>Penciler:</h3>
              <span>{creatorByRole('inker')}</span>
            </div>
          </div>
          <div>
            <h3>Cover Artist:</h3>
            <span>{creatorByRole('penciler')}</span>
          </div>
          <div className="comic-info-description">{description()}</div>
        </div>
      </div>
    </div>
  );
};

export default ComicPageDetails;
