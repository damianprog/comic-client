import MarvelApiBase from '../marvel-api-base/marvel-api-base';
import restructureApiComic from './restructure-api-comic';

const GetComic = async (id) => {
  const url = `https://gateway.marvel.com/v1/public/comics?id=${id}&apikey=${process.env.REACT_APP_MARVEL_API_KEY}`;
  const cachedItem = window.localStorage.getItem(url);

  if (cachedItem) {
    return JSON.parse(cachedItem);
  } else {
    try {
      const fetchComicResponse = await MarvelApiBase.get('v1/public/comics', {
        params: {
          id,
          apikey: process.env.REACT_APP_MARVEL_API_KEY,
        },
      });

      const fetchedComic = fetchComicResponse.data.data.results[0];

      const restructuredComic = await restructureApiComic(fetchedComic);

      window.localStorage.setItem(url, JSON.stringify(restructuredComic));

      return restructuredComic;
    } catch (error) {
      console.log('Fetching comic data failed... ', error);
    }
  }
};

export default GetComic;
