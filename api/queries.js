/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAuthor = /* GraphQL */ `
  query GetAuthor($id: ID!) {
    getAuthor(id: $id) {
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
export const listAuthors = /* GraphQL */ `
  query ListAuthors(
    $filter: ModelAuthorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAuthors(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getBook = /* GraphQL */ `
  query GetBook($id: ID!) {
    getBook(id: $id) {
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
    }
  }
`;
export const listBooks = /* GraphQL */ `
  query ListBooks(
    $filter: ModelBookFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBooks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      }
      nextToken
    }
  }
`;
export const getLanguage = /* GraphQL */ `
  query GetLanguage($id: ID!) {
    getLanguage(id: $id) {
      id
      name
      status
      createdAt
      updatedAt
    }
  }
`;
export const listLanguages = /* GraphQL */ `
  query ListLanguages(
    $filter: ModelLanguageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLanguages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getVideo = /* GraphQL */ `
  query GetVideo($id: ID!) {
    getVideo(id: $id) {
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
export const listVideos = /* GraphQL */ `
  query ListVideos(
    $filter: ModelVideoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVideos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getAgeRange = /* GraphQL */ `
  query GetAgeRange($id: ID!) {
    getAgeRange(id: $id) {
      id
      name
      isDeleted
      order
      createdAt
      updatedAt
    }
  }
`;
export const listAgeRanges = /* GraphQL */ `
  query ListAgeRanges(
    $filter: ModelAgeRangeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAgeRanges(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        isDeleted
        order
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAnalytics = /* GraphQL */ `
  query GetAnalytics($id: ID!) {
    getAnalytics(id: $id) {
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
export const listAnalyticss = /* GraphQL */ `
  query ListAnalyticss(
    $filter: ModelAnalyticsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAnalyticss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        videoId
        videos {
          id
          title
          description
          ageId
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
      nextToken
    }
  }
`;
export const getFavoriteBook = /* GraphQL */ `
  query GetFavoriteBook($id: ID!) {
    getFavoriteBook(id: $id) {
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
      }
      isLiked
      createdAt
      updatedAt
    }
  }
`;
export const listFavoriteBooks = /* GraphQL */ `
  query ListFavoriteBooks(
    $filter: ModelFavoriteBookFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFavoriteBooks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        bookId
        books {
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
        isLiked
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserSubscription = /* GraphQL */ `
  query GetUserSubscription($id: ID!) {
    getUserSubscription(id: $id) {
      id
      email
      subscriptionId
      isActive
      istrailPeriod
      subscriptionStartDate
      nextBillingDate
      createdAt
      updatedAt
      lastSummary
      type
      lastPaymentFailed
    }
  }
`;
export const listUserSubscriptions = /* GraphQL */ `
  query ListUserSubscriptions(
    $filter: ModelUserSubscriptionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserSubscriptions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        email
        subscriptionId
        isActive
        istrailPeriod
        subscriptionStartDate
        nextBillingDate
        createdAt
        updatedAt
        lastSummary
        type
        lastPaymentFailed
      }
      nextToken
    }
  }
`;
export const getContactAdmin = /* GraphQL */ `
  query GetContactAdmin($id: ID!) {
    getContactAdmin(id: $id) {
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
export const listContactAdmins = /* GraphQL */ `
  query ListContactAdmins(
    $filter: ModelContactAdminFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContactAdmins(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        name
        message
        createdAt
        updatedAt
        isDeleted
      }
      nextToken
    }
  }
`;
export const getRating = /* GraphQL */ `
  query GetRating($id: ID!) {
    getRating(id: $id) {
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
      }
      isRated
      myRating
      createdAt
      updatedAt
    }
  }
`;
export const listRatings = /* GraphQL */ `
  query ListRatings(
    $filter: ModelRatingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRatings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        bookId
        books {
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
        isRated
        myRating
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const authorByCreatedAt = /* GraphQL */ `
  query AuthorByCreatedAt(
    $isDeleted: Int
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAuthorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    authorByCreatedAt(
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
      nextToken
    }
  }
`;
export const bookByCreatedAt = /* GraphQL */ `
  query BookByCreatedAt(
    $isDeleted: Int
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelBookFilterInput
    $limit: Int
    $nextToken: String
  ) {
    bookByCreatedAt(
      isDeleted: $isDeleted
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      }
      nextToken
    }
  }
`;
export const videoByCreatedAt = /* GraphQL */ `
  query VideoByCreatedAt(
    $isDeleted: Int
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelVideoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    videoByCreatedAt(
      isDeleted: $isDeleted
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const ageByCreatedAt = /* GraphQL */ `
  query AgeByCreatedAt(
    $isDeleted: Int
    $order: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAgeRangeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ageByCreatedAt(
      isDeleted: $isDeleted
      order: $order
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        isDeleted
        order
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const userBySubscriptionId = /* GraphQL */ `
  query UserBySubscriptionId(
    $subscriptionId: String
    $sortDirection: ModelSortDirection
    $filter: ModelUserSubscriptionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userBySubscriptionId(
      subscriptionId: $subscriptionId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        email
        subscriptionId
        isActive
        istrailPeriod
        subscriptionStartDate
        nextBillingDate
        createdAt
        updatedAt
        lastSummary
        type
        lastPaymentFailed
      }
      nextToken
    }
  }
`;
export const userByemail = /* GraphQL */ `
  query UserByemail(
    $email: String
    $sortDirection: ModelSortDirection
    $filter: ModelUserSubscriptionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByemail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        email
        subscriptionId
        isActive
        istrailPeriod
        subscriptionStartDate
        nextBillingDate
        createdAt
        updatedAt
        lastSummary
        type
        lastPaymentFailed
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
    $filter: ModelContactAdminFilterInput
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
        updatedAt
        isDeleted
      }
      nextToken
    }
  }
`;
export const searchAuthors = /* GraphQL */ `
  query SearchAuthors(
    $filter: SearchableAuthorFilterInput
    $sort: SearchableAuthorSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchAuthors(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      total
    }
  }
`;
export const searchBooks = /* GraphQL */ `
  query SearchBooks(
    $filter: SearchableBookFilterInput
    $sort: SearchableBookSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchBooks(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      }
      nextToken
      total
    }
  }
`;
export const searchLanguages = /* GraphQL */ `
  query SearchLanguages(
    $filter: SearchableLanguageFilterInput
    $sort: SearchableLanguageSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchLanguages(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        status
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const searchVideos = /* GraphQL */ `
  query SearchVideos(
    $filter: SearchableVideoFilterInput
    $sort: SearchableVideoSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchVideos(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      total
    }
  }
`;
export const searchAgeRanges = /* GraphQL */ `
  query SearchAgeRanges(
    $filter: SearchableAgeRangeFilterInput
    $sort: SearchableAgeRangeSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchAgeRanges(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        isDeleted
        order
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const searchAnalyticss = /* GraphQL */ `
  query SearchAnalyticss(
    $filter: SearchableAnalyticsFilterInput
    $sort: SearchableAnalyticsSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchAnalyticss(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        videoId
        videos {
          id
          title
          description
          ageId
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
      nextToken
      total
    }
  }
`;
export const searchFavoriteBooks = /* GraphQL */ `
  query SearchFavoriteBooks(
    $filter: SearchableFavoriteBookFilterInput
    $sort: SearchableFavoriteBookSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchFavoriteBooks(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        email
        bookId
        books {
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
        isLiked
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const searchUserSubscriptions = /* GraphQL */ `
  query SearchUserSubscriptions(
    $filter: SearchableUserSubscriptionFilterInput
    $sort: SearchableUserSubscriptionSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchUserSubscriptions(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        email
        subscriptionId
        isActive
        istrailPeriod
        subscriptionStartDate
        nextBillingDate
        createdAt
        updatedAt
        lastSummary
        type
        lastPaymentFailed
      }
      nextToken
      total
    }
  }
`;
export const searchContactAdmins = /* GraphQL */ `
  query SearchContactAdmins(
    $filter: SearchableContactAdminFilterInput
    $sort: SearchableContactAdminSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchContactAdmins(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        email
        name
        message
        createdAt
        updatedAt
        isDeleted
      }
      nextToken
      total
    }
  }
`;
export const searchRatings = /* GraphQL */ `
  query SearchRatings(
    $filter: SearchableRatingFilterInput
    $sort: SearchableRatingSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchRatings(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        email
        bookId
        books {
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
        isRated
        myRating
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const getTestimonial = /* GraphQL */ `
  query GetTestimonial($id: ID!) {
    getTestimonial(id: $id) {
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
        updatedAt
        image
        isDeleted
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
        updatedAt
        image
        isDeleted
      }
      nextToken
    }
  }
`;
export const searchTestimonials = /* GraphQL */ `
  query SearchTestimonials(
    $filter: SearchableTestimonialFilterInput
    $sort: SearchableTestimonialSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchTestimonials(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        title
        testimonial
        createdAt
        updatedAt
        image
        isDeleted
      }
      nextToken
      total
    }
  }
`;
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
  ) {
    searchAbouts(
      filter: $filter
      sort: $sort
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
      total
    }
  }
`;
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
  ) {
    searchPrivacyPolicys(
      filter: $filter
      sort: $sort
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
      total
    }
  }
`;
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
  ) {
    searchTermsConditionss(
      filter: $filter
      sort: $sort
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
      total
    }
  }
`;
