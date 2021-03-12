export const getRating = /* GraphQL */ `
  query GetRating($id: ID!) {
    getRating(id: $id) {
      id
      email
      bookId
      books {
        id
        title
        description
        image
        ageId
        age {
          id
          name
          isDeleted
          order
          createdAt
          updatedAt
        }
        region
        isbn
        narrator
        status
        createdAt
        updatedAt
        isDeleted
        book
        bookType
        authorName
        authorId
        duration
        authors {
          id
          name
          description
          status
          createdAt
          updatedAt
          image
          isDeleted
        }
        languageId
        languages {
          id
          name
          status
          createdAt
          updatedAt
        }
      }
      isRated
      myRating
      createdAt
      updatedAt
    }
  }
`;
export const listRatings = /* GraphQL */ `
  query ListRatings(
    $filter: ModelRatingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRatings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        bookId
        isRated
        myRating
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchRatings = /* GraphQL */ `
  query SearchRatings(
    $filter: SearchableRatingFilterInput
    $sort: SearchableRatingSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchRatings(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
        id
        email
        bookId
        books {
          id
          title
          description
          image
          ageId
          region
          isbn
          narrator
          status
          createdAt
          updatedAt
          isDeleted
          book
          bookType
          authorName
          authorId
          duration
          languageId
        }
        isRated
        myRating
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;