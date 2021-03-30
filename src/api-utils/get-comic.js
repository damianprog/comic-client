import MarvelApiBase from '../marvel-api-base/marvel-api-base';

const GetComic = (id) => {
  const url = `https://gateway.marvel.com/v1/public/comics?id=${id}&apikey=2e000938355ab5a08959af26a65ae33f`;
  const cachedItem = window.localStorage.getItem(url);
  if (cachedItem) {
    return JSON.parse(cachedItem);
  } else {
    return MarvelApiBase.get('v1/public/comics', {
      params: {
        id: id,
        apikey: process.env.REACT_APP_MARVEL_API_KEY,
      },
    })
      .then((res) => {
        const result = res.data.data.results[0];
        window.localStorage.setItem(url, JSON.stringify(result));
        return result;
      })
      .catch((rejectedValue) => {
        console.log('Fetching comic data failed... ', rejectedValue);
        return {};
      });
  }
};

export default GetComic;
