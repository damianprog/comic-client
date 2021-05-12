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

const restructureApiComic = (comic) => {
  const restructuredComic = {
    id: comic.id,
    title: comic.title,
    description: comic.description ? comic.description : '',
  };

  restructuredComic.coverImage = getCoverImage(comic);
  restructuredComic.onsaleDate = getOnsaleDate(comic);
  restructuredComic.writer = getCreatorByRole(comic, 'writer');
  restructuredComic.inker = getCreatorByRole(comic, 'inker');
  restructuredComic.penciler = getCreatorByRole(comic, 'penciler');
  restructuredComic.seriesId = getSeriesId(comic);

  return restructuredComic;
};

export default restructureApiComic;
