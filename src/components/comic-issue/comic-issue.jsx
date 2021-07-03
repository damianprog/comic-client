import React from 'react';

import ComicIssueDetails from './comic-issue-details';
import ComicsPreview from '../comics-preview/comics-preview';

import GetComic from '../../api-utils/get-comic';
import GetComicsFromSeries from '../../api-utils/get-comics-from-series';

import ComicIssueReviews from './reviews/comic-issue-reviews';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ComicIssue = () => {
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
    <div className="comic-issue">
      <ComicIssueDetails comic={comic} />
      <ComicIssueReviews comic={comic} />
      <ComicsPreview
        comics={comicsFromSeries}
        title="More form this series"
      ></ComicsPreview>
    </div>
  );
};

export default ComicIssue;
