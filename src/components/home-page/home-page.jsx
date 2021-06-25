import React, { useState } from 'react';
import ComicsPreview from '../comics-preview/comics-preview';
import GetComicsByTitle from '../../api-utils/get-comics-by-title';

import './home-page.scss';
import { useEffect } from 'react';

const HomePage = () => {
  const [firstPreviewComics, setFirstPreviewComics] = useState([]);
  const [secondPreviewComics, setSecondPreviewComics] = useState([]);
  const [thirdPreviewComics, setThirdPreviewComics] = useState([]);

  useEffect(() => {
    setFirstPreviewComics(GetComicsByTitle('Iron Man', 10));
    setSecondPreviewComics(GetComicsByTitle('Black Widow', 10));
    setThirdPreviewComics(GetComicsByTitle('Guardians of the Galaxy', 10));
  }, []);

  return (
    <div className="home-page">
      <ComicsPreview
        comics={firstPreviewComics}
        title="New Iron Man releases"
      />
      <ComicsPreview
        comics={secondPreviewComics}
        title="New Black Widow releases"
      />
      <ComicsPreview
        comics={thirdPreviewComics}
        title="New Guardians of the Galaxy releases"
      />
    </div>
  );
};

export default HomePage;
