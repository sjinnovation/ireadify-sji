import React, { useEffect, useState, useContext } from 'react'
import { graphqlOperation, API, Auth } from 'aws-amplify';
import Layout from '../../components/layout/Home-Layout';
import { AuthContext } from '../../context/auth';
import { listFavoriteBooks, bookByCreatedAt } from '../../api/Book/queries'
import { listRatings } from '../../api/ratings/queries'
import { createFavoriteBook, updateFavoriteBook } from '../../api/Book/mutation'
import { listLanguages } from '../../api/languages/queries'
import { ageByCreatedAt } from '../../api/age/queries'
import { useRouter } from 'next/router'
import { isDeleted, bookType, region, userRole } from "../../config/bootstarp"
import _ from 'lodash';
import Link from 'next/link'
import Skeleton from './skeletonBooks';
import SkeletonFilter from './skeletonFilter';
import Loader from '../../components/Loader';

const index = () => {

    const router = useRouter()
    const { keyword } = router.query

    const [books, setBooks] = useState()
    const [userCheckLoading, setUserCheckLoading] = useState(true);
    const [isBookLoading, setBookLoading] = useState(true);
    const [isLanguageLoading, setLanguageLoading] = useState(true);
    const [languages, setLanguages] = useState([])
    const [ageRanges, setAgeRanges] = useState([])
    const [bookTypeKeyValue, setBookTypeKeyValue] = useState("")
    const [ageKeyValue, setAgeKeyValue] = useState("")
    const [languageKeyValue, setLanguageKeyValue] = useState("")
    const [regionKeyValue, setRegionKeyValue] = useState("")
    const [noBooks, setNoBooks] = useState(false)
    const [keywordValue, setKeyWordValue] = useState({})
    const [totalBooks, setTotalBooks] = useState(0)
    const [sliceBook, setSliceBook] = useState(18)
    const [hideLoadMore, setHideLoadMore] = useState(false)


    const { setUserDetails } = useContext(AuthContext)

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
                        fetchBook(null)
                        fetchLanguages()
                        fetchAgeRange()
                    }
                    else {
                        await router.push('/subscription')
                    }

                }

            } catch (error) {
                await router.push('/')
                console.log(error)
            }
        }
        checkUser()
    }, [keyword])


    let fetchUserSubscription = async () => {
        let subscription = await API.get('subscription', '/subscription/' + Auth.user.attributes.email);
        if (subscription.data === null || (!subscription.data.isActive && subscription.data.nextBillingDate < new Date().toISOString())) {
            return false;
        }
        return true;
    }

    let fetchBook = async (keyword) => {
        setBookLoading(true)
        setNoBooks(false)
        var conditions = {
            filter: { status : { eq: true}}
        }

        if (keyword && _.isEmpty(keyword) === false) {
            conditions = {
                filter: { ...keyword,
                    status : { eq: true}
                }
            }
        }
        let allBooks = await API.graphql(graphqlOperation(bookByCreatedAt, {
            isDeleted: isDeleted.no,
            sortDirection: 'DESC',
            ...conditions
        }))

        var book = allBooks.data.bookByCreatedAt.items;

        book.forEach(element => {
            let total = 0
            element.averageRating = null
            element.ratings.items.forEach(item => {
                total = total + item.myRating
            }

            )
            if (total > 0) {
                element.averageRating = total / element.ratings.items.length
            }
        })
        const email = Auth.user.attributes.email

        let allFavBooks = await API.graphql(graphqlOperation(listFavoriteBooks, {
            filter: {
                email: { eq: email }
            }
        }))

        var favoriteB = allFavBooks.data.listFavoriteBooks.items
        book.forEach(element => {
            element.favorite = null;
            favoriteB.forEach(item => {
                if (element.id === item.bookId) {
                    element.favorite = item;
                }
            })
        })

        let ratedBooks = await API.graphql(graphqlOperation(listRatings, {
            filter: {
                email: { eq: email }
            }
        }))

        var rates = ratedBooks.data.listRatings.items
        book.forEach(element => {
            element.rated = null;
            rates.forEach(item => {
                if (element.id === item.bookId) {
                    element.rated = item;
                }
            })
        })

        setBooks(book)
        if (allBooks.data.bookByCreatedAt.items.length < 1) {
            setNoBooks(true)
        }
        setTotalBooks(book.length)
        setBookLoading(false)
    }

    let onFavoriteClick = async (bookId, id, isLiked) => {
        let likeValue = !isLiked;

        let index = books.findIndex(x => x.id === bookId);
        if (index !== -1) {
            let temporaryarray = books.slice();
            temporaryarray[index]["favorite"]["isLiked"] = likeValue;
            setBooks(temporaryarray);
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
        let index = books.findIndex(x => x.id === bookId);
        if (index !== -1) {
            let temporaryarray = books.slice();
            temporaryarray[index]["favorite"] = result.data.createFavoriteBook;;
            setBooks(temporaryarray);
        }
    }

    let fetchLanguages = async () => {
        setLanguageLoading(true)
        let allLanguages = await API.graphql(graphqlOperation(listLanguages, {
            sortDirection: 'DESC',
            filter: {
                status: { eq: true }
            }
        }))
        setLanguages(allLanguages.data.listLanguages.items)
        setLanguageLoading(false)
    }

    let fetchAgeRange = async () => {
        let ageRanges = await API.graphql(graphqlOperation(ageByCreatedAt, {
            isDeleted: isDeleted.no,
            sortDirection: 'ASC',
        }))
        setAgeRanges(ageRanges.data.ageByCreatedAt.items)
    }

    let onChangeBookType = (e) => {
        let bookTypeFilter = e.target.value;
        setBookTypeKeyValue(bookTypeFilter)
        let conditions = keywordValue
        if (bookTypeFilter === "default") {
            delete conditions.bookType
        }
        else {
            conditions.bookType =
            {
                eq: e.target.value
            }
        }

        setKeyWordValue(conditions)
        fetchBook(conditions)
    }

    let onChangeAge = (e) => {
        let ageFilter = e.target.value;
        setAgeKeyValue(ageFilter)
        let conditions = keywordValue
        if (ageFilter === "default") {
            delete conditions.ageId
        }
        else {
            conditions.ageId =
            {
                eq: e.target.value
            }
        }
        setKeyWordValue(conditions)
        fetchBook(conditions)
    }

    let onChangeLanguage = async (e) => {
        const languageFilter = e.target.value;
        setLanguageKeyValue(languageFilter)
        let conditions = keywordValue;
        if (languageFilter === "default") {
            delete conditions.languageId
        }
        else {
            conditions.languageId = {
                eq: e.target.value
            }
        }
        setKeyWordValue(conditions)
        fetchBook(conditions)
    }

    let onChangeRegion = (e) => {
        let regionFilter = e.target.value;
        setRegionKeyValue(regionFilter)
        let conditions = keywordValue
        if (regionFilter === "default") {
            delete conditions.region
        }
        else {
            conditions.region =
            {
                eq: e.target.value
            }
        }
        setKeyWordValue(conditions)
        fetchBook(conditions)
    }

    let onLoadMore = () => {
        if (sliceBook < totalBooks) {
            var totalOnScreen = sliceBook + 12;
            setSliceBook(totalOnScreen)
        }
        else {
            setHideLoadMore(true)
        }
    }

    let clearFilter = () => {
        setKeyWordValue({})
        setAgeKeyValue("")
        setLanguageKeyValue("")
        setRegionKeyValue("")
        setBookTypeKeyValue("")
        setNoBooks(false)
        fetchBook(keyword)
    }

    return (
        userCheckLoading ? <Loader /> :
            <Layout>
                <div className="bg-green-light flex min-h-screen">
                    <div className="container mx-auto my-4 md:my-14 md:px-14 px-4 w-full justify-center content-center">
                        {isLanguageLoading ? <SkeletonFilter /> :
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-4 mb-5 mx-30 my-30">
                                <div className="relative text-gray-600 focus-within:text-gray-400 flex justify-center mb-4">
                                    <div className="relative inline-block text-left dropdown">
                                        <p className="relative text-gray-700 flex mb-1 text-sm ml-1">Age Range</p>
                                        <select name="age" value={ageKeyValue} onChange={onChangeAge} id="age" className="inline-flex justify-center w-52 text-left rounded-md border border-gray-300 shadow-sm px-2 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-800">
                                            <option value="default">Select Age</option>
                                            {ageRanges.map((item) => {
                                                return <option key={item.id} value={item.id}>{item.name}</option>
                                            })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="relative text-gray-600 focus-within:text-gray-400 flex justify-center mb-4">
                                    <div className="relative inline-block text-left dropdown">
                                        <p className="relative text-gray-700 flex mb-1 text-sm ml-1">Region</p>
                                        <select value={regionKeyValue} onChange={onChangeRegion} name="region" id="region" className="inline-flex justify-center w-52 text-left rounded-md border border-gray-300 shadow-sm px-2 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-800">
                                            <option value="default">Select Region</option>
                                            <option value={region.region1}>{region.region1}</option>
                                            <option value={region.region2}>{region.region2}</option>
                                            <option value={region.region3}>{region.region3}</option>
                                            <option value={region.region4}>{region.region4}</option>
                                            <option value={region.region5}>{region.region5}</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="relative text-gray-600 focus-within:text-gray-400 flex justify-center mb-4">
                                    <div className="relative inline-block text-left dropdown">
                                        <p className="relative text-gray-700 flex mb-1 text-sm ml-1">Language</p>
                                        <select name="language" value={languageKeyValue} onChange={onChangeLanguage} id="language" className="inline-flex justify-center w-52 text-left rounded-md border border-gray-300 shadow-sm px-2 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-800">
                                            <option value="default">Select Language</option>
                                            {languages.map((item) => {
                                                return <option key={item.id} value={item.id}>{item.name}</option>
                                            })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="relative text-gray-600 focus-within:text-gray-400 flex justify-center mb-4">
                                    <div className="relative inline-block text-left dropdown">
                                        <p className="relative text-gray-700 flex mb-1 text-sm ml-1">Book Type</p>
                                        <select name="bookType" value={bookTypeKeyValue} onChange={onChangeBookType} placeholder="Book Type" id="type" className="inline-flex justify-center w-52 text-left rounded-md border border-gray-300 shadow-sm px-2 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-800">
                                            <option value="default">Select Type</option>
                                            <option value={bookType.AUDIO}>{bookType.AUDIO}</option>
                                            <option value={bookType.EPUB}>EBOOK</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            isBookLoading ? <Skeleton /> :
                                <div className="flex flex-wrap justify-center">
                                    {
                                        noBooks ?
                                            <div className="flex flex-col justify-center content-center">
                                                <div><p className="text-lg text-center">No Books</p></div>
                                                <button className="text-sm text-gray-500 bg-red-50 rounded-md p-2 m-1 border-gray-200" onClick={clearFilter}>Clear Filters</button>
                                            </div>

                                            :
                                            books.slice(0, sliceBook).map((item) => {
                                                return (
                                                    <div key={item.id} className="flex-col relative mb-8 mx-3 pb-5 grid grid-cols-1 gap-4 duration-400 ease-in-out transform hover:-translate-y-1 hover:scale-110 transition-shadow hover:shadow-xl">
                                                        <div className="relative w-48 h-60 mb-20 bg-green-400 shadow-inner">
                                                            <Link href={`/book/${item.id}`}>
                                                                <div className="cursor-pointer inner-shadow img-book">
                                                                    <img className="bg-gray-900 bg-opacity-10" src={item.image} width="350" height="450" alt="image" />
                                                                </div>
                                                            </Link>
                                                            <div className="flex absolute justify-between p-2 shadow-inner top-0 w-full h-20 bg-ratings">
                                                                {
                                                                    item.favorite === null ?
                                                                        <div className="flex cursor-pointer" onClick={() => onNullFavoriteClick(item.id)}>
                                                                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M20.8401 5.08155C20.3294 4.57056 19.7229 4.1652 19.0555 3.88864C18.388 3.61207 17.6726 3.46973 16.9501 3.46973C16.2276 3.46973 15.5122 3.61207 14.8448 3.88864C14.1773 4.1652 13.5709 4.57056 13.0601 5.08155L12.0001 6.14155L10.9401 5.08155C9.90843 4.04986 8.50915 3.47026 7.05012 3.47026C5.59109 3.47026 4.19181 4.04986 3.16012 5.08155C2.12843 6.11325 1.54883 7.51252 1.54883 8.97155C1.54883 10.4306 2.12843 11.8299 3.16012 12.8616L4.22012 13.9216L12.0001 21.7016L19.7801 13.9216L20.8401 12.8616C21.3511 12.3508 21.7565 11.7444 22.033 11.0769C22.3096 10.4095 22.4519 9.69404 22.4519 8.97155C22.4519 8.24907 22.3096 7.53366 22.033 6.8662C21.7565 6.19874 21.3511 5.59231 20.8401 5.08155V5.08155Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                            </svg>
                                                                        </div> :
                                                                        item.favorite.isLiked === true ?
                                                                            <div className="flex cursor-pointer" onClick={() => onFavoriteClick(item.id, item.favorite.id, item.favorite.isLiked)}>
                                                                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path d="M20.84 5.08155C20.3292 4.57056 19.7228 4.1652 19.0554 3.88864C18.3879 3.61207 17.6725 3.46973 16.95 3.46973C16.2275 3.46973 15.5121 3.61207 14.8446 3.88864C14.1772 4.1652 13.5708 4.57056 13.06 5.08155L12 6.14155L10.94 5.08155C9.9083 4.04986 8.50903 3.47026 7.05 3.47026C5.59096 3.47026 4.19169 4.04986 3.16 5.08155C2.1283 6.11325 1.54871 7.51252 1.54871 8.97155C1.54871 10.4306 2.1283 11.8299 3.16 12.8616L4.22 13.9216L12 21.7016L19.78 13.9216L20.84 12.8616C21.351 12.3508 21.7563 11.7444 22.0329 11.0769C22.3095 10.4095 22.4518 9.69404 22.4518 8.97155C22.4518 8.24907 22.3095 7.53366 22.0329 6.8662C21.7563 6.19874 21.351 5.59231 20.84 5.08155Z" fill="#DB3B3E" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                                </svg>
                                                                            </div>
                                                                            :
                                                                            <div className="flex cursor-pointer" onClick={() => onFavoriteClick(item.id, item.favorite.id, item.favorite.isLiked)}>
                                                                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path d="M20.8401 5.08155C20.3294 4.57056 19.7229 4.1652 19.0555 3.88864C18.388 3.61207 17.6726 3.46973 16.9501 3.46973C16.2276 3.46973 15.5122 3.61207 14.8448 3.88864C14.1773 4.1652 13.5709 4.57056 13.0601 5.08155L12.0001 6.14155L10.9401 5.08155C9.90843 4.04986 8.50915 3.47026 7.05012 3.47026C5.59109 3.47026 4.19181 4.04986 3.16012 5.08155C2.12843 6.11325 1.54883 7.51252 1.54883 8.97155C1.54883 10.4306 2.12843 11.8299 3.16012 12.8616L4.22012 13.9216L12.0001 21.7016L19.7801 13.9216L20.8401 12.8616C21.3511 12.3508 21.7565 11.7444 22.033 11.0769C22.3096 10.4095 22.4519 9.69404 22.4519 8.97155C22.4519 8.24907 22.3096 7.53366 22.033 6.8662C21.7565 6.19874 21.3511 5.59231 20.8401 5.08155V5.08155Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                                </svg>
                                                                            </div>
                                                                }
                                                                <div className="flex justify-center">
                                                                    {
                                                                        item.averageRating === null ?
                                                                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M11 1L14.09 7.26L21 8.27L16 13.14L17.18 20.02L11 16.77L4.82 20.02L6 13.14L1 8.27L7.91 7.26L11 1Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                            </svg> :

                                                                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M11 1L14.09 7.26L21 8.27L16 13.14L17.18 20.02L11 16.77L4.82 20.02L6 13.14L1 8.27L7.91 7.26L11 1Z" fill="#FFD700" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                            </svg>

                                                                    }
                                                                    {
                                                                        item.averageRating === null ? null :
                                                                            <span className="ml-1 pb-1 font-semibold text-subtitle1 text-white">{Math.round(item.averageRating * 10) / 10}</span>
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="flex justify-center absolute -bottom-12 pt-4 pb-2 shadow-inner w-full bg-play">
                                                                {
                                                                    item.bookType === bookType.AUDIO ?
                                                                        <svg className="m-1 " width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M3.5 18V12C3.5 9.61305 4.44821 7.32387 6.13604 5.63604C7.82387 3.94821 10.1131 3 12.5 3C14.8869 3 17.1761 3.94821 18.864 5.63604C20.5518 7.32387 21.5 9.61305 21.5 12V18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                            <path d="M21.5 19C21.5 19.5304 21.2893 20.0391 20.9142 20.4142C20.5391 20.7893 20.0304 21 19.5 21H18.5C17.9696 21 17.4609 20.7893 17.0858 20.4142C16.7107 20.0391 16.5 19.5304 16.5 19V16C16.5 15.4696 16.7107 14.9609 17.0858 14.5858C17.4609 14.2107 17.9696 14 18.5 14H21.5V19ZM3.5 19C3.5 19.5304 3.71071 20.0391 4.08579 20.4142C4.46086 20.7893 4.96957 21 5.5 21H6.5C7.03043 21 7.53914 20.7893 7.91421 20.4142C8.28929 20.0391 8.5 19.5304 8.5 19V16C8.5 15.4696 8.28929 14.9609 7.91421 14.5858C7.53914 14.2107 7.03043 14 6.5 14H3.5V19Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                        </svg> :
                                                                        <svg className="m-1" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M2.5 3H8.5C9.56087 3 10.5783 3.42143 11.3284 4.17157C12.0786 4.92172 12.5 5.93913 12.5 7V21C12.5 20.2044 12.1839 19.4413 11.6213 18.8787C11.0587 18.3161 10.2956 18 9.5 18H2.5V3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                            <path d="M22.5 3H16.5C15.4391 3 14.4217 3.42143 13.6716 4.17157C12.9214 4.92172 12.5 5.93913 12.5 7V21C12.5 20.2044 12.8161 19.4413 13.3787 18.8787C13.9413 18.3161 14.7044 18 15.5 18H22.5V3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                        </svg>
                                                                }
                                                            </div>
                                                            <div className="flex flex-col truncate">
                                                                <Link href={`/book/${item.id}`}><h5 className="cursor-pointer flex font-sans text-4xl font-semibold text-gray-700">{item.title}</h5></Link>
                                                                <Link href={`/author/${item.authorId}`}><p className="cursor-pointer flex font-serif text-small1 text-gray-500">{item.authorName}</p></Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                    }
                                </div>
                        }
                        <div className="w-full justify-center flex">
                            {
                                !hideLoadMore ?
                                    <button onClick={onLoadMore} className="cursor-pointer rounded w-full my-8 inline-flex justify-center border-2 shadow-sm px-11 py-2 bg-gradient-to-r from-purple-bright to-purple-bright text-small4 font-semibold text-white hover:from-purple-darkest hover:to-blue-bright focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-100 sm:w-auto sm:text-small4 font-sans">
                                        Load more
                            </button>
                                    :
                                    <p className="flex font-sans italic text-sm font-semibold text-gray-500">that's all folks</p>
                            }
                        </div>
                    </div>
                </div>
            </Layout>
    )
}

export default index
