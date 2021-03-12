import { graphqlOperation, API } from 'aws-amplify';
import React, { useState, useEffect } from 'react'
import Layout from '../../../components/admin/layout/Layout';
import { searchTestimonials as SearchTestimonial  } from '../../../api/queries'
import Link from 'next/link'
import moment from 'moment';
import Spinner from "../../../components/admin/Spinner";
import { updateTestimonial, deleteTestimonial } from "../../../api/testimonial/mutations";
import { isDeleted } from "../../../config/bootstarp"
import { useRouter } from 'next/router'

const index = () => {

    const router = useRouter()
    const { keyword } = router.query

    const [testimonial, setTestimonial] = useState()
    const [isLoading, setLoading] = useState(true)
    const [keywordValue, setKeyWordValue] = useState("")
    const [searchCancelButton, setSearchCancelButton] = useState(false)

    useEffect(() => {
        if (keyword) {
            setKeyWordValue(keyword);
        }
        fetchTestimonials(keyword)
    }, [keyword])

    let fetchTestimonials = async (keyword) => {
        setLoading(true)
        var condition = {
            filter : {
                isDeleted: { eq : isDeleted.no }
            }
        }
        if(keyword){
            condition = {
               filter : { 
                isDeleted: { eq : isDeleted.no },   
                name: { matchPhrasePrefix: keyword}}
            }
            setSearchCancelButton(true)
        }  
        let  testimonial  = await API.graphql(graphqlOperation( SearchTestimonial, {
            sort: {direction: 'desc', field: 'createdAt'},
            ...condition 
        }))
        setTestimonial(testimonial.data.searchTestimonials.items)
        setLoading(false)
    }

    let handleSearchText = (e) => {
        setKeyWordValue(e.target.value.trim())
    }

    let searchTestimonial = async () => {
        fetchTestimonials(keywordValue)
        let Query = "?keyword=" + keywordValue;
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + Query;
        window.history.pushState({ path: newurl }, '', newurl);
    }

    const deleteTestimonials = async (id, name) => {
        var isDelete = confirm("Are you sure to delete " + name + " testimonial ? ");
        if (isDelete == true) {
            const inputData = {
                id: id,
            }
            await API.graphql(graphqlOperation(deleteTestimonial, { input: inputData }))
            const filteredTestimonials = testimonial.filter(item => item.id !== id)
            setTestimonial(filteredTestimonials)
        }
    }

    const cancelSearch = () => {
        setKeyWordValue("");
        setSearchCancelButton(false)
        fetchTestimonials(null)
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.history.pushState({ path: newurl }, '', newurl);
    }

    return (
        <Layout>
            <div className="flex flex-1  flex-col md:flex-row lg:flex-row mx-2">
                <div className="mb-2 border-solid border-gray-300 rounded border shadow-sm w-full">
                    <div className="p-4">
                        <div className="bg-white flex border-solid border-black items-center rounded-full shadow-xl">
                            <input className="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none" name="keyword" value={keywordValue} onChange={handleSearchText} type="text" placeholder="Search by name..." />
                            {keywordValue === "" ?
                                <div className="p-4">
                                    <button disabled className="bg-gray-400 text-white  py-2 px-4  mr-1 focus:outline-none  flex items-center justify-center">
                                        Search
                                    </button>
                                </div>
                                :
                                <div className="p-4 flex flex-1">
                                    <button onClick={searchTestimonial} className="bg-blue-500 text-white  py-2 px-4 mr-1 hover:bg-blue-400 focus:outline-none  flex items-center justify-center">
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
                        List Testimonials
                    </div>

                    <div className="p-3">
                        {
                            isLoading ? <Spinner /> :
                                <table className="w-full rounded">
                                    <thead>
                                        <tr>
                                            <th className="border px-4 py-2">Name</th>
                                            <th className="border px-4 py-2">Title</th>
                                            {/* <th className="border px-4 py-2">Testimonial</th> */}
                                            <th className="border px-4 py-2">Created At</th>
                                            <th className="border px-4 py-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            testimonial.map((item) =>
                                                <tr className="text-center" key={item.id} >
                                                    <td className="border px-4 py-2">{item.name}</td>
                                                    <td className="border px-4 py-2">{item.title}</td>
                                                    {/* <td className="border px-4 py-2">{item.testimonial}</td> */}
                                                    <td className="border px-4 py-2">{moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                                    <td className="border px-4 py-2 ">
                                                        <div className="flex flex-1 justify-center">
                                                            <span className="text-red-500 block w-4 cursor-pointer mx-2 ">
                                                                <Link href={`/admin/testimonial/edit/${item.id}`}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                                                        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                                                    </svg>
                                                                </Link>
                                                            </span>

                                                            <span className="text-red-500 block w-4 cursor-pointer mx-2" onClick={() => deleteTestimonials(item.id, item.name)}>
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
