import gql from 'graphql-tag';

export const SIGNOUT = gql`
  mutation signout {
    signout
  }
`;

export const USER = gql`
  query($id: Int, $nickname: String) {
    user(id: $id, nickname: $nickname) {
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
