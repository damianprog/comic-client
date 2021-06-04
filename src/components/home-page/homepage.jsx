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
    const firstPreviewComics = await GetComicsByTitle('Avengers', 10);
    const secondPreviewComics = await GetComicsByTitle('Thor', 10);
    const thirdPreviewComics = await GetComicsByTitle('Doctor Strange', 10);

    this.setState({
      firstPreviewComics: firstPreviewComics,
      secondPreviewComics: secondPreviewComics,
      thirdPreviewComics: thirdPreviewComics,
    });
  }

  render() {
    const { firstPreviewComics, secondPreviewComics, thirdPreviewComics } =
      this.state;

    return (
      <div className="homepage">
        <ComicsPreview
          comics={firstPreviewComics}
          title="New Avengers releases"
        />
        <ComicsPreview comics={secondPreviewComics} title="New Thor releases" />
        <ComicsPreview
          comics={thirdPreviewComics}
          title="New Doctor Strange releases"
        />
      </div>
    );
  }
}

export default Homepage;
