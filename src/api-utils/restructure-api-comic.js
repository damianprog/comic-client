import GetSeries from './get-series';
import he from 'he';

const getCoverImage = (comic) => {
  const { images } = comic;
  return images && images[0] ? `${images[0].path}.${images[0].extension}` : '';
};

const getOnsaleDate = (comic) => {
  const { dates } = comic;
  const onsaleDate = dates.find((date) => date.type === 'onsaleDate');
  return onsaleDate.date;
};

const getCreatorByRole = (comic, role) => {
  const { creators } = comic;
  let creatorName = '';
  if (creators) {
    const creator = creators.items.find((creator) =>
      creator.role.includes(role)
    );
    creatorName = creator ? creator.name : '';
  }

  return creatorName;
};

const getSeriesId = (comic) => {
  return comic.series ? comic.series.resourceURI.split('/').pop() : '';
};

const stripHtmlTags = (string) => {
  const stripedHtml = string.replace(/(<([^>]+)>)/gi, '');
  const decodedStripedHtml = he.decode(stripedHtml);
  return decodedStripedHtml;
};

const getComicDescription = async (comic) => {
  let description = '';

  if (comic.description && comic.description !== '') {
    description = comic.description;
  } else {
    const seriesId = getSeriesId(comic);
    if (seriesId) {
      // const series = await GetSeries(seriesId);
      // if (series) {
      //   description = series.description ? series.description : '';
      // }
    }
  }

  description = stripHtmlTags(description);

  return description;
};

const restructureApiComic = async (comic) => {
  const restructuredComic = {
    id: String(comic.id),
    title: comic.title,
  };

  restructuredComic.description = await getComicDescription(comic);
  restructuredComic.coverImage = getCoverImage(comic);
  restructuredComic.onsaleDate = getOnsaleDate(comic);
  restructuredComic.writer = getCreatorByRole(comic, 'writer');
  restructuredComic.inker = getCreatorByRole(comic, 'inker');
  restructuredComic.penciler = getCreatorByRole(comic, 'penciler');
  restructuredComic.seriesId = getSeriesId(comic);

  return restructuredComic;
};

export default restructureApiComic;
