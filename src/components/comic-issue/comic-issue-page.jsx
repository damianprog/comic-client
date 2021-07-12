import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GetComic from '../../api-utils/get-comic';
import ComicIssue from './comic-issue';

import './comic-issue-page.scss';

const ComicIssuePage = () => {
  const [comic, setComic] = useState();
  const { comicId } = useParams();

  useEffect(() => {
    const fetchComic = async () => {
      const fetchedComic = await GetComic(comicId);
      setComic(fetchedComic);
    };

    fetchComic();
  }, [comicId]);

  return (
    <div className="comic-issue-page">
      {comic && <ComicIssue comic={comic} />}
    </div>
  );
};

export default ComicIssuePage;
