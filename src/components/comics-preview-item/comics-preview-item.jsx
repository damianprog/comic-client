import React from 'react';
import { Link } from 'react-router-dom';

import './comics-preview-item.scss';

class ComicsPreviewItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comic: props.comic,
    };
  }

  mainCreatorsLastNames() {
    const { creators } = this.state.comic;
    const mainCreators = creators.items.splice(0, 2);
    return mainCreators.map((creator) => creator.name.split(' ').pop());
  }

  mainImage() {
    const { images } = this.state.comic;
    return `${images[0].path}.${images[0].extension}`;
  }

  render() {
    const { id, title } = this.state.comic;

    return (
      <div className="comics-preview-item">
        <Link to={`/comic/${id}`}>
          <div className="img-container">
            <img alt="comic" src={this.mainImage()} />
          </div>
          <h5>{title}</h5>
        </Link>
        <span>{this.mainCreatorsLastNames().join(', ')}</span>
      </div>
    );
  }
}

export default ComicsPreviewItem;
