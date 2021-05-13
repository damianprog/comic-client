import { gql } from '@apollo/client';

export const addUserComicToCachedUserComics = (cache, userComic) => {
  cache.modify({
    fields: {
      userComics(cachedUserComicsRefs = []) {
        const newUserComicRef = cache.writeFragment({
          data: userComic,
          fragment: gql`
            fragment NewUserComic on UserComic {
              id
              userId
              comic {
                id
                title
                coverImage
                onsaleDate
              }
              category
            }
          `,
        });
        return [...cachedUserComicsRefs, newUserComicRef];
      },
    },
  });
};
