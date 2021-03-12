export const getPrivacyPolicy = /* GraphQL */ `
  query GetPrivacyPolicy($id: ID!) {
    getPrivacyPolicy(id: $id) {
      id
      title
      content
      order
      createdAt
      updatedAt
      isDeleted
    }
  }
`;
export const listPrivacyPolicys = /* GraphQL */ `
  query ListPrivacyPolicys(
    $filter: ModelPrivacyPolicyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPrivacyPolicys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        content
        order
        createdAt
        updatedAt
        isDeleted
      }
      nextToken
    }
  }
`;
export const privacyPolicyByOrder = /* GraphQL */ `
  query PrivacyPolicyByOrder(
    $isDeleted: Int
    $order: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPrivacyPolicyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    PrivacyPolicyByOrder(
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
        order
        createdAt
        updatedAt
        isDeleted
      }
      nextToken
    }
  }
`;
export const searchPrivacyPolicys = /* GraphQL */ `
  query SearchPrivacyPolicys(
    $filter: SearchablePrivacyPolicyFilterInput
    $sort: SearchablePrivacyPolicySortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchPrivacyPolicys(
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