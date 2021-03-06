import React from 'react';
import ComicsPreview from '../comics-preview/comics-preview';
import MarvelApiBase from '../../marvel-api-base/marvel-api-base';

import './homepage.scss';

class Homepage extends React.Component {
  constructor() {
    super();

    this.state = {
      firstPreviewComics: [],
      secondPreviewComics: [],
      thirdPreviewComics: [],
    };
  }

  componentDidMount() {
    this.setComicPreviews();
  }

  async setComicPreviews() {
    const firstPreviewComics = await this.getPreviewComics('Thor');
    const secondPreviewComics = await this.getPreviewComics('Spider-Man');
    const thirdPreviewComics = await this.getPreviewComics('Black Widow');

    this.setState({
      firstPreviewComics: firstPreviewComics,
      secondPreviewComics: secondPreviewComics,
      thirdPreviewComics: thirdPreviewComics,
    });
  }

  async getPreviewComics(title) {
    return MarvelApiBase.get('v1/public/comics', {
      params: {
        format: 'comic',
        title: title,
        limit: 10,
        noVariants: true,
        orderBy: 'issueNumber',
        apikey: process.env.REACT_APP_MARVEL_API_KEY,
      },
    })
      .then((res) => {
        const results = res.data.data.results;
        return results.filter((result) => result.images.length > 0);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const {
      firstPreviewComics,
      secondPreviewComics,
      thirdPreviewComics,
    } = this.state;

    return (
      <div className="homepage">
        <ComicsPreview
          comics={firstPreviewComics}
          title="Popular Thor releases"
        />
        <ComicsPreview
          comics={secondPreviewComics}
          title="Popular Spider-Man releases"
        />
        <ComicsPreview
          comics={thirdPreviewComics}
          title="Popular Black Widow releases"
        />
      </div>
    );
  }
}

export default Homepage;
