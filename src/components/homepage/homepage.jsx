import React from 'react';
import ComicsPreview from '../comics-preview/comics-preview';
import MarvelApiBase from '../../marvel-api-base/marvel-api-base';

import './homepage.scss';

class Homepage extends React.Component {
  constructor() {
    super();

    this.state = {
      previewComics: [],
    };
  }

  componentDidMount() {
    this.getPreviewComics();
  }

  getPreviewComics = async () => {
    try {
      await MarvelApiBase.get('v1/public/comics', {
        params: {
          format: 'comic',
          title: 'Thor',
          limit: 10,
          apikey: process.env.REACT_APP_MARVEL_API_KEY,
        },
      }).then((res) => {
        const results = res.data.data.results;
        this.setState({
          previewComics: results.filter((result) => result.images.length > 0),
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { previewComics } = this.state;

    return (
      <div className="homepage">
        <ComicsPreview comics={previewComics} title="Latest Thor releases" />
      </div>
    );
  }
}

export default Homepage;
