import gql from 'graphql-tag';

export const SIGNOUT = gql`
  mutation signout {
    signout
  }
`;

export const USER = gql`
  query ($id: Int, $nickname: String) {
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

export const USER_COMICS_CATEGORIES = gql`
  query ($userId: ID) {
    userComicsCategories(userId: $userId)
  }
`;
