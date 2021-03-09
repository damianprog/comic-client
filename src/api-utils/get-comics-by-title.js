import MarvelApiBase from '../marvel-api-base/marvel-api-base';

const GetComicsByTitle = (title, limit) => {
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
    .then((res) => {
      const results = res.data.data.results;
      return results.filter((result) => result.images.length > 0);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default GetComicsByTitle;
