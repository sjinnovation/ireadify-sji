import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useForm } from "react-hook-form";
import { Storage, graphqlOperation, API } from 'aws-amplify';
import Layout from '../../../components/admin/layout/Layout';
import config from '../../../src/aws-exports'
import { createTestimonial } from '../../../api/testimonial/mutations'
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
    const [imageUploadingProgress, setImageUploadingProgress] = useState(0)
    const [imageUploadingStart, setImageUploadingStart] = useState(false);

    const { register, errors, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            setButtonLoading(true)
            setSuccessAlert(false)
            const key = `clientTestimonialImages/${uuidv4()}${fileName}`;
            const url = fileName === "" ? "" : `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`

            const inputData = {
                isDeleted: isDeleted.no,
                image: url,
                name: data.name.trim(),
                title: data.title.trim(),
                testimonial: data.testimonial
            }

            setImageUploadingStart(true)
            await Storage.put(key, file, {
                level: 'public',
                contentType: file.type,
                progressCallback(progress) {
                    setImageUploadingProgress((progress.loaded / progress.total * 100).toFixed(1));
                },
            });
            setImageUploadingProgress(0)
            setImageUploadingStart(false)

            await API.graphql(graphqlOperation(createTestimonial, { input: inputData }))
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
        else {
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
            <SuccessAlert show={successAlert} fade={fade} message={"Testimonial added"} hideAlert={onAlertButtonClose} animateAlert={onAlertAnimationEnd} />
            <div className="flex flex-1  flex-col md:flex-row lg:flex-row mx-2">

                <div className="mb-2 border-solid border-gray-300 rounded border shadow-sm w-full">
                    <div className="bg-blue-500 text-white text-bold px-2 py-3 border-solid border-gray-200 border-b">
                        Add Testimonial
                    </div>
                    <div className="p-3">
                        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1">
                                        Client Name
                                    </label>
                                    <input ref={register({ required: true, maxLength: 50, minLength: 3, validate: (value) => { return !!value.trim() } })} name="name" className="appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                                        type="text" placeholder="Client Name" />
                                    {_.get("name.type", errors) === "required" && (<p className="text-red-500 text-xs italic">Please fill out this field.</p>
                                    )}
                                    {_.get("name.type", errors) === "maxLength" && (
                                        <p className="text-red-500 text-xs italic">Name length must be greater than 2 and less than 51.</p>
                                    )}
                                    {_.get("name.type", errors) === "minLength" && (
                                        <p className="text-red-500 text-xs italic">Name length must be greater than 2 and less than 51.</p>
                                    )}

                                </div>
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1">
                                        Testimonial Title
                                    </label>
                                    <input ref={register({ required: true, maxLength: 50, minLength: 2, validate: (value) => { return !!value.trim() } })} name="title" className="appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                                        type="text" placeholder="Testimonial Title" />
                                    {_.get("title.type", errors) === "required" && (<p className="text-red-500 text-xs italic">Please fill out this field.</p>
                                    )}
                                    {_.get("title.type", errors) === "maxLength" && (
                                        <p className="text-red-500 text-xs italic">Title length must be greater than 2 and less than 50.</p>
                                    )}
                                    {_.get("title.type", errors) === "minLength" && (
                                        <p className="text-red-500 text-xs italic">Title length must be greater than 2 and less than 50.</p>
                                    )}

                                </div>
                                <div className="w-full md:w-1/3 px-3">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-light">
                                        Image
                                    </label>
                                    <input accept="image/*" name="image" type="file" ref={register({ pattern: /(\.|\/)(jpeg|png|jpg)$/i })} className="appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey" onChange={handleImageChange} />
                                    {_.get("image.type", errors) === "pattern" && (<p className="text-red-500 text-xs italic">File is not image.</p>
                                    )}
                                    <p className="text-blue-light text-xs font-light mb-1">Preferred Resolution: 256*300</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full px-3">
                                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1">
                                            Testimonial
                                    </label>
                                        <textarea ref={register({ required: true, minLength: 10, validate: (value) => { return !!value.trim() } })} name="testimonial" className="appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                                            type="text" placeholder="Testimonial" />
                                        {_.get("testimonial.type", errors) === "required" && (<p className="text-red-500 text-xs italic">Please fill out this field.</p>
                                        )}
                                        {_.get("testimonial.type", errors) === "minLength" && (
                                            <p className="text-red-500 text-xs italic">Testimonial length must be greater than 10.</p>
                                        )}
                                    </div>
                                </div>
                            {imageUploadingStart ?
                                <div className="bg-green-500 mb-2 text-white text-bold px-2 py-3 border-solid border-gray-200 border-b">
                                    {`Image uploading status... ${imageUploadingProgress}/100`}
                                </div>
                                : null}
                            <div className="px-4 py-3 bg-gray-50 text-right mt-4 sm:px-6">
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
