export const ageByCreatedAt = /* GraphQL */ `
  query AgeByCreatedAt(
    $isDeleted: Int
    $order: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAgeRangeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ageByCreatedAt(
      isDeleted: $isDeleted
      order: $order
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        isDeleted
        order
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
