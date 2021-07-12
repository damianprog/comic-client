import MarvelApiBase from '../marvel-api-base/marvel-api-base';

const GetSeries = (id) => {
  const url = `https://gateway.marvel.com/v1/public/series?id=${id}&apikey=${process.env.REACT_APP_MARVEL_API_KEY}`;
  const cachedItem = window.localStorage.getItem(url);
  if (cachedItem) {
    return JSON.parse(cachedItem);
  } else {
    try {
      const fetchSeriesResponse = MarvelApiBase.get('v1/public/series', {
        params: {
          id: id,
          apikey: process.env.REACT_APP_MARVEL_API_KEY,
        },
      });

      const fetchedSeries = fetchSeriesResponse.data.data.results[0];

      window.localStorage.setItem(url, JSON.stringify(fetchedSeries));

      return fetchedSeries;
    } catch (error) {
      console.log(error);
    }
  }
};

export default GetSeries;
