import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const SearchBoxMobile = () => {

    const router = useRouter()
    const [keywordValue , setKeyword] = useState("")
    
    const { keyword } = router.query

    useEffect(() => {
        if(keyword){
            setKeyword(keyword);
        }
    }, [keyword])
    
    let onChange = async (e) => {
        setKeyword(e.target.value)
    }

    let searchBooks = async () => {
        router.push(`/book/search?keyword=${keywordValue}`)
    }

    let searchBooksOnEnter = async (e) => {
        if(keywordValue.trim()!== "" && e.key === 'Enter'){
            router.push(`/book/search?keyword=${keywordValue}`)
        }
        
    }

    return (
        <div className="flex relative flex-col w-72 text-left flex-none order-0 flex-grow-0 my-2">
           {
                keywordValue.trim() === ""?  
            <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                <svg width="18" height="20" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 17.3281C13.4183 17.3281 17 13.7464 17 9.32812C17 4.90985 13.4183 1.32812 9 1.32812C4.58172 1.32812 1 4.90985 1 9.32812C1 13.7464 4.58172 17.3281 9 17.3281Z" stroke="#777676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M18.9999 19.328L14.6499 14.978" stroke="#777676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            </span> 
            :
            <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                <button onClick={searchBooks} type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                    <svg width="18" height="20" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 17.3281C13.4183 17.3281 17 13.7464 17 9.32812C17 4.90985 13.4183 1.32812 9 1.32812C4.58172 1.32812 1 4.90985 1 9.32812C1 13.7464 4.58172 17.3281 9 17.3281Z" stroke="#777676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M18.9999 19.328L14.6499 14.978" stroke="#777676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </span> 
        }
            <input onChange={onChange} onKeyDown={searchBooksOnEnter} autoComplete="off" name="search" value={keywordValue} placeholder="Search by Title, Author, keywords..." type="text" className="ml-1 placeholder-gray-900 placeholder-opacity-80 focus:placeholder-gray-400 border-2 box-border rounded-lg pl-4 pr-2 py-2 px-1 leading-tight border-gray-300 bg-white-100 focus:outline-none focus:border-blue-800 focus:bg-white text-gray-600 font-serif text-small3" />
        </div>
    )
}

export default SearchBoxMobile
