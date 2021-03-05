import React from 'react';

import './comic-page-details.scss';

class ComicPageDetails extends React.Component {
  mainImage() {
    const { images } = this.props.comic;
    return images && images[0]
      ? `${images[0].path}.${images[0].extension}`
      : '';
  }

  publishedDate() {
    const { dates } = this.props.comic;
    let formattedDate = '';
    if (dates) {
      const onsaleDate = dates.find((date) => date.type === 'onsaleDate');
      const parsedDate = new Date(Date.parse(onsaleDate.date));
      const dateOptions = { month: 'long', day: 'numeric', year: 'numeric' };
      formattedDate = parsedDate.toLocaleDateString('en-US', dateOptions);
    }

    return formattedDate;
  }

  creatorByRole(role) {
    const { creators } = this.props.comic;
    let creatorName = '';
    if (creators) {
      const creator = creators.items.find((creator) =>
        creator.role.includes(role)
      );
      creatorName = creator ? creator.name : '';
    }

    return creatorName;
  }

  description() {
    const { comic, comicSeries } = this.props;
    let description = '';

    if (comic.description && comic.description !== '') {
      description = comic.description;
    } else if (comicSeries.description && comicSeries.description !== '') {
      description = comicSeries.description;
    }

    return description;
  }

  render() {
    const { title } = this.props.comic;

    return (
      <div className="comic-details">
        <div
          style={{ backgroundImage: `url(${this.mainImage()})` }}
          className="comic-details-bg"
        ></div>
        <div className="wrapper">
          <div className="main-img-container">
            <img alt="main-img" src={this.mainImage()} />
          </div>
          <div className="comic-info">
            <h2>{title}</h2>
            <div>
              <h3>Published:</h3>
              <span>{this.publishedDate()}</span>
            </div>
            <div className="comic-info-row">
              <div>
                <h3>Writer:</h3>
                <span>{this.creatorByRole('writer')}</span>
              </div>
              <div>
                <h3>Penciler:</h3>
                <span>{this.creatorByRole('inker')}</span>
              </div>
            </div>
            <div>
              <h3>Cover Artist:</h3>
              <span>{this.creatorByRole('penciler')}</span>
            </div>
            <div className="comic-info-description">{this.description()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ComicPageDetails;
