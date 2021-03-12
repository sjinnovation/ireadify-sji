export const createTestimonial = /* GraphQL */ `
  mutation CreateTestimonial(
    $input: CreateTestimonialInput!
    $condition: ModelTestimonialConditionInput
  ) {
    createTestimonial(input: $input, condition: $condition) {
      id
      name
      title
      testimonial
      image
      createdAt
      updatedAt
    }
  }
`;

export const updateTestimonial = /* GraphQL */ `
  mutation UpdateTestimonial(
    $input: UpdateTestimonialInput!
    $condition: ModelTestimonialConditionInput
  ) {
    updateTestimonial(input: $input, condition: $condition) {
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

export const deleteTestimonial = /* GraphQL */ `
  mutation DeleteTestimonial(
    $input: DeleteTestimonialInput!
    $condition: ModelTestimonialConditionInput
  ) {
    deleteTestimonial(input: $input, condition: $condition) {
      id
      name
      title
      testimonial
      image
      createdAt
      updatedAt
    }
  }
`;
