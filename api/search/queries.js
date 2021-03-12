export const listFavoriteBooks = /* GraphQL */ `
  query ListFavoriteBooks(
    $filter: ModelFavoriteBookFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFavoriteBooks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        bookId
        isLiked
      }
      nextToken
    }
  }
`;


export const searchBooks = /* GraphQL */ `
  query SearchBooks(
    $filter: SearchableBookFilterInput
    $sort: SearchableBookSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchBooks(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        image
        ageId
        age {
         name
        }
        bookType
        authorName
        authorId
        duration
        ratings{
          items {
          id
          isRated
          myRating
          }
        }
      }
      nextToken
      total
    }
  }
`;


export const searchBooksDropDown = /* GraphQL */ `
  query SearchBooks(
    $filter: SearchableBookFilterInput
    $sort: SearchableBookSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchBooks(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        authorName
      }
      total
    }
  }
`;