import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import { Storage, graphqlOperation, API } from 'aws-amplify';
import config from '../../../src/aws-exports'
import Layout from '../../../components/admin/layout/Layout';
import { createAbout } from '../../../api/aboutUs/mutations'
import SuccessAlert from '../../../components/admin/SuccessAlert';
import { isDeleted } from '../../../config/bootstarp'
import _ from "lodash/fp";

const {
    aws_user_files_s3_bucket_region: region,
    aws_user_files_s3_bucket: bucket
} = config



const add = () => {

    const [fileName, setFileName] = useState('')
    const [file, setFile] = useState('')
    const [fade, setFade] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false)
    const [buttonLoading, setButtonLoading] = useState(false)
    const [ imageUploadingProgress, setImageUploadingProgress] = useState(0)
    const [ imageUploadingStart, setImageUploadingStart] = useState(false);


    const { register, errors, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            setButtonLoading(true)
            setSuccessAlert(false)
            const key = `aboutUsImages/${uuidv4()}${fileName}`;
            const url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`
           
            const inputData = {
                isDeleted: isDeleted.no,
                title: data.title.trim(),
                content: data.content.trim(),
                order: data.order.trim(),
                image: url,
            }
            

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


            

            await API.graphql(graphqlOperation(createAbout, { input: inputData }))
            setSuccessAlert(true)
            reset();
            setButtonLoading(false)
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

    const onAlertButtonClose = () => {
        setFade(true)
    }

    const onAlertAnimationEnd = () => {
        setSuccessAlert(false)
        setFade(false)
    }

    return (

        <Layout>
            <SuccessAlert show={successAlert} fade={fade} message={"About Us added"} hideAlert={onAlertButtonClose} animateAlert={onAlertAnimationEnd} />
            <div className="flex flex-1  flex-col md:flex-row lg:flex-row mx-2">

                <div className="mb-2 border-solid border-gray-300 rounded border shadow-sm w-full">
                    <div className="bg-blue-500 text-white text-bold px-2 py-3 border-solid border-gray-200 border-b">
                        Add About Us
                    </div>
                    <div className="p-3">
                        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1">
                                        Order
                                    </label>
                                    <input ref={register({ required: true, min: 1, validate: (value) => { return !!value.trim() } })} name="order" className="appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                                        type="number" placeholder="Order" />
                                    {_.get("order.type", errors) === "required" && (<p className="text-red-500 text-xs italic">Please fill out this field.</p>
                                    )}
                                    {_.get("order.type", errors) === "min" && (
                                        <p className="text-red-500 text-xs italic">Order length must be greater than 0</p>
                                    )}

                                </div>
                                <div className="w-full md:w-1/3 px-3">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-light">
                                        Image
                                    </label>
                                    <input  accept="image/*" name="image" type="file" ref={register({ required: true, pattern: /(\.|\/)(jpeg|png|jpg)$/i })} className="appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey" onChange={handleImageChange} />
                                    {_.get("image.type", errors) === "required" && ( <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                                    )}
                                    {_.get("image.type", errors) === "pattern" && ( <p className="text-red-500 text-xs italic">File is not image.</p>
                                    )}
                                    <p className="text-blue-light text-xs font-light mb-1">Preferred Resolution: 350*300</p>
                                </div>
                            </div>
                            <div className="w-full  mb-6">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1">
                                        Title
                                    </label>
                                    <input ref={register({ required: true, minLength: 3, validate: (value) => { return !!value.trim() } })} name="title" className="appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                                        type="text" placeholder="Title" />
                                    {_.get("title.type", errors) === "required" && (<p className="text-red-500 text-xs italic">Please fill out this field.</p>
                                    )}
                                    {_.get("title.type", errors) === "minLength" && (
                                        <p className="text-red-500 text-xs italic">Title length must be greater than 2</p>
                                    )}
                                </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full px-3">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1">
                                        Content
                                    </label>
                                    <textarea ref={register({ required: true, minLength: 3, validate: (value) => { return !!value.trim() } })} name="content" className="appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                                        type="text" placeholder="Content" />
                                    {_.get("content.type", errors) === "required" && (<p className="text-red-500 text-xs italic">Please fill out this field.</p>
                                    )}
                                    {_.get("content.type", errors) === "minLength" && (
                                        <p className="text-red-500 text-xs italic">Content length must be greater than 2</p>
                                    )}
                                </div>
                            </div>
                            { imageUploadingStart ?  
                                <div className="bg-green-500 mb-2 text-white text-bold px-2 py-3 border-solid border-gray-200 border-b">
                                    {`Image uploading status... ${imageUploadingProgress}/100`}
                                </div>
                            : null }
                            <div className="px-4 py-3 text-right mt-4 sm:px-6">
                                {
                                    buttonLoading ?
                                        <button disabled type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-400  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            Saving...
                                    </button>
                                        : <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            Save
                                    </button>
                                }

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>

    )
}

export default add
