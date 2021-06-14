import React from 'react';

import ComicPageDetails from './comic-page-details';
import ComicsPreview from '../comics-preview/comics-preview';

import GetComic from '../../api-utils/get-comic';
import GetSeries from '../../api-utils/get-series';
import GetComicsFromSeries from '../../api-utils/get-comics-from-series';

import './comic-page.scss';
import ComicPageReviews from '../comic-reviews/comic-reviews';

class ComicPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comic: {},
      comicsFromSeries: [],
    };
  }

  componentDidMount() {
    this.updateState();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.match.params.comicId !== this.props.match.params.comicId) {
      await this.updateState();
    }
  }

  async updateState() {
    await this.setComic();
    await this.setComicsFromSeries(this.state.comic.seriesId);
  }

  async setComic() {
    const comic = await GetComic(this.props.match.params.comicId);
    this.setState({ comic });
  }

  async setComicsFromSeries(seriesId) {
    const comicsFromSeries = await GetComicsFromSeries(seriesId);
    this.setState({ comicsFromSeries });
  }

  render() {
    const { comic, comicsFromSeries } = this.state;

    return (
      <section className="comic">
        <ComicPageDetails comic={comic}></ComicPageDetails>
        <ComicPageReviews comic={comic} />
        <ComicsPreview
          comics={comicsFromSeries}
          title="More form this series"
        ></ComicsPreview>
      </section>
    );
  }
}

export default ComicPage;
