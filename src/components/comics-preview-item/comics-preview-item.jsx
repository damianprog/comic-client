import React from 'react';
import { withRouter } from 'react-router-dom';

import './comics-preview-item.scss';

const ComicsPreviewItem = ({ comic, history }) => {
  const mainCreatorsLastNames = () => {
    const mainCreatorsNames = [];
    if (comic.writer) mainCreatorsNames.push(comic.writer);
    if (comic.inker) mainCreatorsNames.push(comic.inker);
    return mainCreatorsNames.map((creatorName) => creatorName.split(' ').pop());
  };

  const redirectToComicPage = () => {
    history.push(`/comic/${comic.marvelApiId}`);
    document.body.scrollTo(0, 0);
  };

  const { title, coverImage } = comic;
  const creators = mainCreatorsLastNames().join(', ');

  return (
    <div onClick={redirectToComicPage} className="comics-preview-item">
      <div className="img-container">
        <img alt="comic" src={coverImage} />
      </div>
      <h5>{title}</h5>
      <span>{creators}</span>
    </div>
  );
};

export default withRouter(ComicsPreviewItem);
