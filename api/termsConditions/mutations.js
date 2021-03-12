export const createTermsConditions = /* GraphQL */ `
  mutation CreateTermsConditions(
    $input: CreateTermsConditionsInput!
    $condition: ModelTermsConditionsConditionInput
  ) {
    createTermsConditions(input: $input, condition: $condition) {
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
export const updateTermsConditions = /* GraphQL */ `
  mutation UpdateTermsConditions(
    $input: UpdateTermsConditionsInput!
    $condition: ModelTermsConditionsConditionInput
  ) {
    updateTermsConditions(input: $input, condition: $condition) {
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
export const deleteTermsConditions = /* GraphQL */ `
  mutation DeleteTermsConditions(
    $input: DeleteTermsConditionsInput!
    $condition: ModelTermsConditionsConditionInput
  ) {
    deleteTermsConditions(input: $input, condition: $condition) {
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