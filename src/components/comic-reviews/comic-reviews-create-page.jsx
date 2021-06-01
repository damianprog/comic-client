import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import GetComic from '../../api-utils/get-comic';
import ComicReviewsCreate from './comic-reviews-create';
import './comic-reviews-create-page.scss';

const ComicReviewsCreatePage = () => {
  const { comicId } = useParams();
  const [comic, setComic] = useState();

  useEffect(() => {
    setComic(GetComic(comicId));
  }, [comicId]);

  return (
    <div className="comic-reviews-create-page">
      <div className="wrapper">
        {comic && <ComicReviewsCreate comic={comic} />}
      </div>
    </div>
  );
};

export default ComicReviewsCreatePage;
