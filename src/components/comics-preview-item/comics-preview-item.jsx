import React from 'react';

import './comics-preview-item.scss';

class ComicsPreviewItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      title: props.title,
      description: props.description,
      images: props.images,
      creators: props.creators.items,
    };
  }

  render() {
    const { id, title, description, images, creators } = this.state;

    const mainCreators = creators.splice(0, 2);
    const mainCreatorsLastNames = mainCreators.map((creator) =>
      creator.name.split(' ').pop()
    );

    return (
      <div className="comics-preview-item">
        <div className="img-container">
          <img alt="comic" src={`${images[0].path}.${images[0].extension}`} />
        </div>
        <h5>{title}</h5>
        <span>{mainCreatorsLastNames.join(', ')}</span>
      </div>
    );
  }
}

export default ComicsPreviewItem;
