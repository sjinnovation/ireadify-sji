import {  graphqlOperation, API } from 'aws-amplify';
import React , { useState, useEffect} from 'react'
import Layout from '../../../components/admin/layout/Layout';
import { searchLanguages as SearchLanguages} from '../../../api/queries'
import Spinner from "../../../components/admin/Spinner";
import { updateLanguage } from "../../../api/mutations";
import { useRouter } from 'next/router'

const index = () => {

    const router = useRouter()
    const { keyword } = router.query

     const [ languages, setLanguages ] = useState()
     const [isLoading, setLoading] = useState(true)
     const [keywordValue, setkeyWordValue ] = useState("")
     const [searchCancelButton , setSearchCancelButton] = useState(false)

    useEffect(() => {
        if(keyword){
            setkeyWordValue(keyword);
        }
        fetchAuthor(keyword)
    }, [keyword])

    let fetchAuthor = async (keyword)  => {
        setLoading(true)
        var condition = null
        if(keyword){
            condition = {
               filter : {   
                name: { matchPhrasePrefix: keyword}}
            }
            setSearchCancelButton(true)
        }  
        let  languages  = await API.graphql(graphqlOperation( SearchLanguages, {
            ...condition 
        }))
        setLanguages(languages.data.searchLanguages.items)
        setLoading(false)
      }

    let handleSearchText = (e) => {
        setkeyWordValue(e.target.value.trim())
    }  

    let searchLanguages = async ()  => {
        fetchAuthor(keywordValue)
        let Query = "?keyword=" + keywordValue;
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + Query;
        window.history.pushState({path:newurl},'',newurl);
    }
    
    const changeLanguageStatus = async (id , name, status) => {
     
            const inputData = {
                id: id,
                status : !status
            }
             await API.graphql(graphqlOperation(updateLanguage, { input: inputData }))
             let index = languages.findIndex(x=> x.id === id); 
             if (index !== -1){
                let temporaryarray = languages.slice();
                temporaryarray[index]["status"] = !status;
                setLanguages(temporaryarray);
            }
            alert(`${name} langauge status change`);
    }

    const cancelSearch = () => {
        setkeyWordValue("");
        setSearchCancelButton(false)
        fetchAuthor(null)
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.history.pushState({path:newurl},'',newurl);
    }

    return (
        <Layout>
            <div className="flex flex-1  flex-col md:flex-row lg:flex-row mx-2">
                <div className="mb-2 border-solid border-gray-300 rounded border shadow-sm w-full">
                    <div className="p-4">
                        <div className="bg-white flex border-solid border-black items-center rounded-full shadow-xl">
                            <input className="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none" name="keyword" value={keywordValue} onChange={handleSearchText} type="text" placeholder="Search by Language" />
                            {keywordValue === "" ?
                                <div className="p-4">
                                    <button disabled  className="bg-gray-400 text-white  py-2 px-4  mr-1 focus:outline-none  flex items-center justify-center">
                                        Search
                                    </button>
                                </div> 
                                :
                                <div className="p-4 flex flex-1">
                                    <button onClick={searchLanguages} className="bg-blue-500 text-white  py-2 px-4 mr-1 hover:bg-blue-400 focus:outline-none  flex items-center justify-center">
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
                        List Languages
                    </div>
                    
                    <div className="p-3">
                    {
                        isLoading ? <Spinner /> :
                        <table className="w-full rounded">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">Name</th>
                                    <th className="border px-4 py-2">Status</th>
                                    <th className="border px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                languages.map((item) => 
                                <tr className="text-center" key={item.id} >
                                    <td className="border px-4 py-2">{item.name}</td>
                                    <td className="border px-4 py-2">
                                    { item.status ? 
                                        <svg className="text-green-500 block m-auto w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg> : 
                                        <svg className="text-red-500 block m-auto w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    }
                                    </td>
                                    <td className="border px-4 py-2 ">
                                        <div className="flex flex-1 justify-center">                                            
                                            <span className="text-red-500 block w-4 cursor-pointer mx-2" onClick={() => changeLanguageStatus(item.id, item.name, item.status)}>
                                                <span>Change status</span>
                                                <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                                    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                                </svg> 
                                            </span> 
                                        </div>          
                                    </td>
                                </tr>) }
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
