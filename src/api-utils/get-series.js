import MarvelApiBase from '../marvel-api-base/marvel-api-base';

const GetSeries = (id) => {
  return MarvelApiBase.get('v1/public/series', {
    params: {
      id: id,
      apikey: process.env.REACT_APP_MARVEL_API_KEY,
    },
  })
    .then((res) => {
      return res.data.data.results[0];
    })
    .catch((rejectedValue) => {
      console.log('Fetching series data failed... ', rejectedValue);
      return {};
    });
};

export default GetSeries;
