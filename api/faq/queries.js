export const getFaq = /* GraphQL */ `
  query GetFaq($id: ID!) {
    getFaq(id: $id) {
      id
      topic
      question
      answer
      createdAt
      updatedAt
      isDeleted
    }
  }
`;
export const listFaqs = /* GraphQL */ `
  query ListFaqs(
    $filter: ModelFaqFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFaqs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        topic
        question
        answer
        createdAt
        updatedAt
        isDeleted
      }
      nextToken
    }
  }
`;
export const faqByCreatedAt = /* GraphQL */ `
  query FaqByCreatedAt(
    $isDeleted: Int
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFaqFilterInput
    $limit: Int
    $nextToken: String
  ) {
    faqByCreatedAt(
      isDeleted: $isDeleted
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        topic
        question
        answer
        createdAt
        updatedAt
        isDeleted
      }
      nextToken
    }
  }
`;
export const searchFaqs = /* GraphQL */ `
  query SearchFaqs(
    $filter: SearchableFaqFilterInput
    $sort: SearchableFaqSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchFaqs(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        topic
        question
        answer
        createdAt
        updatedAt
        isDeleted
      }
      nextToken
      total
    }
  }
`;
