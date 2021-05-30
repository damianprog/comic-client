import React, { useState } from 'react';
import SaveComicDialog from '../save-comic/save-comic-dialog';

import './comic-page-details.scss';
import { connect } from 'react-redux';
import ComicPageDetailsInfo from './comic-page-details-info';
import ComicPageDetailsImage from './comic-page-details-image';

const ComicPageDetails = ({ comic, comicSeries }) => {
  const [openSaveComicDialog, setOpenSaveComicDialog] = useState(false);

  const toggleSaveDialog = () => {
    setOpenSaveComicDialog(!openSaveComicDialog);
  };

  const { coverImage } = comic;

  return (
    <div className="comic-details">
      <div
        style={{ backgroundImage: `url(${coverImage})` }}
        className="comic-details-bg"
      ></div>
      <div className="wrapper">
        <ComicPageDetailsImage
          image={coverImage}
          onClickSaveComic={toggleSaveDialog}
        />
        <ComicPageDetailsInfo comic={comic} comicSeries={comicSeries} />
      </div>

      <SaveComicDialog
        open={openSaveComicDialog}
        closeDialog={toggleSaveDialog}
        comic={comic}
      ></SaveComicDialog>
    </div>
  );
};

const mapStateToProps = (state) => ({
  signedUser: state.user.signedUser,
});

export default connect(mapStateToProps)(ComicPageDetails);
