import { Card, CardContent } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import './comics-preview-item.scss';

const ComicsPreviewItem = ({
  comic,
  history,
  showControls,
  controlDropdownContent,
  disableAnimation,
}) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const mainCreatorsLastNames = () => {
    const mainCreatorsNames = [];
    if (comic.writer) mainCreatorsNames.push(comic.writer);
    if (comic.inker) mainCreatorsNames.push(comic.inker);
    return mainCreatorsNames.map((creatorName) => creatorName.split(' ').pop());
  };

  const redirectToComicPage = () => {
    history.push(`/comic/${comic.id}`);
    document.body.scrollTo(0, 0);
  };

  const { title, coverImage } = comic;
  const creators = mainCreatorsLastNames().join(', ');

  return (
    <div>
      <div className={`comics-preview-item ${disableAnimation ? '' : 'move'}`}>
        <div onClick={redirectToComicPage} className="img-container">
          <img alt="comic" src={coverImage} />
        </div>
        <div className="info-actions">
          <div>
            <h5 onClick={redirectToComicPage}>{title}</h5>
            <span>{creators}</span>
          </div>
          {showControls ? (
            <div className="controls">
              <MoreVert onClick={toggleDropdown} />
              {openDropdown ? (
                <Card className="dropdown">
                  <CardContent className="content">
                    {controlDropdownContent}
                  </CardContent>
                </Card>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default withRouter(ComicsPreviewItem);
