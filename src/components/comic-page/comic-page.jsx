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
      window.scrollTo(0, 0);
    }
  }

  async updateState() {
    await this.setComic();
    await this.setComicSeries(this.state.comic);
    await this.setComicsFromSeries(this.state.comicSeries);
  }

  async setComic() {
    const comic = await GetComic(this.props.match.params.id);
    this.setState({ comic: comic });
  }

  async setComicSeries(comic) {
    if (comic.series) {
      const seriesId = this.getSeriesIdFromComic(comic);
      const seriesDetails = await GetSeries(seriesId);
      if (seriesDetails) {
        this.setState({ comicSeries: seriesDetails });
      }
    }
  }

  getSeriesIdFromComic(comic) {
    return comic.series ? comic.series.resourceURI.split('/').pop() : '';
  }

  async setComicsFromSeries(comicSeries) {
    const comicsFromSeries = await GetComicsFromSeries(comicSeries.id);
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
