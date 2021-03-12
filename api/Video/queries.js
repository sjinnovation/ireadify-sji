export const videoByCreatedAt = /* GraphQL */ `
  query VideoByCreatedAt(
    $isDeleted: Int
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelVideoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    videoByCreatedAt(
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
        description
        video
        duration
        image
      }
      nextToken
    }
  }
`;