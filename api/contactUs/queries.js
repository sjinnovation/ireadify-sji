export const listContactUss = /* GraphQL */ `
  query ListContactUss(
    $filter: ModelContactUsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContactUss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        name
        message
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const contactUsByDateCreatedAt = /* GraphQL */ `
  query ContactUsByDateCreatedAt(
    $isDeleted: Int
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelContactUsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    contactUsByDateCreatedAt(
      isDeleted: $isDeleted
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        email
        name
        message
        createdAt
        isDeleted
        updatedAt
      }
      nextToken
    }
  }
`;
