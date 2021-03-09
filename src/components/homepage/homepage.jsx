import React from 'react';
import ComicsPreview from '../comics-preview/comics-preview';
import GetComicsByTitle from '../../api-utils/get-comics-by-title';

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
    const firstPreviewComics = await GetComicsByTitle('Thor', 10);
    const secondPreviewComics = await GetComicsByTitle('Spider-Man', 10);
    const thirdPreviewComics = await GetComicsByTitle('Black Widow', 10);

    this.setState({
      firstPreviewComics: firstPreviewComics,
      secondPreviewComics: secondPreviewComics,
      thirdPreviewComics: thirdPreviewComics,
    });
  }

  // async getPreviewComics(title) {
  //   return MarvelApiBase.get('v1/public/comics', {
  //     params: {
  //       format: 'comic',
  //       title: title,
  //       limit: 10,
  //       noVariants: true,
  //       orderBy: 'issueNumber',
  //       apikey: process.env.REACT_APP_MARVEL_API_KEY,
  //     },
  //   })
  //     .then((res) => {
  //       const results = res.data.data.results;
  //       return results.filter((result) => result.images.length > 0);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  render() {
    const {
      firstPreviewComics,
      secondPreviewComics,
      thirdPreviewComics,
    } = this.state;

    return (
      <div>
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
