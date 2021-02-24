import React from 'react';

import ComicsPreviewItem from '../comics-preview-item/comics-preview-item';

import './comics-preview.scss';

const ComicsPreview = ({ comics }) => (
  <div className="wrapper">
    <div className="comics-preview">
      {comics.map(({ id, ...otherComicProps }) => (
        <ComicsPreviewItem key={id} {...otherComicProps} />
      ))}
    </div>
  </div>
);

export default ComicsPreview;
