import MarvelApiBase from '../marvel-api-base/marvel-api-base';

const GetComicsFromSeries = (seriesId) => {
  return MarvelApiBase.get(`v1/public/series/${seriesId}/comics`, {
    params: {
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
    .catch((rejectedValue) => {
      console.log('Fetching comic data failed... ', rejectedValue);
      return {};
    });
};

export default GetComicsFromSeries;
