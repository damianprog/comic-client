import React from 'react';

import './comics-preview-item.scss';

class ComicsPreviewItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comic: props.comic,
    };
  }

  render() {
    const { title, images, creators } = this.state.comic;

    const mainCreators = creators.items.splice(0, 2);
    const mainCreatorsLastNames = mainCreators.map((creator) =>
      creator.name.split(' ').pop()
    );

    const image = `${images[0].path}.${images[0].extension}`;

    return (
      <div className="comics-preview-item">
        <div className="img-container">
          <img alt="comic" src={image} />
        </div>
        <h5>{title}</h5>
        <span>{mainCreatorsLastNames.join(', ')}</span>
      </div>
    );
  }
}

export default ComicsPreviewItem;
