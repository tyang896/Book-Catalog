import { gql } from '@apollo/client';

//TODO: Create GET_ME query
export const GET_ME = gql`
query me{
    me {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;