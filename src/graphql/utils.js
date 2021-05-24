import { USER_COMICS } from './graphql';

export const addUserComicToCache = (cache, userComic) => {
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

  cache.writeQuery({
    query: USER_COMICS,
    variables: { userId: userComic.userId },
    data: { userComics: [...data.userComics, userComic] },
  });
};
export const deleteUserComicFromCache = (cache, userComic) => {
  cache.modify({
    fields: {
      userComics(cachedUserComicsRefs = [], { readField }) {
        const updatedUserComicsRefs = cachedUserComicsRefs.filter(
          (userComicRef) => userComic.id !== readField('id', userComicRef)
        );

        return updatedUserComicsRefs;
      },
    },
  });
};
