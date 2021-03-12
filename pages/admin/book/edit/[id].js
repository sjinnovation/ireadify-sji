import React,  { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useForm } from "react-hook-form";
import { Storage, graphqlOperation, API} from 'aws-amplify';
import Layout from '../../../../components/admin/layout/Layout';
import config from '../../../../src/aws-exports';
import { useRouter } from 'next/router'
import { ageByCreatedAt, authorByCreatedAt, getBook, listLanguages } from '../../../../api/queries'
import SuccessAlert from '../../../../components/admin/SuccessAlert';
import { isDeleted, bookType, region as Region } from '../../../../config/bootstarp'
import { updateBook } from '../../../../src/graphql/mutations';
import _ from "lodash/fp";
import Spinner from '../../../../components/admin/Spinner';
import ReactAudioPlayer from 'react-audio-player';

const {
    aws_user_files_s3_bucket_region: region,
    aws_user_files_s3_bucket: bucket
} = config


const edit = () => {

    const [fileName, setFileName] = useState('')
    const [file, setFile] = useState('')
    const [bookName, setBookName] = useState('')
    const [bookFile, setBook] = useState('')
    const [fade , setFade] = useState(false);
    const [successAlert, setSucessAlert] = useState(false)
    const [ buttonLoading, setButtonLoading ] = useState(false)
    const [ authors, setAuthors ] = useState()
    const [ languages, setLanguages ] = useState()
    const [ checkBookType, setBookType] = useState(false)
    const [ singleBook, setSingleBook] = useState(false)
    const [ imageUploadingProgress, setImageUploadingProgress] = useState(0)
    const [ imageUploadingStart, setImageUploadingStart] = useState(false);
    const [ bookUploadingProgress, setBookUploadingProgress] = useState(0)
    const [ bookUploadingStart, setBookUploadingStart] = useState(false);
    const [ authorName , setAuthorName] = useState("")
    const [ ageRanges, setAgeRanges ] = useState()

    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        fetchAuthors()
        fetchLanguages()
        fetchAgeRange()
    }, [])

    useEffect(() => {
        let bookId = id;
        if(bookId){
            fetchBook(bookId)
        }
    }, [id])

    let fetchAuthors = async ()  => {
        let  authors  = await API.graphql(graphqlOperation(authorByCreatedAt, {
            isDeleted: isDeleted.no,
            sortDirection: 'DESC',
            filter : {
                status : { eq: true}
            }
        }))
        setAuthors(authors.data.authorByCreatedAt.items)
    }

    let fetchAgeRange = async ()  => {
        let  ageRanges  = await API.graphql(graphqlOperation(ageByCreatedAt, {
            isDeleted: isDeleted.no,
            sortDirection: 'ASC',
        }))
        setAgeRanges(ageRanges.data.ageByCreatedAt.items)
    }

    let fetchLanguages = async ()  => {
        let  languages  = await API.graphql(graphqlOperation(listLanguages, {
            filter : {
                status : { eq: true}
            }
        }))
        setLanguages(languages.data.listLanguages.items)
    }

    let fetchBook = async (bookId)  => {
        let  book  = await API.graphql(graphqlOperation(getBook,{ id: bookId }, {
            filter : {
                status : { eq: true}
            }
        }))
        setBookType(book.data.getBook.bookType)
        setSingleBook(book.data.getBook)
        setAuthorName(book.data.getBook.authorName)
    }

    const getAuthorName = (e) =>{
        var index = e.nativeEvent.target.selectedIndex;
        setAuthorName(e.nativeEvent.target[index].text)
    }

    const { register, errors, handleSubmit , setValue, reset} = useForm();

    const onSubmit = async (data) => {
        try {
            setButtonLoading(true)
            setSucessAlert(false)
            let url = ""
            if(file){
                const imageKey = `bookImages/${uuidv4()}${fileName}`;
                url = `https://${bucket}.s3.${region}.amazonaws.com/public/${imageKey}`
                setImageUploadingStart(true)
                await Storage.put(imageKey, file, {
                    level: 'public',
                    contentType: file.type,
                    progressCallback(progress) {
                        setImageUploadingProgress((progress.loaded/progress.total * 100).toFixed(1));
                    },
                });
                setImageUploadingProgress(0)
                setImageUploadingStart(false)
    
            }
            else {
                url = singleBook.image
            }
            let bookKey ="";
            var bookUrl = ""
            if(data.bookType === bookType.AUDIO) {
                if(bookFile){
                    bookKey = `books/${uuidv4()}${bookName}`;
                    bookUrl = `https://${bucket}.s3.${region}.amazonaws.com/public/${bookKey}`
                    setBookUploadingStart(true)
                    await Storage.put(bookKey, bookFile, {
                        level: 'public',
                        contentType: file.type,
                        progressCallback(progress) {
                            setBookUploadingProgress((progress.loaded/progress.total * 100).toFixed(1));
                        },
                    });
                    setBookUploadingProgress(0)
                    setBookUploadingStart(false)
                }
                else{
                    bookUrl = singleBook.book
                }
            }
            else {
                bookUrl = data.book;
            }
            
            
            
            let additionalData = data.bookType === bookType.AUDIO ? { narrator : data.narrator.trim()} : { isbn : data.isbn.trim() }
            const inputData = {
                id: id,
                ...additionalData,
                image: url,
                title:  data.title.trim(),
                description: data.description.trim(),
                status: data.status,
                bookType: data.bookType,
                authorId: data.authorId,
                region: data.region.trim(),
                ageId: data.ageId,
                languageId: data.languageId,
                duration: data.duration,
                book: bookUrl,
                authorName: authorName
            }
            
           await API.graphql(graphqlOperation(updateBook, { input: inputData }))
            let newBook = singleBook;
            newBook.image = url;
           
            
            newBook.book = bookUrl;
            
            setSingleBook(newBook);
           
            setSucessAlert(true)
            setButtonLoading(false)
            setFile('')
            setFileName('')
            setBook('')
            setBookName('')
        } catch (error) {
            console.log(error)
        }
    }    

    const handleImageChange = async (e) => {
        e.preventDefault()
        if (e.target.files[0]) {
            setFile(e.target.files[0])
            setFileName(e.target.files[0].name)
        }
        else{
            setFile('')
            setFileName('')
        }
    }

    const handleBookChange = async (e) => {
        e.preventDefault()
        if (e.target.files[0]) {
            setBook(e.target.files[0])
            setBookName(e.target.files[0].name)
        }
        else{
            setBook('')
            setBookName('')
        }
    }

    let changeBookType = (e) => {
        setBookType(e.target.value)
        setValue('isbn', '')
        setValue('narrator', '')
        setValue('book', '')
    } 

    const onAlerButtonClose = () => {
        setFade(true)
    }

    const onAlertAnimationEnd = () => {
        setSucessAlert(false)
        setFade(false)
    }

    return (
      
        <Layout>
            <SuccessAlert show={successAlert} fade={fade} message={"Book details are Saved."}hideAlert={onAlerButtonClose} animateAlert={onAlertAnimationEnd} />
            <div className="flex flex-1  flex-col md:flex-row lg:flex-row mx-2">

                <div className="mb-2 border-solid border-gray-300 rounded border shadow-sm w-full">
                    <div className="bg-blue-500 text-white text-bold px-2 py-3 border-solid border-gray-200 border-b">
                        Edit Book
                    </div>
                   { 
                        !singleBook ? <Spinner /> :
                        <div>  
                            <div className=" mt-4 mb-4 flex justify-center items-center">
                                <div className="group w-48 h-48 rounded-sm  overflow-hidden shadow-inner text-center bg-purple table cursor-pointer">
                                    <img src={singleBook.image} alt={singleBook.image} className="object-cover object-center w-full h-full visible group-hover:hidden" />    
                                </div>
                            </div>
                            <div className="p-3">
                                <form className="w-full" onSubmit={handleSubmit(onSubmit)} noValidate>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1">
                                                Title
                                            </label>
                                            <input defaultValue={singleBook.title} ref={register({ required: true, maxLength: 50, minLength: 2, validate: (value) => { return !!value.trim()} })} name="title" className="appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                                              type="text" placeholder="Title" />
                                            {_.get("title.type", errors) === "required" && ( <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                                            )}
                                            {_.get("title.type", errors) === "maxLength" && (
                                                <p className="text-red-500 text-xs italic">Title length must be greater than 2 and less than 51.</p>
                                            )} 
                                            {_.get("title.type", errors) === "minLength" && (
                                                <p className="text-red-500 text-xs italic">Title length must be greater than 2 and less than 51.</p>
                                            )} 
                                            
                                        </div>
                                        <div className="w-full md:w-1/3 px-3">
                                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1">
                                                Image
                                            </label>
                                            <input  accept="image/*" name="image" type="file" ref={register({ required: false, pattern: /(\.|\/)(jpeg|png|jpg)$/i })} className="appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey" onChange={handleImageChange} />
                                            {_.get("image.type", errors) === "pattern" && ( <p className="text-red-500 text-xs italic">File is not image.</p>
                                            )}
                                            <p className="text-blue-light text-xs font-light mb-1">Preferred Resolution: 508*764</p>
                                        </div>
                                        <div className="w-full md:w-1/3 px-3">
                                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1"
                                                    >
                                                Status
                                            </label>
                                            <input defaultChecked={singleBook.status}  type="checkbox" name="status"  ref={register} className="" />
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1">
                                                Age
                                            </label>
                                           <div className="relative">
                                                {
                                                    ageRanges ?
                                                <select name="ageId" defaultValue={singleBook.ageId} ref={register({ required: true, validate: value => value !== 'select' || 'error message'} )} className="block appearance-none w-full bg-grey-200 border border-grey-200 text-grey-darker py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-grey">
                                                    <option value="select">Select Age</option>
                                                    { ageRanges.map((item) => {
                                                            return  <option key={item.id} value={item.id}>{item.name}</option>
                                                        }) 
                                                    }   
                                                    
                                                </select> : null }
                                                {errors.ageId && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-grey-darker">
                                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20">
                                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                                    </svg>
                                                </div>
                                            </div>   
                                        </div>
                                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1">
                                                Author
                                            </label>
                                            <div className="relative">
                                                {
                                                    authors ?
                                                    <select defaultValue={singleBook.authorId} name="authorId" onChange={getAuthorName} ref={register({ required: true, validate: value => value !== 'select' || 'error message'} )} className="block appearance-none w-full bg-grey-200 border border-grey-200 text-grey-darker py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-grey">
                                                        <option value="select" >Select Author</option>
                                                        { authors.map((item) => {
                                                                return  <option key={item.id} value={item.id}>{item.name}</option>
                                                            }) 
                                                        }   
                                                        
                                                    </select> : null
                                                }    
                                                {errors.authorId && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-grey-darker">
                                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20">
                                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1">
                                                Language
                                            </label>
                                            <div className="relative">
                                                {
                                                    languages ?
                                                
                                                <select defaultValue={singleBook.languageId} name="languageId" ref={register({ required: true, validate: value => value !== 'select' || 'error message'} )} className="block appearance-none w-full bg-grey-200 border border-grey-200 text-grey-darker py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-grey">
                                                    <option value="select">Select Language</option>
                                                    { languages.map((item) => {
                                                            return  <option key={item.id} value={item.id}>{item.name}</option>
                                                        }) 
                                                    }   
                                                    
                                                </select>
                                                : null }
                                                {errors.languageId && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-grey-darker">
                                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20">
                                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1">
                                                Region
                                            </label>
                                            <div className="relative">
                                                <select defaultValue={singleBook.region} name="region" ref={register({ required: true, validate: value => value !== 'select' || 'error message'} )} className="block appearance-none w-full bg-grey-200 border border-grey-200 text-grey-darker py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-grey">
                                                    <option value="select">Select Region</option>
                                                    <option value={Region.region1}>{Region.region1}</option>
                                                    <option value={Region.region2}>{Region.region2}</option>
                                                    <option value={Region.region3}>{Region.region3}</option>
                                                    <option value={Region.region4}>{Region.region4}</option>
                                                    <option value={Region.region5}>{Region.region5}</option>  
                                                    
                                                </select>
                                                {errors.region && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-grey-darker">
                                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20">
                                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                                    </svg>
                                                </div>
                                            </div>  
                                            {/* <input defaultValue={singleBook.region} ref={register({ required: true, validate: (value) => { return !!value.trim()}})} name="region" className="appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                                                    type="text" placeholder="Region" />
                                            {errors.region && <p className="text-red-500 text-xs italic">Please fill out this field.</p>} */}
                                            
                                        </div>
                                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1">
                                                Duration(In minutes)
                                            </label>
                                            <input defaultValue={singleBook.duration} name="duration" ref={register({ required: true, min: 1} )} className="appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                                                type="number" placeholder="Duration" />
                                            {_.get("duration.type", errors) === "required" && ( <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                                            )}
                                            {_.get("duration.type", errors) === "min" && (
                                                <p className="text-red-500 text-xs italic">Duration must be greater than 1.</p>
                                            )} 
                                            
                                        </div>
                                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1">
                                                Book type
                                            </label>
                                            <div className="relative">
                                                <select defaultValue={singleBook.bookType} name="bookType" onChange={changeBookType} ref={register({ required: true, validate: value => value !== 'select' || 'error message'} )} className="block appearance-none w-full bg-grey-200 border border-grey-200 text-grey-darker py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-grey">
                                                    <option value={singleBook.bookType}>{singleBook.bookType}</option>
                                                    {/* <option value="select">Select Book type</option>
                                                    <option value={bookType.AUDIO}>{bookType.AUDIO}</option>
                                                    <option value={bookType.EPUB}>{bookType.EPUB}</option>      */}
                                                </select>
                                                {errors.bookType && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-grey-darker">
                                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20">
                                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        checkBookType === bookType.AUDIO ? 
                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                <label className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1">
                                                    Narrator
                                                </label>
                                                <input defaultValue={singleBook.narrator} ref={register({ required: true, validate: (value) => { return !!value.trim()} })} name="narrator" className="appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                                                        type="text" placeholder="Narrator" />
                                                {errors.narrator && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
                                                
                                            </div>
                                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                <label className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1">
                                                        Book
                                                    </label>
                                                    <input  accept=".mp3" name="book" type="file" ref={register({ required: false, pattern: /(\.|\/)(mp3)$/i })} className="appearance-none block w-full text-grey-darker border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white-500 focus:border-gray-600" onChange={handleBookChange} />
                                                   
                                                   {_.get("book.type", errors) === "pattern" && ( <p className="text-red-500 text-xs italic">File is not mp3 audio.</p>
                                                   )}
                                                    <ReactAudioPlayer className="mt-5"
                                                        src={singleBook.book}
                                                        controls
                                                        title={singleBook.title}
                                                    />
                                                       
                                            </div>
                                            
                                        </div> :
                                        checkBookType === bookType.EPUB ? 
                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                <label className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1">
                                                    Isbn
                                                </label>
                                                <input defaultValue={singleBook.isbn} ref={register({ required: true, validate: (value) => { return !!value.trim()} })} name="isbn" className="appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                                                        type="text" placeholder="Isbn" />
                                                {errors.isbn && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
                                                
                                            </div>
                                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                <label className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1">
                                                        Book
                                                </label>
                                                <input defaultValue={singleBook.book} ref={register({ required: true, validate: (value) => { return !!value.trim()} })} name="book" className="appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                                                        type="text" placeholder="Product Id" />
                                                {errors.book && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
                                                {/* <input  accept=".epub" name="book" type="file" ref={register({ required: false, pattern: /(\.|\/)(epub)$/i })} className="appearance-none block w-full text-grey-darker border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white-500 focus:border-gray-600" onChange={handleBookChange} />
                                                
                                                {_.get("book.type", errors) === "required" && ( <p className="text-red-500 text-xs italic">Product id required</p>
                                                )} */}
                                            </div>
                                        </div>
                                        : null
                                    }
                                
                                    
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1">
                                                Description
                                            </label>
                                            <textarea defaultValue={singleBook.description}  ref={register({ required: true, minLength: 20, validate: (value) => { return !!value.trim()} })} name="description" className="appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                                             type="text" placeholder="Description" />
                                            {_.get("description.type", errors) === "required" && ( <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                                            )}
                                            {_.get("description.type", errors) === "minLength" && (
                                                <p className="text-red-500 text-xs italic">Description length must be greater than 19.</p>
                                            )}          
                                        </div>
                                    </div>
                                    { imageUploadingStart ?  
                                        <div className="bg-green-500 mb-2 text-white text-bold px-2 py-3 border-solid border-gray-200 border-b">
                                            {`Image uploading status... ${imageUploadingProgress}/100`}
                                        </div>
                                    : null }
                                    { bookUploadingStart ?  
                                        <div className="bg-green-500 mb-2 text-white text-bold px-2 py-3 border-solid border-gray-200 border-b">
                                            {`Book uploading status... ${bookUploadingProgress}/100`}
                                        </div>
                                    : null }
                                    <div className="px-4 py-3 bg-gray-50 text-right mt-4 sm:px-6">
                                        {
                                            buttonLoading ?
                                            <button disabled type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-400  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                Saving...
                                            </button>
                                            :<button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                Save
                                            </button>
                                        }
                                        
                                    </div>
                                </form>
                            </div>
                        </div>    
                    }
                </div>
            </div>
        </Layout>
       
    )
}

export default edit
