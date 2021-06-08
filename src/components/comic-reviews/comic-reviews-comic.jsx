import { Button } from '@material-ui/core';
import { LibraryAdd } from '@material-ui/icons';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SaveComicDialog from '../save-comic/save-comic-dialog';
import './comic-reviews-comic.scss';

const ComicReviewsComic = ({ comic }) => {
  const [openSaveComicDialog, setOpenSaveComicDialog] = useState(false);

  const toggleSaveDialog = () => {
    setOpenSaveComicDialog(!openSaveComicDialog);
  };

  const comicMainCreators = () => {
    const mainCreatorsNames = [];
    if (comic.writer) mainCreatorsNames.push(comic.writer);
    if (comic.inker) mainCreatorsNames.push(comic.inker);

    return mainCreatorsNames;
  };

  const { coverImage, title, id } = comic;
  const creators = comicMainCreators(comic).join(', ');

  return (
    <div className="comic-reviews-comic">
      <Link to={`/comic/${id}`}>
        <div className="img-container">
          <img alt="cover" src={coverImage} />
        </div>
      </Link>

      <div className="info">
        <Link to={`/comic/${id}`}>
          <h3>{title}</h3>
        </Link>
        <p>{creators}</p>
        <div className="save-dialog">
          <Button disableRipple onClick={toggleSaveDialog}>
            <LibraryAdd />
            Save Comic
          </Button>
        </div>
      </div>
      <SaveComicDialog
        open={openSaveComicDialog}
        closeDialog={toggleSaveDialog}
        comic={comic}
      ></SaveComicDialog>
    </div>
  );
};

export default ComicReviewsComic;
