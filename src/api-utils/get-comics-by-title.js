import MarvelApiBase from '../marvel-api-base/marvel-api-base';
import restructureApiComic from './restructure-api-comic';

const GetComicsByTitle = async (title, limit) => {
  const url = `https://gateway.marvel.com/v1/public/comics?format=comic&title=${title}&limit=${limit}noVariants=true&orderBy=-onsaleDate&apikey=${process.env.REACT_APP_MARVEL_API_KEY}`;
  const cachedItems = window.localStorage.getItem(url);
  if (cachedItems) {
    return JSON.parse(cachedItems);
  } else {
    try {
      const fetchComicsResponse = await MarvelApiBase.get('v1/public/comics', {
        params: {
          format: 'comic',
          title,
          limit,
          noVariants: true,
          orderBy: '-onsaleDate',
          apikey: process.env.REACT_APP_MARVEL_API_KEY,
        },
      });

      const fetchedComics = fetchComicsResponse.data.data.results;
      const fetchedComicsWithImages = fetchedComics.filter(
        (comic) => comic.images.length > 0
      );

      const restructuredComics = await Promise.all(
        fetchedComicsWithImages.map((comic) => restructureApiComic(comic))
      );

      window.localStorage.setItem(url, JSON.stringify(restructuredComics));
      return restructuredComics;
    } catch (error) {
      console.log(error);
    }
  }
};

export default GetComicsByTitle;
