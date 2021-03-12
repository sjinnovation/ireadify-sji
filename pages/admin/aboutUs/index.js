import { graphqlOperation, API } from 'aws-amplify';
import React, { useState, useEffect } from 'react'
import Layout from '../../../components/admin/layout/Layout';
import Link from 'next/link'
import moment from 'moment';
import Spinner from "../../../components/admin/Spinner";
import { updateAbout } from "../../../api/aboutUs/mutations";
import { searchAbouts as SearchAbouts, listAboutUss } from '../../../api/queries'
import { isDeleted } from "../../../config/bootstarp"
import { useRouter } from 'next/router'

const index = () => {

    const router = useRouter()
    const { keyword } = router.query

    const [aboutUs, setAboutUs] = useState()
    const [isLoading, setLoading] = useState(true)
    const [keywordValue, setKeyWordValue] = useState("")
    const [searchCancelButton, setSearchCancelButton] = useState(false)

    useEffect(() => {
        if (keyword) {
            setKeyWordValue(keyword);
        }
        fetchAboutUs(keyword)
    }, [keyword])

    let fetchAboutUs = async (keyword) => {
        try {
            setLoading(true)
            var condition = {
                filter: {
                    isDeleted: { eq: isDeleted.no }
                }
            }
            if (keyword) {
                condition = {
                    filter: {
                        isDeleted: { eq: isDeleted.no },
                        title: { matchPhrasePrefix: keyword },
                    }
                }
                setSearchCancelButton(true)
            }
            let aboutUss = await API.graphql(graphqlOperation(SearchAbouts, {
                sort: { direction: 'asc', field: 'order' },
                ...condition
            }))
            setAboutUs(aboutUss.data.searchAbouts.items)
            setLoading(false)
        }
        catch
        (error) {
            console.log(error)
        }
    }

    let handleSearchText = (e) => {
        setKeyWordValue(e.target.value.trim())
    }

    let searchAbout = async () => {
        fetchAboutUs(keywordValue)
        let Query = "?keyword=" + keywordValue;
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + Query;
        window.history.pushState({ path: newurl }, '', newurl);
    }

    const deleteAbout = async (id, title) => {
        var isDelete = confirm("Are you sure to delete '" + title + "' About Us?");
        if (isDelete == true) {
            const inputData = {
                id: id,
                isDeleted: isDeleted.yes
            }
            await API.graphql(graphqlOperation(updateAbout, { input: inputData }))
            const filteredAboutUs = aboutUs.filter(item => item.id !== id)
            setAboutUs(filteredAboutUs)
        }
    }

    const cancelSearch = () => {
        setKeyWordValue("");
        setSearchCancelButton(false)
        fetchAboutUs(null)
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.history.pushState({ path: newurl }, '', newurl);
    }

    return (
        <Layout>
            <div className="flex flex-1  flex-col md:flex-row lg:flex-row mx-2">
                <div className="mb-2 border-solid border-gray-300 rounded border shadow-sm w-full">
                    <div className="p-4">
                        <div className="bg-white flex border-solid border-black items-center rounded-full shadow-xl">
                            <input className="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none" name="keyword" value={keywordValue} onChange={handleSearchText} type="text" placeholder="Search here..." />
                            {keywordValue === "" ?
                                <div className="p-4">
                                    <button disabled className="bg-gray-400 text-white  py-2 px-4  mr-1 focus:outline-none  flex items-center justify-center">
                                        Search
                                    </button>
                                </div>
                                :
                                <div className="p-4 flex flex-1">
                                    <button onClick={searchAbout} className="bg-blue-500 text-white  py-2 px-4 mr-1 hover:bg-blue-400 focus:outline-none  flex items-center justify-center">
                                        Search
                                    </button>
                                    {
                                        searchCancelButton ?
                                            <button onClick={cancelSearch} className="bg-red-500 text-white  py-2 px-4 hover:bg-red-400 focus:outline-none  flex items-center justify-center">
                                                Cancel
                                        </button>
                                            : null
                                    }
                                </div>
                            }

                        </div>
                    </div>

                    <div className="bg-blue-500 text-white text-bold px-2 py-3 border-solid border-gray-200 border-b">
                        List About Us
                    </div>

                    <div className="p-3">
                    <Link href="/admin/aboutUs/add">
                        <a className="flex align-baseline content-end justify-items-end m-1 p-1">
                            <button className="bg-green-500 text-white  py-2 px-4  mr-1 focus:outline-none  flex items-center justify-center">
                                Add
                            </button>
                        </a>
                    </Link>
                        {
                            isLoading ? <Spinner /> :
                                aboutUs.length === 0 ?
                                    <div>
                                        <p className="text-center">No Data</p>
                                    </div>
                                    :
                                    <table className="w-full rounded">
                                        <thead>
                                            <tr>
                                                <th className="border px-4 py-2">Order</th>
                                                <th className="border px-4 py-2">Title</th>
                                                {/* <th className="border px-4 py-2">Content</th> */}
                                                <th className="border px-4 py-2">Created At</th>
                                                <th className="border px-4 py-2">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                aboutUs.map((item) =>
                                                    <tr className="text-center" key={item.id} >
                                                        <td className="border px-4 py-2">{item.order}</td>
                                                        <td className="border px-4 py-2">{item.title}</td>
                                                        {/* <td className="border px-4 py-2">{item.content}</td> */}
                                                        <td className="border px-4 py-2">{moment(item.createdAt).format('L')}<br></br>{moment(item.createdAt).format('LTS')}</td>
                                                        <td className="border px-4 py-2 ">
                                                            <div className="flex flex-1 justify-center">
                                                                <span title="Edit" className="text-red-500 block w-4 cursor-pointer mx-2 ">
                                                                    <Link href={`/admin/aboutUs/edit/${item.id}`}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                                                            <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                                                        </svg>
                                                                    </Link>
                                                                </span>

                                                                <span title="Delete" className="text-red-500 block w-4 cursor-pointer mx-2" onClick={() => deleteAbout(item.id, item.title)}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                                    </svg>
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>)}
                                        </tbody>
                                    </table>
                        }
                    </div>

                </div>
            </div>

        </Layout>
    )
}

export default index
