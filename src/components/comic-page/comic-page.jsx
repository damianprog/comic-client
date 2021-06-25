import React from 'react';

import ComicPageDetails from './comic-page-details';
import ComicsPreview from '../comics-preview/comics-preview';

import GetComic from '../../api-utils/get-comic';
import GetComicsFromSeries from '../../api-utils/get-comics-from-series';

import './comic-page.scss';
import ComicPageReviews from '../comic-reviews/comic-reviews';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ComicPage = () => {
  const [comic, setComic] = useState({});
  const [comicsFromSeries, setComicsFromSeries] = useState([]);
  const { comicId } = useParams();

  useEffect(() => {
    const fetchComicData = async () => {
      const fetchedComic = await GetComic(comicId);
      const fetchedComicsFromSeries = await GetComicsFromSeries(
        fetchedComic.seriesId
      );

      setComic(fetchedComic);
      setComicsFromSeries(fetchedComicsFromSeries);
    };

    fetchComicData();
  }, [comicId]);

  return (
    <section className="comic">
      <ComicPageDetails comic={comic}></ComicPageDetails>
      <ComicPageReviews comic={comic} />
      <ComicsPreview
        comics={comicsFromSeries}
        title="More form this series"
      ></ComicsPreview>
    </section>
  );
};

export default ComicPage;
