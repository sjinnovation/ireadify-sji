export const getAbout = /* GraphQL */ `
  query GetAbout($id: ID!) {
    getAbout(id: $id) {
      id
      title
      content
      image
      order
      createdAt
      updatedAt
      isDeleted
    }
  }
`;
export const listAbouts = /* GraphQL */ `
  query ListAbouts(
    $filter: ModelAboutFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAbouts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        content
        image
        order
        createdAt
        updatedAt
        isDeleted
      }
      nextToken
    }
  }
`;
export const aboutByOrder = /* GraphQL */ `
  query AboutByOrder(
    $isDeleted: Int
    $order: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAboutFilterInput
    $limit: Int
    $nextToken: String
  ) {
    AboutByOrder(
      isDeleted: $isDeleted
      order: $order
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        content
        image
        order
        createdAt
        updatedAt
        isDeleted
      }
      nextToken
    }
  }
`;
export const searchAbouts = /* GraphQL */ `
  query SearchAbouts(
    $filter: SearchableAboutFilterInput
    $sort: SearchableAboutSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchAbouts(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
        id
        title
        content
        image
        order
        createdAt
        updatedAt
        isDeleted
      }
      nextToken
      total
    }
  }
`;