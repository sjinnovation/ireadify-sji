import React, { useEffect, useState, useContext } from 'react'
import DefaultErrorPage from 'next/error'
import { useRouter } from 'next/router'
import { Auth } from 'aws-amplify';
import { graphqlOperation, API } from 'aws-amplify';
import { isDeleted, bookType } from '../../config/bootstarp'
import BookItem from '../../components/book/BookItem';
import Player from '../../components/book/Player';
import RecomendedBooks from '../../components/book/RecomendedBooks';
import Head from 'next/head';
import Epub from '../../components/book/Epub';
import { listRecomendedBooks, getBook, listFavoriteBooks } from '../../api/Book/queries';
import Layout from '../../components/layout/Home-Layout';
import { AuthContext } from '../../context/auth';
import { userRole } from '../../config/bootstarp'
import BookSkeleton from '../../components/book/BookSkeleton';
import { AnalyticsContext } from '../../context/analytics';
import { createAnalytics, createFavoriteBook, updateAnalytics, updateFavoriteBook } from '../../api/Book/mutation';
import { listAnalyticss } from '../../api/Book/queries';
import Loader from '../../components/Loader';
import { searchBooks } from '../../api/search/queries';

const bookDetails = () => {

    const [checkBookType, setBookType] = useState(false)
    const [bookDetails, setSingleBook] = useState(false)
    const [loading, setLoading] = useState(true);
    const [userCheckLoading, setUserCheckLoading] = useState(true);
    const [bookMedia, setBookMedia] = useState("")
    const [showAudioPlayer, setAudionPlayer] = useState(false)
    const [recomendedBooks, setRecomendedBooks] = useState([])
    const [recommendedloading, setRecomendedBookLoading] = useState(true);
    const [showErroPage, setErrorPage] = useState(false)
    const router = useRouter()
    const { id } = router.query

    const { setUserDetails, changeLoginFormStatus, } = useContext(AuthContext)
    const { setTrackDataDetails, setAnalytics } = useContext(AnalyticsContext)
    useEffect(() => {
        const checkUser = async () => {
            try {
                const user = await Auth.currentAuthenticatedUser()
                setUserDetails(user)

                let groups = user.signInUserSession.accessToken.payload["cognito:groups"];
                if (groups && groups.includes(userRole.admin)) {
                    router.push('/admin/author')
                }
                else {
                    let isSubscribed = await fetchUserSubscription()
                    if (isSubscribed) {
                        setUserCheckLoading(false)
                        let bookId = id;
                        if (bookId) {
                            fetchBook(bookId)
                        }
                    }
                    else {
                        await router.push('/subscription')
                    }

                }

            } catch (error) {
                await router.push('/' + '?redirect=book/' + id)
                changeLoginFormStatus()
            }
        }
        checkUser()

    }, [id])

    let fetchUserSubscription = async () => {
        let subscription = await API.get('subscription', '/subscription/' + Auth.user.attributes.email);
        if (subscription.data === null || (!subscription.data.isActive && subscription.data.nextBillingDate < new Date().toISOString())) {
            return false;
        }
        return true;
    }

    const changeAudioPlayerStatus = () => {
        setAudionPlayer(!showAudioPlayer)
    }

    let fetchBook = async (bookId) => {
        try {
            let book = await API.graphql(graphqlOperation(getBook, { id: bookId }, {
                filter: {
                    status: { eq: true },
                    isDeleted: { eq: isDeleted.no }
                }
            }))
            if (book.data.getBook === null) {
                setErrorPage(true)
            }
            else {
                setBookType(book.data.getBook.bookType)
                setSingleBook(book.data.getBook)
                setBookMedia(book.data.getBook.book)

                var newStartDate = new Date()
                newStartDate.setHours(0, 0, 0, 0)
                var newEndDate = new Date()

                var activity = await API.graphql(graphqlOperation(listAnalyticss, {
                    filter: {
                        bookId: { eq: bookId },
                        email: { eq: Auth.user.attributes.email },
                        createdAt: { le: newEndDate }, and: { createdAt: { gt: newStartDate } }
                    }
                }))
                if (activity.data.listAnalyticss.items && activity.data.listAnalyticss.items[0]) {
                    setTrackDataDetails(activity.data.listAnalyticss.items[0])
                    setAnalytics(activity.data.listAnalyticss.items[0].id)
                    localStorage.setItem('analyticsId', activity.data.listAnalyticss.items[0].id);
                    let trackDetails = {
                        id: activity.data.listAnalyticss.items[0].id,
                        updatedAt: new Date()
                    }

                    var result = await API.graphql(graphqlOperation(updateAnalytics, { input: trackDetails }))
                }
                else {
                    let trackDetails = {
                        email: Auth.user.attributes.email,
                        firstName: Auth.user.attributes["custom:first_name"],
                        lastName: Auth.user.attributes["custom:last_name"],
                        bookId: bookId,
                        videoId: "null",
                        totalTime: 0,
                        openedDate: new Date()
                    }

                    setTrackDataDetails(trackDetails)

                    var result = await API.graphql(graphqlOperation(createAnalytics, { input: trackDetails }))
                    setAnalytics(result.data.createAnalytics.id)
                    localStorage.setItem('analyticsId', result.data.createAnalytics.id);
                }
                setLoading(false)
                fetchRecomendedBook(bookId, book.data.getBook)
            }

        } catch (error) {
            console.log(error)
        }

    }

    let onFavoriteClick = async (bookId, id, isLiked) => {
        let likeValue = !isLiked;

        let index = recomendedBooks.findIndex(x => x.id === bookId);
        if (index !== -1) {
            let temporaryarray = recomendedBooks.slice();
            temporaryarray[index]["favorite"]["isLiked"] = likeValue;
            setRecomendedBooks(temporaryarray);
        }
        const inputData = {
            id: id,
            isLiked: likeValue
        }

        await API.graphql(graphqlOperation(updateFavoriteBook, { input: inputData }))

    }

    let onNullFavoriteClick = async (bookId) => {
        const email = Auth.user.attributes.email
        const inputData = {
            isLiked: true,
            bookId: bookId,
            email: email
        }
        let result = await API.graphql(graphqlOperation(createFavoriteBook, { input: inputData }))
        let index = recomendedBooks.findIndex(x => x.id === bookId);
        if (index !== -1) {
            let temporaryarray = recomendedBooks.slice();
            temporaryarray[index]["favorite"] = result.data.createFavoriteBook;;
            setRecomendedBooks(temporaryarray);
        }
    }

    let fetchRecomendedBook = async (bookId, book) => {
        try {
            let allBooks = await API.graphql(graphqlOperation(searchBooks, {
                filter: {
                    id: { ne: bookId },
                    authorId: { eq: book.authorId },
                    status: { eq: true },
                    isDeleted: { eq: isDeleted.no }
                },
                limit: 5
            }))
            var recomendedBooks = allBooks.data.searchBooks.items
            const email = Auth.user.attributes.email

            let allFavBooks = await API.graphql(graphqlOperation(listFavoriteBooks, {
                filter: {
                    email: { eq: email }
                }
            }))

            var favoriteB = allFavBooks.data.listFavoriteBooks.items
            recomendedBooks.forEach(element => {
                element.favorite = null;
                favoriteB.forEach(item => {
                    if (element.id === item.bookId) {
                        element.favorite = item;
                    }
                })
            })
            setRecomendedBooks(recomendedBooks)
            setRecomendedBookLoading(false);


        } catch (error) {
            console.log(error)
        }

    }

    return (
        userCheckLoading ? <Loader /> :
            <Layout>
                <Head>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.5/jszip.min.js"></script>
                    <script src="https://cdn.jsdelivr.net/npm/epubjs/dist/epub.min.js"></script>
                </Head>
                {
                    showErroPage ? <DefaultErrorPage /> :
                        loading ? <BookSkeleton /> :
                            <main className="">
                                <BookItem bookDetails={bookDetails} changeAudioPlayerStatus={changeAudioPlayerStatus} checkBookType={checkBookType} />
                                {
                                    showAudioPlayer ?
                                        bookType.AUDIO === bookDetails.bookType ?
                                            <Player bookMedia={bookMedia} changeAudioPlayerStatus={changeAudioPlayerStatus} bookDetails={bookDetails} /> :
                                            bookType.EPUB === bookDetails.bookType ?
                                                <Epub bookMedia={bookMedia} changeAudioPlayerStatus={changeAudioPlayerStatus} /> : null
                                        : null
                                }

                            </main>
                }
                <div>
                    {recommendedloading ? null :
                        <RecomendedBooks recomendedBooks={recomendedBooks} onFavoriteClick={onFavoriteClick} onNullFavoriteClick={onNullFavoriteClick} />
                    }
                </div>
            </Layout>
    )
}

export default bookDetails
