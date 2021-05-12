import React from 'react';
import './save-comic-categories.scss';
import { gql, useMutation } from '@apollo/client';
import {
  Checkbox,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { CREATE_USER_COMIC } from '../../graphql/graphql';

const SaveComicCategoriesListItem = ({ comic, category, userComics = [] }) => {
  const [deleteUserComic] = useMutation(DELETE_USER_COMIC, {
    update(cache, { data: { deleteUserComic } }) {
      cache.modify({
        fields: {
          userComics(existingUserComics = [], { readField }) {
            const updatedUserComicsRefs = existingUserComics.filter(
              (userComicRef) =>
                deleteUserComic.id !== readField('id', userComicRef)
            );

            return updatedUserComicsRefs;
          },
        },
      });
    },
    onError(err) {
      console.log(err);
    },
  });

  const [createUserComic] = useMutation(CREATE_USER_COMIC, {
    update(cache, { data: { createUserComic } }) {
      cache.modify({
        fields: {
          userComics(existingUserComics = []) {
            const newUserComicRef = cache.writeFragment({
              data: createUserComic,
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
            return [...existingUserComics, newUserComicRef];
          },
        },
      });
    },
    onError(err) {
      console.log(err);
    },
  });

  const toggleComicCategory = (category) => {
    const userComic = userComics.find(
      (userComic) => userComic.category === category
    );

    if (userComic) {
      deleteUserComic({ variables: { id: userComic.id } });
    } else {
      createUserComic({
        variables: {
          id: comic.id,
          title: comic.title,
          description: comic.description,
          coverImage: comic.coverImage,
          onsaleDate: comic.onsaleDate,
          writer: comic.writer,
          inker: comic.inker,
          penciler: comic.penciler,
          seriesId: comic.seriesId,
          category,
        },
      });
    }
  };

  const isCategoryInUserComics = (category) => {
    const userComicWithCategory = userComics.find(
      (userComic) => userComic.category === category
    );

    return userComicWithCategory ? true : false;
  };

  return (
    <ListItem
      onClick={() => toggleComicCategory(category)}
      key={category}
      className="list-item"
    >
      <ListItemIcon>
        <Checkbox
          checked={isCategoryInUserComics(category)}
          disableRipple
        ></Checkbox>
      </ListItemIcon>
      <ListItemText primary={category}></ListItemText>
    </ListItem>
  );
};

const DELETE_USER_COMIC = gql`
  mutation deleteUserComic($id: ID) {
    deleteUserComic(id: $id) {
      id
      userId
      comic {
        id
        title
        coverImage
        onsaleDate
        writer
        inker
        penciler
        description
        seriesId
      }
      category
    }
  }
`;

export default SaveComicCategoriesListItem;
