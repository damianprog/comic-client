import React from 'react';

import ComicsPreviewItem from '../comics-preview-item/comics-preview-item';

import './comics-preview.scss';

const ComicsPreview = ({ comics, title }) => (
  <div className="comics-preview">
    <div className="wrapper">
      <h2>{title}</h2>
      <div className="items-container">
        {comics.map((comic) => (
          <ComicsPreviewItem key={comic.marvelApiId} comic={comic} />
        ))}
      </div>
    </div>
  </div>
);

export default ComicsPreview;
