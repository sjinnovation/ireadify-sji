export const updateFavoriteBook = /* GraphQL */ `
  mutation UpdateFavoriteBook(
    $input: UpdateFavoriteBookInput!
    $condition: ModelFavoriteBookConditionInput
  ) {
    updateFavoriteBook(input: $input, condition: $condition) {
      id
      bookId
      isLiked
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
      bookId
      isLiked
    }
  }
`;