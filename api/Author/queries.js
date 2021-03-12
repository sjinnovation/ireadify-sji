export const getAuthor = /* GraphQL */ `
  query GetAuthor($id: ID!) {
    getAuthor(id: $id) {
      id
      name
      description
      status
      image
      isDeleted
      books {
        items {
          id
          title
          image
          status
          createdAt
          isDeleted
          book
          bookType
          authorName
          authorId
          ratings{
            items {
            id
            isRated
            myRating
            }
          }
        }
        nextToken
      }
      updatedAt
    }
  }
`;