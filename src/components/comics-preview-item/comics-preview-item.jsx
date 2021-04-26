import React from 'react';
import { withRouter } from 'react-router-dom';

import './comics-preview-item.scss';

const ComicsPreviewItem = (props) => {
  const mainCreatorsLastNames = () => {
    const { creators } = props.comic;
    const mainCreators = creators.items.slice(0, 2);
    return mainCreators.map((creator) => creator.name.split(' ').pop());
  };

  const mainImage = () => {
    const { images } = props.comic;
    return `${images[0].path}.${images[0].extension}`;
  };

  const redirectToComicPage = () => {
    props.history.push(`/comic/${props.comic.id}`);
    document.body.scrollTo(0, 0);
  };

  const { title } = props.comic;
  const creators = mainCreatorsLastNames().join(', ');

  return (
    <div onClick={redirectToComicPage} className="comics-preview-item">
      <div className="img-container">
        <img alt="comic" src={mainImage()} />
      </div>
      <h5>{title}</h5>
      <span>{creators}</span>
    </div>
  );
};

export default withRouter(ComicsPreviewItem);
