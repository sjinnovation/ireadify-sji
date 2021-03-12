export const createAnalytics = /* GraphQL */ `
  mutation CreateAnalytics(
    $input: CreateAnalyticsInput!
    $condition: ModelAnalyticsConditionInput
  ) {
    createAnalytics(input: $input, condition: $condition) {
      id
      email
      firstName
      lastName
      bookId
      videoId
      openedDate
    }
  }
`;

export const updateAnalytics = /* GraphQL */ `
  mutation UpdateAnalytics(
    $input: UpdateAnalyticsInput!
    $condition: ModelAnalyticsConditionInput
  ) {
    updateAnalytics(input: $input, condition: $condition) {
      id
      email
      firstName
      lastName
      bookId
      videoId
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
  }
`;

export const createFavoriteBook = /* GraphQL */ `
  mutation CreateFavoriteBook(
    $input: CreateFavoriteBookInput!
    $condition: ModelFavoriteBookConditionInput
  ) {
    createFavoriteBook(input: $input, condition: $condition) {
      id
      email
      bookId
      isLiked
      createdAt
      updatedAt
    }
  }
`;
export const updateFavoriteBook = /* GraphQL */ `
  mutation UpdateFavoriteBook(
    $input: UpdateFavoriteBookInput!
    $condition: ModelFavoriteBookConditionInput
  ) {
    updateFavoriteBook(input: $input, condition: $condition) {
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
          image
          isDeleted
          updatedAt
        }
        languageId
        languages {
          id
          name
          status
          createdAt
          updatedAt
        }
        updatedAt
      }
      isLiked
      createdAt
      updatedAt
    }
  }
`;

export const deleteAnalytics = /* GraphQL */ `
  mutation DeleteAnalytics(
    $input: DeleteAnalyticsInput!
    $condition: ModelAnalyticsConditionInput
  ) {
    deleteAnalytics(input: $input, condition: $condition) {
      id
      email
    }
  }
`;  