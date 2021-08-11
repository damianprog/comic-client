import React from 'react';

import ComicIssueDetails from './comic-issue-details';
import ComicsPreview from '../comics-preview/comics-preview';

import GetComicsFromSeries from '../../api-utils/get-comics-from-series';

import ComicIssueReviews from './reviews/comic-issue-reviews';
import { useState } from 'react';
import { useEffect } from 'react';
import GetSeries from '../../api-utils/get-series';
import stripHtmlTags from '../../utils/strip-html-tags';

const ComicIssue = ({ comic }) => {
  const [comicsFromSeries, setComicsFromSeries] = useState([]);
  const [comicWithDescription, setComicWithDescription] = useState(comic);

  useEffect(() => {
    const fetchComicsFromSeries = async () => {
      let fetchedComicsFromSeries = await GetComicsFromSeries(comic.seriesId);
      fetchedComicsFromSeries = fetchedComicsFromSeries
        ? fetchedComicsFromSeries
        : [];

      setComicsFromSeries(fetchedComicsFromSeries);
    };

    const fetchComicDescription = async () => {
      let description = comic.description;
      const isComicDescriptionEmpty = description.trim().length === 0;
      if (isComicDescriptionEmpty) {
        const series = await GetSeries(comic.seriesId);
        if (series) {
          description = series.description
            ? stripHtmlTags(series.description)
            : '';
        }
      }
      setComicWithDescription({ ...comic, description });
    };

    fetchComicsFromSeries();
    fetchComicDescription();
  }, [comic]);

  return (
    <div className="comic-issue">
      <ComicIssueDetails comic={comicWithDescription} />
      <ComicIssueReviews comic={comicWithDescription} />
      <ComicsPreview
        comics={comicsFromSeries}
        title="More form this series"
      ></ComicsPreview>
    </div>
  );
};

export default ComicIssue;
