import React from 'react';
import { connect } from 'react-redux';
import './comic-page-details-image.scss';

import { Button } from '@material-ui/core';
import { LibraryAdd } from '@material-ui/icons';

const ComicPageDetailsImage = ({ image, onClickSaveComic, signedUser }) => {
  return (
    <div className="comic-page-details-image">
      <img alt="cover" src={image} />
      {signedUser && (
        <Button
          className="save-dialog-btn"
          disableRipple
          onClick={onClickSaveComic}
        >
          <LibraryAdd />
          Save Comic
        </Button>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  signedUser: state.user.signedUser,
});

export default connect(mapStateToProps)(ComicPageDetailsImage);
