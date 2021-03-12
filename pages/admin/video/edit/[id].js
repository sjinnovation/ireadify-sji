import React,  { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useForm } from "react-hook-form";
import {  Storage, graphqlOperation, API } from 'aws-amplify';
import { useRouter } from 'next/router'
import Layout from '../../../../components/admin/layout/Layout';
import config from '../../../../src/aws-exports'
import { updateVideo } from '../../../../api/mutations'
import useSWR from 'swr'
import { ageByCreatedAt, getVideo } from '../../../../api/queries';
import SuccessAlert from '../../../../components/admin/SuccessAlert';
import Spinner from '../../../../components/admin/Spinner';
import _ from "lodash/fp";
import { isDeleted } from '../../../../config/bootstarp'
import Vimeo from '@u-wave/react-vimeo';

const {
    aws_user_files_s3_bucket_region: region,
    aws_user_files_s3_bucket: bucket
} = config


const Edit = ()  => {

    const [fileName, setFileName] = useState('')
    const [file, setFile] = useState('')
    const [fade , setFade] = useState(false);
    const [successAlert, setSucessAlert] = useState(false)
    const [ buttonLoading, setButtonLoading ] = useState(false)
    const [ imageUploadingProgress, setImageUploadingProgress] = useState(0)
    const [ imageUploadingStart, setImageUploadingStart] = useState(false);
    const [ video, setSingleVideo] = useState(false)
    const router = useRouter()
    const { id } = router.query
    const [ ageRanges, setAgeRanges ] = useState(false)


    useEffect(() => {
        
        fetchAgeRange()
    }, [])

    useEffect(() => {
        let videoId = id;
        if(videoId){
            fetchVideo(videoId)
        }
    }, [id])

    let fetchAgeRange = async ()  => {
        let  ageRanges  = await API.graphql(graphqlOperation(ageByCreatedAt, {
            isDeleted: isDeleted.no,
            sortDirection: 'ASC',
        }))
        setAgeRanges(ageRanges.data.ageByCreatedAt.items)
    }

    // const fetcher = ( query, id) => API.graphql(graphqlOperation(query, { id: id }))

    let fetchVideo = async (videoId)  => {
        let  video  = await API.graphql(graphqlOperation(getVideo,{ id: videoId }, {
            filter : {
                status : { eq: true}
            }
        }))
        setSingleVideo(video)
    }

    // const { data : video, error } = useSWR(
    //     [ getVideo, id],
    //     fetcher
    // )

    const { register, errors, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        try {
            setButtonLoading(true)
            setSucessAlert(false)
            let url = ""
            if(file){
                let newFileName = fileName.replaceAll(" ", "")
                let key = `videoImages/${uuidv4()}${newFileName}`;
                setImageUploadingStart(true)
                await Storage.put(key, file, {
                    level: 'public',
                    contentType: file.type,
                    progressCallback(progress) {
                        setImageUploadingProgress((progress.loaded/progress.total * 100).toFixed(1));
                    },
                });
                setImageUploadingProgress(0)
                setImageUploadingStart(false)
                url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`
    
            }
            else {
                url = video.data.getVideo.image
            }

            const inputData = {
                id: id,
                image: url,
                title:  data.title.trim(),
                description : data.description.trim(),
                status : data.status,
                video: data.video.trim(),
                duration: data.duration,
                ageId: data.ageId
            }

             await API.graphql(graphqlOperation(updateVideo, { input: inputData }))
             video.data.getVideo.image = url
             video.data.getVideo.video = data.video
             setSucessAlert(true)
             setButtonLoading(false)
             setFile('')
             setFileName('')
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

    const onAlerButtonClose = () => {
        setFade(true)
    }

    const onAlertAnimationEnd = () => {
        setSucessAlert(false)
        setFade(false)
    }
    let onReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

    return (
       
        <Layout>
                <SuccessAlert show={successAlert} fade={fade} message={"Video details are Saved."} hideAlert={onAlerButtonClose} animateAlert={onAlertAnimationEnd} />
                <div className="flex flex-1  flex-col md:flex-row lg:flex-row mx-2">

                    <div className="mb-2 border-solid border-gray-300 rounded border shadow-sm w-full">
                        <div className="bg-blue-500 text-white text-bold px-2 py-3 border-solid border-gray-200 border-b">
                            Edit Video
                        </div>
                        {
                        !video ? <Spinner /> :
                        <div>
                            <div className=" mt-4 mb-4 flex justify-center items-center">
                                <div className="group w-48 h-48 rounded-sm overflow-hidden shadow-inner text-center bg-purple table cursor-pointer">
                                    <img src={video.data.getVideo.image} alt={video.data.getVideo.name} className="object-cover object-center w-full h-full visible group-hover:hidden" />    
                                </div>
                            </div>
                            <div className="p-3">
                                <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1">
                                                Title
                                            </label>
                                            <input defaultValue={video.data.getVideo.title}  ref={register({ required: true, maxLength: 50, minLength: 3, validate: (value) => { return !!value.trim()} })} name="title" className="appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
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
                                             <p className="text-blue-light text-xs font-light mb-1">Preferred Resolution: 450*320</p>
                                        </div>
                                        <div className="w-full md:w-1/3 px-3">
                                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1"
                                                    >
                                                Status
                                            </label>
                                            <input  type="checkbox" name="status"  ref={register}  className=""  defaultChecked={video.data.getVideo.status}/>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1">
                                                Vimeo Video Id 
                                            </label>
                                            <textarea defaultValue={video.data.getVideo.video} ref={register({ required: true, validate: (value) => { return !!value.trim()} })} name="video" className="appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                                                    type="text" placeholder="Video" />
                                            {errors.video && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}         
                                                <Vimeo
                                                    video={video.data.getVideo.video}
                                                />
                                           
                                        </div>
                                         <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1">
                                                Duration(In minutes)
                                            </label>
                                            <input defaultValue={video.data.getVideo.duration} name="duration" ref={register({ required: true, min: 1} )} className="appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                                                type="number" placeholder="Duration" />
                                            {_.get("duration.type", errors) === "required" && ( <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                                            )}
                                            {_.get("duration.type", errors) === "min" && (
                                                <p className="text-red-500 text-xs italic">Duration must be greater than 1.</p>
                                            )} 
                                            
                                        </div>
                                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1">
                                                Age
                                            </label>
                                           <div className="relative">
                                                {ageRanges ?
                                                <select name="ageId" defaultValue={video.data.getVideo.ageId} ref={register({ required: true, validate: value => value !== 'select' || 'error message'} )} className="block appearance-none w-full bg-grey-200 border border-grey-200 text-grey-darker py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-grey">
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
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1">
                                                Description
                                            </label>
                                            <textarea defaultValue={video.data.getVideo.description} ref={register({ required: true, minLength: 20, validate: (value) => { return !!value.trim()} })} name="description" className="appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-grey"
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
                        </div>}
                    </div>
                </div>   
            
        </Layout>
       
    )
}

export default Edit
