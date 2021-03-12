export const createRating = /* GraphQL */ `
  mutation CreateRating(
    $input: CreateRatingInput!
    $condition: ModelRatingConditionInput
  ) {
    createRating(input: $input, condition: $condition) {
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
export const updateRating = /* GraphQL */ `
  mutation UpdateRating(
    $input: UpdateRatingInput!
    $condition: ModelRatingConditionInput
  ) {
    updateRating(input: $input, condition: $condition) {
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
export const deleteRating = /* GraphQL */ `
  mutation DeleteRating(
    $input: DeleteRatingInput!
    $condition: ModelRatingConditionInput
  ) {
    deleteRating(input: $input, condition: $condition) {
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