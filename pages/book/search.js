import React, { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { Auth } from 'aws-amplify';
import { graphqlOperation, API } from 'aws-amplify';
import { isDeleted } from '../../config/bootstarp'
import Layout from '../../components/layout/Home-Layout';
import { AuthContext } from '../../context/auth';
import { userRole } from '../../config/bootstarp'
import { listFavoriteBooks, searchBooks } from '../../api/search/queries';
import { createFavoriteBook, updateFavoriteBook } from '../../api/search/mutation';
import Link from 'next/link';
import Skeleton from '../../components/search/Skeleton';
import Loader from '../../components/Loader';

const bookDetails = () => {

    const [totalCount, setTotalCount] = useState()
    const [books, setSearchBooks] = useState(false)
    const [loading, setLoading] = useState(true);
    const [userCheckLoading, setUserCheckLoading] = useState(true);
    const router = useRouter()
    const { keyword } = router.query

    const { setUserDetails, changeLoginFormStatus, } = useContext(AuthContext)

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
                    let isSubscribed =  await fetchUserSubscription()
                    if(isSubscribed){
                        setUserCheckLoading(false)
                        if (keyword) {
                            fetchBook(keyword)
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

    }, [keyword])

    let fetchUserSubscription = async()=> {
        let  subscription  = await API.get('subscription', '/subscription/'+ Auth.user.attributes.email);
        if(subscription.data === null || (!subscription.data.isActive  && subscription.data.nextBillingDate < new Date().toISOString())){
           return false;
        }
        return true;
     }

    let fetchBook = async (keyword) => {
        try {
            let book = await API.graphql(graphqlOperation(searchBooks, {
                filter: {
                    isDeleted: { eq: isDeleted.no },
                    or: [
                        { title: { matchPhrasePrefix: keyword } }, { authorName: { matchPhrasePrefix: keyword } }]
                }
            }))

            const email = Auth.user.attributes.email
            let newBooks = book.data.searchBooks.items
            setTotalCount(book.data.searchBooks.total)

            let allFavBooks = await API.graphql(graphqlOperation(listFavoriteBooks, {
                filter: {
                    email: { eq: email }
                }
            }))

            var favoriteB = allFavBooks.data.listFavoriteBooks.items

            newBooks.forEach(element => {
                element.favorite = null;
                favoriteB.forEach(item => {
                    if (element.id === item.bookId) {
                        element.favorite = item;
                    }
                })
            })
            setSearchBooks(newBooks);
            setLoading(false)


        } catch (error) {
            console.log(error)
        }

    }

    function timeConvert(n) {
        var num = n;
        if (num < 60) {
            return num + " mins";
        }
        var hours = Math.floor(num / 60)
        return hours + " hour";
    }

    let onFavoriteClick = async (id, favoriteId, isLiked) => {
        let likeValue = !isLiked;
        let index = books.findIndex(x => x.id === id);
        if (index !== -1) {
            let temporaryarray = books.slice();
            temporaryarray[index]["favorite"]["isLiked"] = likeValue;
            setSearchBooks(temporaryarray);
        }
        const inputData = {
            id: favoriteId,
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
            setSearchBooks(temporaryarray);
        }
    }


    return (
        userCheckLoading ? <Loader /> :
            <Layout>
                <main className="">
                    <div className="bg-green-light pb-30 flex min-h-screen">
                        <div className="container mx-auto px-6 md:px-24">
                            <div className="sm:flex my-10">
                                <div className="sm:w-full sm:px-8">
                                    <div className="py-10 justify-items-center">
                                        <h3 className="text-purple-light font-sans font-semibold mb-6 text-center md:px-4">Search result</h3>
                                        {
                                            loading ? <Skeleton /> :
                                                <div>
                                                    <p className="text-body2 text-gray-light font-serif mb-6 text-center md:px-4">Search found {totalCount} matches for "{keyword}"</p>
                                                    <div className="overflow-x-auto">
                                                        { books.length > 0 ?
                                                        <table className="w-full">
                                                            <thead>
                                                                <tr>
                                                                    <th className="pl-12 py-2 whitespace-no-wrap text-left text-gray-light text-body2">Title/Author</th>
                                                                    <th className="pl-12 md:pl-6 py-2 whitespace-no-wrap text-left text-gray-light text-body2">Age Range</th>
                                                                    <th className="pl-6 py-2 whitespace-no-wrap text-left text-gray-light text-body2">Length</th>
                                                                    <th className="pl-6 py-2 whitespace-no-wrap text-left text-green-light text-body2">Rating</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    books.map(item => {
                                                                        return <tr key={item.id} className="bg-white border-b-8 border-green-light">
                                                                            <td className="pl-2.5 pr-6 py-4 whitespace-no-wrap">
                                                                                <div className="flex justify-start">
                                                                                    <div className="w-3/4 md:w-1/4">
                                                                                        <Link href={`/book/${item.id}`}><a> <div className="tbl-img"><img className="" src={item.image} width="118" height="176" alt="Book" /></div></a>
                                                                                        </Link>
                                                                                    </div>
                                                                                    <div className="w-1/4 md:w-3/4 flex justify-start place-self-center">
                                                                                        <div className="place-self-center ml-2">
                                                                                            <Link href={`/book/${item.id}`}><a><h5 className="text-5xl font-sans font-semibold leading-5 text-purple-light mb-2 mr-2">{item.title}</h5></a></Link>
                                                                                            <Link href={`/author/${item.authorId}`}><a><p className="text-body2 text-gray-light font-serif leading-5 mr-2">{item.authorName}</p></a></Link>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td className="pl-12 md:pl-6 py-4 whitespace-no-wrap"><p className="text-body2 text-gray-light font-serif leading-5">{item.age.name}</p></td>
                                                                            <td className="pl-6 py-4 whitespace-no-wrap"><p className="text-body2 text-gray-light font-serif leading-5">{timeConvert(item.duration)}</p></td>
                                                                            {item.favorite === null ?
                                                                                <td onClick={() => onNullFavoriteClick(item.id)} className="pl-6 cursor-pointer pr-2.5 py-4 whitespace-no-wrap"><img className="" src="/img/icons/heart.png" width="36" height="32" alt="Rating" /></td>
                                                                                :
                                                                                item.favorite.isLiked ?
                                                                                    <td onClick={() => onFavoriteClick(item.id, item.favorite.id, item.favorite.isLiked)} className="pl-6 cursor-pointer pr-2.5 py-4 whitespace-no-wrap"><img className="" src="/img/icons/filled-heart.png" width="36" height="32" alt="Rating" /></td>
                                                                                    :
                                                                                    <td onClick={() => onFavoriteClick(item.id, item.favorite.id, item.favorite.isLiked)} className="pl-6 cursor-pointer  pr-2.5 py-4 whitespace-no-wrap"><img className="" src="/img/icons/heart.png" width="36" height="32" alt="Rating" /></td>
                                                                            }

                                                                        </tr>
                                                                    })
                                                                }

                                                            </tbody>
                                                        </table> : null
                                                        }    
                                                    </div>
                                                </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </main>
            </Layout>
    )
}

export default bookDetails
