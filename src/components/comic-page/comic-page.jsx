import React from 'react';

import ComicPageDetails from './comic-page-details';
import ComicsPreview from '../comics-preview/comics-preview';

import GetComic from '../../api-utils/get-comic';
import GetSeries from '../../api-utils/get-series';
import GetComicsFromSeries from '../../api-utils/get-comics-from-series';

import './comic-page.scss';

class ComicPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comic: {},
      comicSeries: {},
      comicsFromSeries: [],
    };
  }

  componentDidMount() {
    this.updateState();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      await this.updateState();
    }
  }

  async updateState() {
    await this.setComic();
    await this.setComicSeries(this.state.comic);
    await this.setComicsFromSeries(this.state.comic.seriesId);
  }

  async setComic() {
    const comic = await GetComic(this.props.match.params.id);
    this.setState({ comic: comic });
  }

  async setComicSeries(comic) {
    if (comic.seriesId) {
      const seriesDetails = await GetSeries(comic.seriesId);
      if (seriesDetails) {
        this.setState({ comicSeries: seriesDetails });
      }
    }
  }

  async setComicsFromSeries(seriesId) {
    const comicsFromSeries = await GetComicsFromSeries(seriesId);
    this.setState({ comicsFromSeries });
  }

  render() {
    const { comic, comicSeries, comicsFromSeries } = this.state;

    return (
      <section className="comic">
        <ComicPageDetails
          comic={comic}
          comicSeries={comicSeries}
        ></ComicPageDetails>
        <ComicsPreview
          comics={comicsFromSeries}
          title="More form this series"
        ></ComicsPreview>
      </section>
    );
  }
}

export default ComicPage;
