import gql from 'graphql-tag';

export const SIGNOUT = gql`
  mutation signout {
    signout
  }
`;

export const USER = gql`
  query ($id: ID, $nickname: String) {
    user(where: { id: $id, nickname: $nickname }) {
      id
      nickname
      birthDate
      email
      createdAt
      userDetails {
        id
        about
        interests
        profileImage
        backgroundImage
      }
    }
  }
`;

export const CREATE_USER_COMIC = gql`
  mutation createUserComic(
    $id: ID!
    $title: String!
    $description: String
    $coverImage: String
    $onsaleDate: String
    $writer: String
    $inker: String
    $penciler: String
    $seriesId: ID
    $category: String!
  ) {
    createUserComic(
      input: {
        id: $id
        title: $title
        description: $description
        coverImage: $coverImage
        onsaleDate: $onsaleDate
        writer: $writer
        inker: $inker
        penciler: $penciler
        seriesId: $seriesId
      }
      category: $category
    ) {
      id
      category
      user {
        id
        nickname
      }
      comic {
        id
        title
        coverImage
        writer
        inker
        penciler
      }
      createdAt
    }
  }
`;

export const USER_COMICS = gql`
  query ($userId: ID, $nickname: String, $comicId: ID) {
    userComics(userId: $userId, nickname: $nickname, comicId: $comicId) {
      id
      category
      user {
        id
        nickname
      }
      comic {
        id
        title
        coverImage
        writer
        inker
        penciler
      }
      createdAt
    }
  }
`;

export const DELETE_USER_COMIC = gql`
  mutation deleteUserComic($id: ID) {
    deleteUserComic(id: $id) {
      id
      user {
        id
        nickname
      }
      comic {
        id
      }
      category
    }
  }
`;

export const USER_COMICS_CATEGORIES = gql`
  query ($userId: ID, $nickname: String) {
    userComicsCategories(userId: $userId, nickname: $nickname)
  }
`;
