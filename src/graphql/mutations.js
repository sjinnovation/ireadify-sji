/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAuthor = /* GraphQL */ `
  mutation CreateAuthor(
    $input: CreateAuthorInput!
    $condition: ModelAuthorConditionInput
  ) {
    createAuthor(input: $input, condition: $condition) {
      id
      name
      description
      status
      createdAt
      updatedAt
      image
      isDeleted
      books {
        items {
          id
          title
          description
          image
          ageId
          region
          isbn
          narrator
          status
          createdAt
          updatedAt
          isDeleted
          book
          bookType
          authorName
          authorId
          duration
          languageId
        }
        nextToken
      }
    }
  }
`;
export const updateAuthor = /* GraphQL */ `
  mutation UpdateAuthor(
    $input: UpdateAuthorInput!
    $condition: ModelAuthorConditionInput
  ) {
    updateAuthor(input: $input, condition: $condition) {
      id
      name
      description
      status
      createdAt
      updatedAt
      image
      isDeleted
      books {
        items {
          id
          title
          description
          image
          ageId
          region
          isbn
          narrator
          status
          createdAt
          updatedAt
          isDeleted
          book
          bookType
          authorName
          authorId
          duration
          languageId
        }
        nextToken
      }
    }
  }
`;
export const deleteAuthor = /* GraphQL */ `
  mutation DeleteAuthor(
    $input: DeleteAuthorInput!
    $condition: ModelAuthorConditionInput
  ) {
    deleteAuthor(input: $input, condition: $condition) {
      id
      name
      description
      status
      createdAt
      updatedAt
      image
      isDeleted
      books {
        items {
          id
          title
          description
          image
          ageId
          region
          isbn
          narrator
          status
          createdAt
          updatedAt
          isDeleted
          book
          bookType
          authorName
          authorId
          duration
          languageId
        }
        nextToken
      }
    }
  }
`;
export const createBook = /* GraphQL */ `
  mutation CreateBook(
    $input: CreateBookInput!
    $condition: ModelBookConditionInput
  ) {
    createBook(input: $input, condition: $condition) {
      id
      title
      description
      image
      ageId
      age {
        id
        name
        isDeleted
        order
        createdAt
        updatedAt
      }
      region
      isbn
      narrator
      status
      createdAt
      updatedAt
      isDeleted
      book
      bookType
      authorName
      authorId
      duration
      authors {
        id
        name
        description
        status
        createdAt
        updatedAt
        image
        isDeleted
        books {
          nextToken
        }
      }
      languageId
      languages {
        id
        name
        status
        createdAt
        updatedAt
      }
      ratings {
        items {
          id
          email
          bookId
          isRated
          myRating
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const updateBook = /* GraphQL */ `
  mutation UpdateBook(
    $input: UpdateBookInput!
    $condition: ModelBookConditionInput
  ) {
    updateBook(input: $input, condition: $condition) {
      id
      title
      description
      image
      ageId
      age {
        id
        name
        isDeleted
        order
        createdAt
        updatedAt
      }
      region
      isbn
      narrator
      status
      createdAt
      updatedAt
      isDeleted
      book
      bookType
      authorName
      authorId
      duration
      authors {
        id
        name
        description
        status
        createdAt
        updatedAt
        image
        isDeleted
        books {
          nextToken
        }
      }
      languageId
      languages {
        id
        name
        status
        createdAt
        updatedAt
      }
      ratings {
        items {
          id
          email
          bookId
          isRated
          myRating
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const deleteBook = /* GraphQL */ `
  mutation DeleteBook(
    $input: DeleteBookInput!
    $condition: ModelBookConditionInput
  ) {
    deleteBook(input: $input, condition: $condition) {
      id
      title
      description
      image
      ageId
      age {
        id
        name
        isDeleted
        order
        createdAt
        updatedAt
      }
      region
      isbn
      narrator
      status
      createdAt
      updatedAt
      isDeleted
      book
      bookType
      authorName
      authorId
      duration
      authors {
        id
        name
        description
        status
        createdAt
        updatedAt
        image
        isDeleted
        books {
          nextToken
        }
      }
      languageId
      languages {
        id
        name
        status
        createdAt
        updatedAt
      }
      ratings {
        items {
          id
          email
          bookId
          isRated
          myRating
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const createLanguage = /* GraphQL */ `
  mutation CreateLanguage(
    $input: CreateLanguageInput!
    $condition: ModelLanguageConditionInput
  ) {
    createLanguage(input: $input, condition: $condition) {
      id
      name
      status
      createdAt
      updatedAt
    }
  }
`;
export const updateLanguage = /* GraphQL */ `
  mutation UpdateLanguage(
    $input: UpdateLanguageInput!
    $condition: ModelLanguageConditionInput
  ) {
    updateLanguage(input: $input, condition: $condition) {
      id
      name
      status
      createdAt
      updatedAt
    }
  }
`;
export const deleteLanguage = /* GraphQL */ `
  mutation DeleteLanguage(
    $input: DeleteLanguageInput!
    $condition: ModelLanguageConditionInput
  ) {
    deleteLanguage(input: $input, condition: $condition) {
      id
      name
      status
      createdAt
      updatedAt
    }
  }
`;
export const createVideo = /* GraphQL */ `
  mutation CreateVideo(
    $input: CreateVideoInput!
    $condition: ModelVideoConditionInput
  ) {
    createVideo(input: $input, condition: $condition) {
      id
      title
      description
      ageId
      age {
        id
        name
        isDeleted
        order
        createdAt
        updatedAt
      }
      video
      status
      createdAt
      updatedAt
      duration
      image
      isDeleted
    }
  }
`;
export const updateVideo = /* GraphQL */ `
  mutation UpdateVideo(
    $input: UpdateVideoInput!
    $condition: ModelVideoConditionInput
  ) {
    updateVideo(input: $input, condition: $condition) {
      id
      title
      description
      ageId
      age {
        id
        name
        isDeleted
        order
        createdAt
        updatedAt
      }
      video
      status
      createdAt
      updatedAt
      duration
      image
      isDeleted
    }
  }
`;
export const deleteVideo = /* GraphQL */ `
  mutation DeleteVideo(
    $input: DeleteVideoInput!
    $condition: ModelVideoConditionInput
  ) {
    deleteVideo(input: $input, condition: $condition) {
      id
      title
      description
      ageId
      age {
        id
        name
        isDeleted
        order
        createdAt
        updatedAt
      }
      video
      status
      createdAt
      updatedAt
      duration
      image
      isDeleted
    }
  }
`;
export const createAgeRange = /* GraphQL */ `
  mutation CreateAgeRange(
    $input: CreateAgeRangeInput!
    $condition: ModelAgeRangeConditionInput
  ) {
    createAgeRange(input: $input, condition: $condition) {
      id
      name
      isDeleted
      order
      createdAt
      updatedAt
    }
  }
`;
export const updateAgeRange = /* GraphQL */ `
  mutation UpdateAgeRange(
    $input: UpdateAgeRangeInput!
    $condition: ModelAgeRangeConditionInput
  ) {
    updateAgeRange(input: $input, condition: $condition) {
      id
      name
      isDeleted
      order
      createdAt
      updatedAt
    }
  }
`;
export const deleteAgeRange = /* GraphQL */ `
  mutation DeleteAgeRange(
    $input: DeleteAgeRangeInput!
    $condition: ModelAgeRangeConditionInput
  ) {
    deleteAgeRange(input: $input, condition: $condition) {
      id
      name
      isDeleted
      order
      createdAt
      updatedAt
    }
  }
`;
export const createAnalytics = /* GraphQL */ `
  mutation CreateAnalytics(
    $input: CreateAnalyticsInput!
    $condition: ModelAnalyticsConditionInput
  ) {
    createAnalytics(input: $input, condition: $condition) {
      id
      email
      firstName
      lastName
      bookId
      books {
        id
        title
        description
        image
        ageId
        age {
          id
          name
          isDeleted
          order
          createdAt
          updatedAt
        }
        region
        isbn
        narrator
        status
        createdAt
        updatedAt
        isDeleted
        book
        bookType
        authorName
        authorId
        duration
        authors {
          id
          name
          description
          status
          createdAt
          updatedAt
          image
          isDeleted
        }
        languageId
        languages {
          id
          name
          status
          createdAt
          updatedAt
        }
        ratings {
          nextToken
        }
      }
      videoId
      videos {
        id
        title
        description
        ageId
        age {
          id
          name
          isDeleted
          order
          createdAt
          updatedAt
        }
        video
        status
        createdAt
        updatedAt
        duration
        image
        isDeleted
      }
      openedDate
      totalTime
      activity {
        id
        startTime
        endTime
        totalTime
        createdAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateAnalytics = /* GraphQL */ `
  mutation UpdateAnalytics(
    $input: UpdateAnalyticsInput!
    $condition: ModelAnalyticsConditionInput
  ) {
    updateAnalytics(input: $input, condition: $condition) {
      id
      email
      firstName
      lastName
      bookId
      books {
        id
        title
        description
        image
        ageId
        age {
          id
          name
          isDeleted
          order
          createdAt
          updatedAt
        }
        region
        isbn
        narrator
        status
        createdAt
        updatedAt
        isDeleted
        book
        bookType
        authorName
        authorId
        duration
        authors {
          id
          name
          description
          status
          createdAt
          updatedAt
          image
          isDeleted
        }
        languageId
        languages {
          id
          name
          status
          createdAt
          updatedAt
        }
        ratings {
          nextToken
        }
      }
      videoId
      videos {
        id
        title
        description
        ageId
        age {
          id
          name
          isDeleted
          order
          createdAt
          updatedAt
        }
        video
        status
        createdAt
        updatedAt
        duration
        image
        isDeleted
      }
      openedDate
      totalTime
      activity {
        id
        startTime
        endTime
        totalTime
        createdAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteAnalytics = /* GraphQL */ `
  mutation DeleteAnalytics(
    $input: DeleteAnalyticsInput!
    $condition: ModelAnalyticsConditionInput
  ) {
    deleteAnalytics(input: $input, condition: $condition) {
      id
      email
      firstName
      lastName
      bookId
      books {
        id
        title
        description
        image
        ageId
        age {
          id
          name
          isDeleted
          order
          createdAt
          updatedAt
        }
        region
        isbn
        narrator
        status
        createdAt
        updatedAt
        isDeleted
        book
        bookType
        authorName
        authorId
        duration
        authors {
          id
          name
          description
          status
          createdAt
          updatedAt
          image
          isDeleted
        }
        languageId
        languages {
          id
          name
          status
          createdAt
          updatedAt
        }
        ratings {
          nextToken
        }
      }
      videoId
      videos {
        id
        title
        description
        ageId
        age {
          id
          name
          isDeleted
          order
          createdAt
          updatedAt
        }
        video
        status
        createdAt
        updatedAt
        duration
        image
        isDeleted
      }
      openedDate
      totalTime
      activity {
        id
        startTime
        endTime
        totalTime
        createdAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createFavoriteBook = /* GraphQL */ `
  mutation CreateFavoriteBook(
    $input: CreateFavoriteBookInput!
    $condition: ModelFavoriteBookConditionInput
  ) {
    createFavoriteBook(input: $input, condition: $condition) {
      id
      email
      bookId
      books {
        id
        title
        description
        image
        ageId
        age {
          id
          name
          isDeleted
          order
          createdAt
          updatedAt
        }
        region
        isbn
        narrator
        status
        createdAt
        updatedAt
        isDeleted
        book
        bookType
        authorName
        authorId
        duration
        authors {
          id
          name
          description
          status
          createdAt
          updatedAt
          image
          isDeleted
        }
        languageId
        languages {
          id
          name
          status
          createdAt
          updatedAt
        }
        ratings {
          nextToken
        }
      }
      isLiked
      createdAt
      updatedAt
    }
  }
`;
export const updateFavoriteBook = /* GraphQL */ `
  mutation UpdateFavoriteBook(
    $input: UpdateFavoriteBookInput!
    $condition: ModelFavoriteBookConditionInput
  ) {
    updateFavoriteBook(input: $input, condition: $condition) {
      id
      email
      bookId
      books {
        id
        title
        description
        image
        ageId
        age {
          id
          name
          isDeleted
          order
          createdAt
          updatedAt
        }
        region
        isbn
        narrator
        status
        createdAt
        updatedAt
        isDeleted
        book
        bookType
        authorName
        authorId
        duration
        authors {
          id
          name
          description
          status
          createdAt
          updatedAt
          image
          isDeleted
        }
        languageId
        languages {
          id
          name
          status
          createdAt
          updatedAt
        }
        ratings {
          nextToken
        }
      }
      isLiked
      createdAt
      updatedAt
    }
  }
`;
export const deleteFavoriteBook = /* GraphQL */ `
  mutation DeleteFavoriteBook(
    $input: DeleteFavoriteBookInput!
    $condition: ModelFavoriteBookConditionInput
  ) {
    deleteFavoriteBook(input: $input, condition: $condition) {
      id
      email
      bookId
      books {
        id
        title
        description
        image
        ageId
        age {
          id
          name
          isDeleted
          order
          createdAt
          updatedAt
        }
        region
        isbn
        narrator
        status
        createdAt
        updatedAt
        isDeleted
        book
        bookType
        authorName
        authorId
        duration
        authors {
          id
          name
          description
          status
          createdAt
          updatedAt
          image
          isDeleted
        }
        languageId
        languages {
          id
          name
          status
          createdAt
          updatedAt
        }
        ratings {
          nextToken
        }
      }
      isLiked
      createdAt
      updatedAt
    }
  }
`;
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
      createdAt
      updatedAt
      image
      isDeleted
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
      updatedAt
      image
      isDeleted
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
      createdAt
      updatedAt
      image
      isDeleted
    }
  }
`;
export const updateContactAdmin = /* GraphQL */ `
  mutation UpdateContactAdmin(
    $input: UpdateContactAdminInput!
    $condition: ModelContactAdminConditionInput
  ) {
    updateContactAdmin(input: $input, condition: $condition) {
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
export const deleteContactAdmin = /* GraphQL */ `
  mutation DeleteContactAdmin(
    $input: DeleteContactAdminInput!
    $condition: ModelContactAdminConditionInput
  ) {
    deleteContactAdmin(input: $input, condition: $condition) {
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
export const createFaq = /* GraphQL */ `
  mutation CreateFaq(
    $input: CreateFaqInput!
    $condition: ModelFaqConditionInput
  ) {
    createFaq(input: $input, condition: $condition) {
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
export const updateFaq = /* GraphQL */ `
  mutation UpdateFaq(
    $input: UpdateFaqInput!
    $condition: ModelFaqConditionInput
  ) {
    updateFaq(input: $input, condition: $condition) {
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
export const deleteFaq = /* GraphQL */ `
  mutation DeleteFaq(
    $input: DeleteFaqInput!
    $condition: ModelFaqConditionInput
  ) {
    deleteFaq(input: $input, condition: $condition) {
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
export const createAbout = /* GraphQL */ `
  mutation CreateAbout(
    $input: CreateAboutInput!
    $condition: ModelAboutConditionInput
  ) {
    createAbout(input: $input, condition: $condition) {
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
export const updateAbout = /* GraphQL */ `
  mutation UpdateAbout(
    $input: UpdateAboutInput!
    $condition: ModelAboutConditionInput
  ) {
    updateAbout(input: $input, condition: $condition) {
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
export const deleteAbout = /* GraphQL */ `
  mutation DeleteAbout(
    $input: DeleteAboutInput!
    $condition: ModelAboutConditionInput
  ) {
    deleteAbout(input: $input, condition: $condition) {
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
export const createRating = /* GraphQL */ `
  mutation CreateRating(
    $input: CreateRatingInput!
    $condition: ModelRatingConditionInput
  ) {
    createRating(input: $input, condition: $condition) {
      id
      email
      bookId
      books {
        id
        title
        description
        image
        ageId
        age {
          id
          name
          isDeleted
          order
          createdAt
          updatedAt
        }
        region
        isbn
        narrator
        status
        createdAt
        updatedAt
        isDeleted
        book
        bookType
        authorName
        authorId
        duration
        authors {
          id
          name
          description
          status
          createdAt
          updatedAt
          image
          isDeleted
        }
        languageId
        languages {
          id
          name
          status
          createdAt
          updatedAt
        }
        ratings {
          nextToken
        }
      }
      isRated
      myRating
      createdAt
      updatedAt
    }
  }
`;
export const updateRating = /* GraphQL */ `
  mutation UpdateRating(
    $input: UpdateRatingInput!
    $condition: ModelRatingConditionInput
  ) {
    updateRating(input: $input, condition: $condition) {
      id
      email
      bookId
      books {
        id
        title
        description
        image
        ageId
        age {
          id
          name
          isDeleted
          order
          createdAt
          updatedAt
        }
        region
        isbn
        narrator
        status
        createdAt
        updatedAt
        isDeleted
        book
        bookType
        authorName
        authorId
        duration
        authors {
          id
          name
          description
          status
          createdAt
          updatedAt
          image
          isDeleted
        }
        languageId
        languages {
          id
          name
          status
          createdAt
          updatedAt
        }
        ratings {
          nextToken
        }
      }
      isRated
      myRating
      createdAt
      updatedAt
    }
  }
`;
export const deleteRating = /* GraphQL */ `
  mutation DeleteRating(
    $input: DeleteRatingInput!
    $condition: ModelRatingConditionInput
  ) {
    deleteRating(input: $input, condition: $condition) {
      id
      email
      bookId
      books {
        id
        title
        description
        image
        ageId
        age {
          id
          name
          isDeleted
          order
          createdAt
          updatedAt
        }
        region
        isbn
        narrator
        status
        createdAt
        updatedAt
        isDeleted
        book
        bookType
        authorName
        authorId
        duration
        authors {
          id
          name
          description
          status
          createdAt
          updatedAt
          image
          isDeleted
        }
        languageId
        languages {
          id
          name
          status
          createdAt
          updatedAt
        }
        ratings {
          nextToken
        }
      }
      isRated
      myRating
      createdAt
      updatedAt
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
