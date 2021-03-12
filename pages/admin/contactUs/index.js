import { graphqlOperation, API } from 'aws-amplify';
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../../components/admin/layout/Layout';
import { contactUsByDateCreatedAt, searchContactAdmins as SearchContactAdmins } from '../../../api/queries'
import Spinner from "../../../components/admin/Spinner";
import { deleteContactUs } from '../../../api/contactUs/mutations'
import moment from 'moment';
import isDeleted from '../../../config/bootstarp'


const index = () => {

    const router = useRouter()
    const { keyword } = router.query

    const [contactUs, setContactUs] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [keywordValue, setKeyWordValue] = useState("")
    const [searchCancelButton, setSearchCancelButton] = useState(false)

    useEffect(() => {
        if (keyword) {
            setKeyWordValue(keyword);
        }
        fetchContactUs(keyword)
    }, [keyword])

    let fetchContactUs = async (keyword) => {
        setLoading(true)
        try {
            var condition = null
            if (keyword) {
                condition = {
                    filter: { name: { matchPhrasePrefix: keyword}}
                }
                setSearchCancelButton(true)
            }
            let contactUs = await API.graphql(graphqlOperation(SearchContactAdmins, {
                sort: {direction: 'desc', field: 'createdAt'},
                ...condition
            }))
            setContactUs(contactUs.data.searchContactAdmins.items)
        }
        catch (error) {
            console.log(error)
        }

        setLoading(false)
    }

    const onClickDeleteContactUs = async (id, name) => {
        var isDelete = confirm("Are you sure to delete " + name + "'s contact us query? ");
        if (isDelete == true) {
            const inputData = {
                id: id,
            }
            await API.graphql(graphqlOperation(deleteContactUs, { input: inputData }))
            const filteredList = contactUs.filter(item => item.id !== id)
            setContactUs(filteredList)
        }
    }

    let handleSearchText = (e) => {
        setKeyWordValue(e.target.value.trim())
    }

    let searchContactUs = async () => {
        fetchContactUs(keywordValue)
        let Query = "?keyword=" + keywordValue;
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + Query;
        window.history.pushState({ path: newurl }, '', newurl);
    }

    const cancelSearch = () => {
        setKeyWordValue("");
        setSearchCancelButton(false)
        fetchContactUs(null)
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.history.pushState({ path: newurl }, '', newurl);
    }

    return (
        <Layout>
            <div className="flex flex-1  flex-col md:flex-row lg:flex-row mx-2">
                <div className="mb-2 border-solid border-gray-300 rounded border shadow-sm w-full">
                    <div className="p-4">
                        <div className="bg-white flex border-solid border-black items-center rounded-full shadow-xl">
                            <input className="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none" name="keyword" value={keywordValue} onChange={handleSearchText} type="text" placeholder="Search by Name..." />
                            {keywordValue === "" ?
                                <div className="p-4">
                                    <button disabled className="bg-gray-400 text-white  py-2 px-4  mr-1 focus:outline-none  flex items-center justify-center">
                                        Search
                                    </button>
                                </div>
                                :
                                <div className="p-4 flex flex-1">
                                    <button onClick={searchContactUs} className="bg-blue-500 text-white  py-2 px-4 mr-1 hover:bg-blue-400 focus:outline-none  flex items-center justify-center">
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
                        Contact Us List
                    </div>

                    <div className="p-3">
                        {
                            isLoading ? <Spinner /> :
                            contactUs.length === 0 ?
                            <div>
                                <p className="text-center">No Data</p>
                            </div>
                            :
                                <table className="w-full rounded">
                                    <thead>
                                        <tr>
                                            <th className="border px-4 py-2">Name</th>
                                            <th className="border px-4 py-2">Email</th>
                                            <th className="border px-4 py-2">Message</th>
                                            <th className="border px-4 py-2">Created At</th>
                                            <th className="border px-4 py-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            contactUs.map((item) =>
                                                <tr className="text-center" key={item.id} >
                                                    <td className="border px-4 py-2">{item.name}</td>
                                                    <td className="border px-4 py-2">{item.email}</td>
                                                    <td className="border px-4 py-2">{item.message}</td>
                                                    <td className="border px-4 py-2">{item.createdAt === null ? "Date not added" : moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                                    <td className="border px-4 py-2 ">
                                                        <div className="flex flex-1 justify-center">
                                                            <span className="text-red-500 block w-4 cursor-pointer mx-2" onClick={() => onClickDeleteContactUs(item.id, item.name)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                                </svg>
                                                            </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
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
