import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import GetComic from '../../api-utils/get-comic';
import ComicReviewsCreation from './comic-reviews-creation';
import './comic-reviews-creation-page.scss';

const ComicReviewsCreationPage = () => {
  const { comicId } = useParams();
  const [comic, setComic] = useState();

  useEffect(() => {
    setComic(GetComic(comicId));
  }, [comicId]);

  return (
    <div className="comic-reviews-creation-page">
      <div className="wrapper">
        {comic && <ComicReviewsCreation comic={comic} />}
      </div>
    </div>
  );
};

export default ComicReviewsCreationPage;
