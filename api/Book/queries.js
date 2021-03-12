export const listRecomendedBooks = /* GraphQL */ `
  query ListBooks(
    $filter: ModelBookFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBooks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        image
        bookType
        authorName
        authorId
      }
    }
  }
`;

export const getBook = /* GraphQL */ `
  query GetBook($id: ID!) {
    getBook(id: $id) {
        id
        title
        description
        image
        ageId
        age{
          name
        }
        region
        isbn
        status
        isDeleted
        narrator
        duration
        book
        bookType
        authorId
        authorName
        languageId
        languages {
            name
        }
    }
  }
`;

export const getFavoriteBook = /* GraphQL */ `
  query GetFavoriteBook($id: ID!) {
    getFavoriteBook(id: $id) {
      id
      email
      bookId
      isLiked
      createdAt
      updatedAt
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
        email
        bookId
        books {
          id
          title
          description
          image
          ageId
          bookType
          authorName
          authorId
        }
        isLiked
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listAnalyticss = /* GraphQL */ `
  query ListAnalyticss(
    $filter: ModelAnalyticsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAnalyticss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        firstName
        lastName
        bookId
        videoId
        openedDate
        activity {
          id
          startTime
          endTime
          totalTime
          createdAt
        }
        totalTime
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export const getAnalytics = /* GraphQL */ `
  query GetAnalytics($id: ID!) {
    getAnalytics(id: $id) {
      id
      email
      firstName
      lastName
      totalTime
      activity {
          id
          startTime
          endTime
          totalTime
          createdAt
      }
    }
  }
`;

export const getAllAnalyticsDetails = /* GraphQL */ `
  query ListAnalyticss(
    $filter: ModelAnalyticsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAnalyticss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        firstName
        lastName
        bookId
        books {
          id
          title
          image
          authorName
          authorId
        }
        videoId
        videos {
          id
          title
          image
        }
        openedDate
        totalTime
        activity {
          id
          startTime
          endTime
          totalTime
          createdAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;


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
        email
        firstName
        lastName
        bookId
        books {
          id
          title
          image
          authorName
          authorId
        }
        videoId
        videos {
          id
          title
          image
        }
        openedDate
        totalTime
        activity {
          id
          startTime
          endTime
          totalTime
          createdAt
        }
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;

export const bookByCreatedAt = /* GraphQL */ `
  query BookByCreatedAt(
    $isDeleted: Int
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelBookFilterInput
    $limit: Int
    $nextToken: String
  ) {
    bookByCreatedAt(
      isDeleted: $isDeleted
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        image
        bookType
        authorName
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
  }
`;