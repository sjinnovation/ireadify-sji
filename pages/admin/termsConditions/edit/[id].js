import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { graphqlOperation, API } from 'aws-amplify';
import { useRouter } from 'next/router'
import Layout from '../../../../components/admin/layout/Layout';
import { updateTermsConditions } from '../../../../api/termsConditions/mutations'
import useSWR from 'swr'
import { getTermsConditions as GetTermsConditions } from '../../../../api/termsConditions/queries';
import SuccessAlert from '../../../../components/admin/SuccessAlert';
import Spinner from '../../../../components/admin/Spinner';
import { isDeleted } from '../../../../config/bootstarp'
import _ from "lodash/fp";
import CKEditor from 'ckeditor4-react';


const Edit = () => {

    const [fade, setFade] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false)
    const [buttonLoading, setButtonLoading] = useState(false)
    const router = useRouter()
    const { id } = router.query
    const  [ckContent, setCkContent  ] = useState(false)
    const fetcher = (query, id) => API.graphql(graphqlOperation(query, { id: id }))
    

    const { data: termsConditions, error } = useSWR(
        [GetTermsConditions, id],
        fetcher
    )
    const { register, errors, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        try {
            setButtonLoading(true)
            setSuccessAlert(false)
            const inputData = {
                id: id,
                isDeleted: isDeleted.no,
                title: data.title.trim(),
                content: data.content.trim(),
                order: data.order.trim(),
            }

            const termsConditionsList = await API.graphql(graphqlOperation(updateTermsConditions, { input: inputData }))
            setSuccessAlert(true)
            setButtonLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const onAlertButtonClose = () => {
        setFade(true)
    }

    const onAlertAnimationEnd = () => {
        setSuccessAlert(false)
        setFade(false)
    }

    const  editorChange = ( evt ) => {
        setCkContent(evt.editor.getData())
    }

    return (

        <Layout>
            <SuccessAlert show={successAlert} fade={fade} message={"terms & Conditions details updated."} hideAlert={onAlertButtonClose} animateAlert={onAlertAnimationEnd} />
            <div className="flex flex-1  flex-col md:flex-row lg:flex-row mx-2">

                <div className="mb-2 border-solid border-gray-300 rounded border shadow-sm w-full">
                    <div className="bg-blue-500 text-white text-bold px-2 py-3 border-solid border-gray-200 border-b">
                        Edit Terms & Conditions
                        </div>
                    {
                        !termsConditions ? <Spinner /> :
                            error ? <h1>Error</h1> :
                                <div>
                                    <div className="p-3">
                                        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                                            <div className="flex flex-wrap -mx-3 mb-6">
                                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1">
                                                        Order
                                    </label>
                                                    <input defaultValue={termsConditions.data.getTermsConditions.order} ref={register({ required: true, min: 1, validate: (value) => { return !!value.trim() } })} name="order" className="appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                                                        type="number" placeholder="Order" />
                                                    {_.get("order.type", errors) === "required" && (<p className="text-red-500 text-xs italic">Please fill out this field.</p>
                                                    )}
                                                    {_.get("order.type", errors) === "min" && (
                                                        <p className="text-red-500 text-xs italic">Order length must be greater than 0</p>
                                                    )}

                                                </div>
                                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1">
                                                        Title
                                    </label>
                                                    <input defaultValue={termsConditions.data.getTermsConditions.title} ref={register({ required: true, minLength: 3, validate: (value) => { return !!value.trim() } })} name="title" className="appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                                                        type="text" placeholder="Title" />
                                                    {_.get("title.type", errors) === "required" && (<p className="text-red-500 text-xs italic">Please fill out this field.</p>
                                                    )}
                                                    {_.get("title.type", errors) === "minLength" && (
                                                        <p className="text-red-500 text-xs italic">Title length must be greater than 2</p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap -mx-3 mb-6">
                                                <div className="w-full px-3">
                                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1">
                                                        Content
                                                    </label>
                                                    <CKEditor
                                                            data={ckContent !== false ? ckContent : termsConditions.data.getTermsConditions.content }
                                                            onChange={editorChange}
                                                    />
                                                    <textarea  style={{display: "none"}} value={ckContent !== false ? ckContent : termsConditions.data.getTermsConditions.content}  ref={register({ required: true, minLength: 3, validate: (value) => { return !!value.trim() } })} name="content" className="appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                                                        type="text" placeholder="Content" />
                                                    {_.get("content.type", errors) === "required" && (<p className="text-red-500 text-xs italic">Please fill out this field.</p>
                                                    )}
                                                    {_.get("content.type", errors) === "minLength" && (
                                                        <p className="text-red-500 text-xs italic">Content length must be greater than 2</p>
                                                    )}
                                                </div>
                                            </div>

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
                    }
                </div>
            </div>

        </Layout>

    )
}

export default Edit
