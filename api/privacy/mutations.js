export const createPrivacyPolicy = /* GraphQL */ `
  mutation CreatePrivacyPolicy(
    $input: CreatePrivacyPolicyInput!
    $condition: ModelPrivacyPolicyConditionInput
  ) {
    createPrivacyPolicy(input: $input, condition: $condition) {
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
export const updatePrivacyPolicy = /* GraphQL */ `
  mutation UpdatePrivacyPolicy(
    $input: UpdatePrivacyPolicyInput!
    $condition: ModelPrivacyPolicyConditionInput
  ) {
    updatePrivacyPolicy(input: $input, condition: $condition) {
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
export const deletePrivacyPolicy = /* GraphQL */ `
  mutation DeletePrivacyPolicy(
    $input: DeletePrivacyPolicyInput!
    $condition: ModelPrivacyPolicyConditionInput
  ) {
    deletePrivacyPolicy(input: $input, condition: $condition) {
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
export const createContactAdmin = /* GraphQL */ `
  mutation CreateContactAdmin(
    $input: CreateContactAdminInput!
    $condition: ModelContactAdminConditionInput
  ) {
    createContactAdmin(input: $input, condition: $condition) {
      id
      email
      name
      message
      createdAt
      updatedAt
      isDeleted
    }
  }
`;
