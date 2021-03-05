import React from 'react';

import ComicPageDetails from './comic-page-details';

import GetComic from '../../api-utils/get-comic';
import GetSeries from '../../api-utils/get-series';

class ComicPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      comic: {},
      comicSeries: {},
    };
  }

  async componentDidMount() {
    await this.setComic();
    await this.setComicSeries(this.state.comic);
  }

  async setComic() {
    const comic = await GetComic(this.state.id);
    this.setState({ comic: comic });
  }

  async setComicSeries(comic) {
    const { series } = comic;

    if (series) {
      const seriesUriParts = series.resourceURI.split('/');
      const seriesId = seriesUriParts.pop();
      const seriesDetails = await GetSeries(seriesId);
      if (seriesDetails) {
        this.setState({ comicSeries: seriesDetails });
      }
    }
  }

  render() {
    const { comic, comicSeries } = this.state;

    return (
      <section className="comic">
        <ComicPageDetails
          comic={comic}
          comicSeries={comicSeries}
        ></ComicPageDetails>
      </section>
    );
  }
}

export default ComicPage;
