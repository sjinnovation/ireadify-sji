export const searchAnalyticss = /* GraphQL */ `
  query SearchAnalyticss(
    $filter: SearchableAnalyticsFilterInput
    $sort: SearchableAnalyticsSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchAnalyticss(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        bookId
        books {
          id
          title
          image
          book
          bookType
          authorName
          authorId
          isDeleted
        }
        openedDate
        totalTime
        updatedAt
      }
      nextToken
      total
    }
  }
`;


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
