import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { Auth } from "aws-amplify";
import { graphqlOperation, API } from "aws-amplify";
import { isDeleted } from "../../config/bootstarp";
import AuthorItem from "../../components/author/AuthorItem";
import BooksByAuthor from "../../components/author/BooksByAuthor";
import Head from "next/head";
import { getAuthor } from "../../api/Author/queries";
import { listRatings } from "../../api/ratings/queries";
import Layout from "../../components/layout/Home-Layout";
import { AuthContext } from "../../context/auth";
import { userRole } from "../../config/bootstarp";
import AuthorSkeleton from "../../components/author/AuthorSkeleton";
import Loader from "../../components/Loader";
import { listFavoriteBooks } from "../../api/search/queries";
import {
  createFavoriteBook,
  updateFavoriteBook,
} from "../../api/Book/mutation";
import NotFound from "../../components/layout/NotFound";

const authorDetails = () => {
  const [authorDetails, setSingleAuthor] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userCheckLoading, setUserCheckLoading] = useState(true);
  const [booksByAuthor, setBooksByAuthor] = useState([]);
  const [noOtherBooksByAuthor, setNoOtherBooksByAuthor] = useState(false);
  const [showErrorPage, setErrorPage] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const { setUserDetails } = useContext(AuthContext);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setUserDetails(user);

        let groups =
          user.signInUserSession.accessToken.payload["cognito:groups"];
        if (groups && groups.includes(userRole.admin)) {
          router.push("/admin/author");
        } else {
          let isSubscribed = await fetchUserSubscription();
          if (isSubscribed) {
            setUserCheckLoading(false);
            let authorId = id;
            if (authorId) {
              fetchAuthor(authorId);
            }
          } else {
            await router.push("/subscription");
          }
        }
      } catch (error) {
        await router.push("/");
      }
    };
    checkUser();
  }, [id]);

  let onFavoriteClick = async (bookId, id, isLiked) => {
    let likeValue = !isLiked;

    let index = booksByAuthor.findIndex((x) => x.id === bookId);
    if (index !== -1) {
      let temporaryarray = booksByAuthor.slice();
      temporaryarray[index]["favorite"]["isLiked"] = likeValue;
      setBooksByAuthor(temporaryarray);
    }
    const inputData = {
      id: id,
      isLiked: likeValue,
    };

    await API.graphql(
      graphqlOperation(updateFavoriteBook, { input: inputData })
    );
  };

  let onNullFavoriteClick = async (bookId) => {
    const email = Auth.user.attributes.email;
    const inputData = {
      isLiked: true,
      bookId: bookId,
      email: email,
    };
    let result = await API.graphql(
      graphqlOperation(createFavoriteBook, { input: inputData })
    );
    let index = booksByAuthor.findIndex((x) => x.id === bookId);
    if (index !== -1) {
      let temporaryarray = booksByAuthor.slice();
      temporaryarray[index]["favorite"] = result.data.createFavoriteBook;
      setBooksByAuthor(temporaryarray);
    }
  };

  let fetchAuthor = async (authorId) => {
    try {
      let author = await API.graphql(
        graphqlOperation(
          getAuthor,
          { id: authorId },
          {
            // filter: {
            //     status: { eq: true },
            //     isDeleted: { eq: isDeleted.no }
            // }
          }
        )
      );
      if (
        author.data.getAuthor === null ||
        author.data.getAuthor.status === false ||
        author.data.getAuthor.isDeleted === isDeleted.yes
      ) {
        setErrorPage(true);
      } else {
        var otherBooks = author.data.getAuthor.books.items;
        const email = Auth.user.attributes.email;

        let allFavBooks = await API.graphql(
          graphqlOperation(listFavoriteBooks, {
            filter: {
              email: { eq: email },
            },
          })
        );

        var favoriteB = allFavBooks.data.listFavoriteBooks.items;
        otherBooks.forEach((element) => {
          element.favorite = null;
          favoriteB.forEach((item) => {
            if (element.id === item.bookId) {
              element.favorite = item;
            }
          });
        });

        let ratedBooks = await API.graphql(graphqlOperation(listRatings, {}));

        var rates = ratedBooks.data.listRatings.items;
        otherBooks.forEach((element) => {
          element.rated = null;
          rates.forEach((item) => {
            if (element.id === item.bookId) {
              element.rated = item;
            }
          });
        });
        otherBooks.forEach((element) => {
          let total = 0;
          element.averageRating = null;
          element.ratings.items.forEach((item) => {
            total = total + item.myRating;
          });
          if (total > 0) {
            element.averageRating = total / element.ratings.items.length;
          }
        });

        var noOtherBooks = author.data.getAuthor.books.items.length;
        setSingleAuthor(author.data.getAuthor);
        setBooksByAuthor(otherBooks);
        noOtherBooks === 0
          ? setNoOtherBooksByAuthor(true)
          : setNoOtherBooksByAuthor(false);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let fetchUserSubscription = async () => {
    let subscription = await API.get(
      "subscription",
      "/subscription/" + Auth.user.attributes.email
    );
    if (
      subscription.data === null ||
      (!subscription.data.isActive &&
        subscription.data.nextBillingDate < new Date().toISOString())
    ) {
      return false;
    }
    return true;
  };

  return userCheckLoading ? (
    <Loader />
  ) : (
    <Layout>
      <Head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.5/jszip.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/epubjs/dist/epub.min.js"></script>
      </Head>
      {showErrorPage ? (
        <NotFound message="Author not found." />
      ) : loading ? (
        <AuthorSkeleton />
      ) : (
        <main className="">
          <AuthorItem authorDetails={authorDetails} />
          <BooksByAuthor
            booksByAuthor={booksByAuthor}
            onFavoriteClick={onFavoriteClick}
            onNullFavoriteClick={onNullFavoriteClick}
            noOtherBooksByAuthor={noOtherBooksByAuthor}
          />
        </main>
      )}
    </Layout>
  );
};

export default authorDetails;
