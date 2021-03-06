import MarvelApiBase from '../marvel-api-base/marvel-api-base';

const GetComic = (comicId) => {
  return MarvelApiBase.get('v1/public/comics', {
    params: {
      id: comicId,
      apikey: process.env.REACT_APP_MARVEL_API_KEY,
    },
  })
    .then((res) => res.data.data.results[0])
    .catch((rejectedValue) => {
      console.log('Fetching comic data failed... ', rejectedValue);
      return {};
    });
};

export default GetComic;
