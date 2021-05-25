import { USER_COMICS } from './graphql';

export const addUserComicToCache = (cache, userComic) => {
  const saveComicUserComics = cache.readQuery({
    query: USER_COMICS,
    variables: {
      comicId: userComic.comic.id,
      userId: userComic.userId,
    },
  });

  const libraryUserComics = cache.readQuery({
    query: USER_COMICS,
    variables: {
      userId: userComic.userId,
    },
  });

  if (saveComicUserComics) {
    cache.writeQuery({
      query: USER_COMICS,
      variables: { comicId: userComic.comic.id, userId: userComic.userId },
      data: { userComics: [...saveComicUserComics.userComics, userComic] },
    });
  }

  if (libraryUserComics) {
    cache.writeQuery({
      query: USER_COMICS,
      variables: { userId: userComic.userId },
      data: { userComics: [...libraryUserComics.userComics, userComic] },
    });
  }
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
