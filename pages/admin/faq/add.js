import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { graphqlOperation, API } from 'aws-amplify';
import Layout from '../../../components/admin/layout/Layout';
import { createFaq } from '../../../api/faq/mutations'
import SuccessAlert from '../../../components/admin/SuccessAlert';
import { isDeleted, topic } from '../../../config/bootstarp'
import _ from "lodash/fp";

const add = () => {

    const [fade, setFade] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false)
    const [buttonLoading, setButtonLoading] = useState(false)

    const { register, errors, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            setButtonLoading(true)
            setSuccessAlert(false)

            const inputData = {
                isDeleted: isDeleted.no,
                topic: data.topic.trim(),
                question: data.question.trim(),
                answer: data.answer.trim(),
            }

            await API.graphql(graphqlOperation(createFaq, { input: inputData }))
            setSuccessAlert(true)
            reset();
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

    return (

        <Layout>
            <SuccessAlert show={successAlert} fade={fade} message={"FAQ added"} hideAlert={onAlertButtonClose} animateAlert={onAlertAnimationEnd} />
            <div className="flex flex-1  flex-col md:flex-row lg:flex-row mx-2">

                <div className="mb-2 border-solid border-gray-300 rounded border shadow-sm w-full">
                    <div className="bg-blue-500 text-white text-bold px-2 py-3 border-solid border-gray-200 border-b">
                        Add FAQ
                    </div>
                    <div className="p-3">
                        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1">
                                        Topic
                                    </label>
                                    <div className="relative">
                                        <select name="topic" ref={register({ required: true, validate: value => value !== 'select' || 'error message' })} className="block appearance-none w-full bg-grey-200 border border-grey-200 text-grey-darker py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-grey">
                                            <option value="select">Select Topic</option>
                                            <option value={topic.account}>{topic.account}</option>
                                            <option value={topic.payments}>{topic.payments}</option>
                                            <option value={topic.general}>{topic.general}</option>
                                        </select>
                                        {errors.topic && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-grey-darker">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20">
                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1">
                                        Question
                                    </label>
                                    <input ref={register({ required: true, maxLength: 50, minLength: 3, validate: (value) => { return !!value.trim() } })} name="question" className="appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                                        type="text" placeholder="Question" />
                                    {_.get("question.type", errors) === "required" && (<p className="text-red-500 text-xs italic">Please fill out this field.</p>
                                    )}
                                    {_.get("question.type", errors) === "maxLength" && (
                                        <p className="text-red-500 text-xs italic">Question length must be greater than 2 and less than 50.</p>
                                    )}
                                    {_.get("question.type", errors) === "minLength" && (
                                        <p className="text-red-500 text-xs italic">Question length must be greater than 2 and less than 50.</p>
                                    )}

                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full px-3">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1">
                                        Answer
                                    </label>
                                    <textarea ref={register({ required: true, minLength: 10, validate: (value) => { return !!value.trim() } })} name="answer" className="appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                                        type="text" placeholder="Answer" />
                                    {_.get("answer.type", errors) === "required" && (<p className="text-red-500 text-xs italic">Please fill out this field.</p>
                                    )}
                                    {_.get("answer.type", errors) === "minLength" && (
                                        <p className="text-red-500 text-xs italic">Answer length must be greater than 10.</p>
                                    )}
                                </div>
                            </div>

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
