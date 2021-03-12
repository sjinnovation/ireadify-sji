import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { graphqlOperation, API } from 'aws-amplify';
import { searchBooksDropDown as SearchBooks } from '../../api/search/queries';
import { isDeleted } from '../../config/bootstarp'
import Link from 'next/link';
import Highlighter from "react-highlight-words";


const SearchBox = () => {

    const router = useRouter()
    const [keywordValue , setKeyword] = useState("")
    const [searchDropDrown , setSearchDropDown] = useState([])
    const [showDropDown, setDropDown] = useState(false);
    
    const { keyword } = router.query

    useEffect(() => {
        if(keyword){
            setKeyword(keyword);
        }
    }, [keyword])
    
    let onChange = async (e) => {
        setKeyword(e.target.value)
        let book = await API.graphql(graphqlOperation(SearchBooks, {
            filter: {
                isDeleted : { eq: isDeleted.no },
                or:  [
                { title: {matchPhrasePrefix: e.target.value.trim()} }, { authorName: {matchPhrasePrefix: e.target.value.trim()}}]
            },
            limit: 7
        }))
        console.log(book.data.searchBooks.items)
        setSearchDropDown(book.data.searchBooks.items)
    }

    let searchBooks = async () => {
        setDropDown(false)
        router.push(`/book/search?keyword=${keywordValue}`)
    }

    let searchBooksOnEnter = async (e) => {
        if(keywordValue.trim()!== "" && e.key === 'Enter'){
            router.push(`/book/search?keyword=${keywordValue}`)
        }
        
    }


    return (
        <div  className="hidden tb-landscape:hidden lg:flex relative flex-col w-3/12 text-left flex-none order-0 flex-grow-0 p-0 my-0 ml-6 mr-4">
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
          
		    <input onChange={onChange} onKeyDown={searchBooksOnEnter} onFocus={()=>setDropDown(true)}  autoComplete="off" name="search" value={keywordValue} placeholder="Search by Title, Author, keywords..." type="text" className="ml-1 placeholder-gray-900 placeholder-opacity-80 focus:placeholder-gray-400 border-2 box-border rounded-lg pl-4 pr-2 py-2 px-1 leading-tight border-gray-300 bg-white-100 focus:outline-none focus:border-blue-800 focus:bg-white text-gray-600 font-serif text-small3" />
            
                {
                   showDropDown && searchDropDrown.length > 0 ?
                    <div id="search-drop-down"  className="search-dropdown pb-4 min-h-full overflow-y-auto border-blue-800">
                        {
                             searchDropDrown.map(item => {
                                return <Link href={`/book/${item.id}`} key={item.id}>
                                    <a>
                                        <div className="">
                                            <p className="text-base">  
                                                <Highlighter
                                                    highlightClassName="highlight-text"
                                                    searchWords={[keywordValue]}
                                                    autoEscape={true}
                                                    textToHighlight={item.title}
                                                />
                                            </p>
                                            <p className="search-text text-sm text-gray-600" >
                                                <svg className="mr-1.5 inline-block" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M13 2.1665C7.12727 2.1665 2.16669 7.12709 2.16669 12.9998C2.16669 16.4546 3.89135 19.5843 6.50002 21.5842V21.6665H6.61052C8.41752 23.0153 10.6308 23.8332 13 23.8332C15.3693 23.8332 17.5825 23.0153 19.3895 21.6665H19.5V21.5842C22.1087 19.5843 23.8334 16.4557 23.8334 12.9998C23.8334 7.12709 18.8728 2.1665 13 2.1665ZM8.74685 20.5041C8.9065 19.7819 9.30752 19.1358 9.88378 18.6722C10.46 18.2085 11.1771 17.9552 11.9167 17.9539H14.0834C14.8229 17.9554 15.5399 18.2088 16.1161 18.6724C16.6923 19.136 17.0934 19.782 17.2532 20.5041C15.9879 21.2375 14.534 21.6665 13 21.6665C11.466 21.6665 10.0122 21.2375 8.74685 20.5041ZM19.0775 19.1109C18.6643 18.1271 17.9701 17.287 17.0817 16.6958C16.1934 16.1046 15.1504 15.7886 14.0834 15.7873H11.9167C10.8496 15.7886 9.80664 16.1046 8.91831 16.6958C8.02998 17.287 7.33575 18.1271 6.92252 19.1109C5.33327 17.5303 4.33335 15.3572 4.33335 12.9998C4.33335 8.30142 8.3016 4.33317 13 4.33317C17.6984 4.33317 21.6667 8.30142 21.6667 12.9998C21.6667 15.3572 20.6668 17.5303 19.0775 19.1109Z" fill="#777676" />
                                                    <path d="M13 6.5C10.53 6.5 8.66669 8.36333 8.66669 10.8333C8.66669 13.3033 10.53 15.1667 13 15.1667C15.47 15.1667 17.3334 13.3033 17.3334 10.8333C17.3334 8.36333 15.47 6.5 13 6.5ZM13 13C11.7239 13 10.8334 12.1095 10.8334 10.8333C10.8334 9.55717 11.7239 8.66667 13 8.66667C14.2762 8.66667 15.1667 9.55717 15.1667 10.8333C15.1667 12.1095 14.2762 13 13 13Z" fill="#777676" />
                                                </svg> 
                                            <span className="search-text" >
                                                <Highlighter
                                                        highlightClassName="highlight-text"
                                                        searchWords={[keywordValue]}
                                                        autoEscape={true}
                                                        textToHighlight={item.authorName}
                                                />
                                                </span>
                                            </p>
                                        </div>
                                    </a>
                                
                                </Link>
                            })
                        }
                       
                     </div>
                    :
                null
                }
            
	    </div>
    )
}

export default SearchBox
