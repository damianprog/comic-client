import MarvelApiBase from '../marvel-api-base/marvel-api-base';

const GetComicsFromSeries = (seriesId) => {
  const url = `https://gateway.marvel.com/v1/public/series/${seriesId}/comics?limit=10&noVariants=true&orderBy=issueNumber&apikey=2e000938355ab5a08959af26a65ae33f`;
  const cachedItems = window.localStorage.getItem(url);
  if (cachedItems) {
    return JSON.parse(cachedItems);
  } else {
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
        const resultsWithImages = results.filter(
          (result) => result.images.length > 0
        );
        window.localStorage.setItem(url, JSON.stringify(resultsWithImages));
        return resultsWithImages;
      })
      .catch((rejectedValue) => {
        console.log('Fetching comic data failed... ', rejectedValue);
        return {};
      });
  }
};

export default GetComicsFromSeries;
