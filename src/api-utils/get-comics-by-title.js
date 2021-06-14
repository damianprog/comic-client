import MarvelApiBase from '../marvel-api-base/marvel-api-base';
import restructureApiComic from './restructure-api-comic';

const GetComicsByTitle = (title, limit) => {
  const url = `https://gateway.marvel.com/v1/public/comics?format=comic&title=${title}&limit=${limit}noVariants=true&orderBy=-onsaleDate&apikey=2e000938355ab5a08959af26a65ae33f`;
  const cachedItems = window.localStorage.getItem(url);
  if (cachedItems) {
    return JSON.parse(cachedItems);
  } else {
    return MarvelApiBase.get('v1/public/comics', {
      params: {
        format: 'comic',
        title,
        limit,
        noVariants: true,
        orderBy: '-onsaleDate',
        apikey: process.env.REACT_APP_MARVEL_API_KEY,
      },
    })
      .then(async (res) => {
        const results = res.data.data.results;
        const resultsWithImages = results.filter(
          (result) => result.images.length > 0
        );
        const restructuredComics = await Promise.all(
          resultsWithImages.map(
            async (comic) => await restructureApiComic(comic)
          )
        );
        window.localStorage.setItem(url, JSON.stringify(restructuredComics));
        return restructuredComics;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export default GetComicsByTitle;
