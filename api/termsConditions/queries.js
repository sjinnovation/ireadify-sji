export const getTermsConditions = /* GraphQL */ `
  query GetTermsConditions($id: ID!) {
    getTermsConditions(id: $id) {
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
export const listTermsConditionss = /* GraphQL */ `
  query ListTermsConditionss(
    $filter: ModelTermsConditionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTermsConditionss(
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
export const termsConditionsByOrder = /* GraphQL */ `
  query TermsConditionsByOrder(
    $isDeleted: Int
    $order: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTermsConditionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    TermsConditionsByOrder(
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
export const searchTermsConditionss = /* GraphQL */ `
  query SearchTermsConditionss(
    $filter: SearchableTermsConditionsFilterInput
    $sort: SearchableTermsConditionsSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchTermsConditionss(
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