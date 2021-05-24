import { USER_COMICS } from './graphql';

export const addUserComicToCachedUserComics = (cache, userComic) => {
  const data = cache.readQuery({
    query: USER_COMICS,
    variables: {
      comicId: userComic.comic.id,
      userId: userComic.userId,
    },
  });

  cache.writeQuery({
    query: USER_COMICS,
    variables: { comicId: userComic.comic.id, userId: userComic.userId },
    data: { userComics: [...data.userComics, userComic] },
  });
};
