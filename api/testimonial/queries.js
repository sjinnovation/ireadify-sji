export const getTestimonial = /* GraphQL */ `
  query GetTestimonial($id: ID!) {
    getTestimonial(id: $id) {
      id
      name
      title
      testimonial
      createdAt
      image
      isDeleted
      updatedAt
    }
  }
`;
export const listTestimonials = /* GraphQL */ `
  query ListTestimonials(
    $filter: ModelTestimonialFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTestimonials(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        title
        testimonial
        createdAt
        image
        isDeleted
        updatedAt
      }
      nextToken
    }
  }
`;
export const testimonialByCreatedAt = /* GraphQL */ `
  query TestimonialByCreatedAt(
    $isDeleted: Int
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTestimonialFilterInput
    $limit: Int
    $nextToken: String
  ) {
    testimonialByCreatedAt(
      isDeleted: $isDeleted
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        title
        testimonial
        createdAt
        image
        isDeleted
        updatedAt
      }
      nextToken
    }
  }
`;
