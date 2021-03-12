import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../context/auth';
import { Auth, API } from 'aws-amplify';
import _ from "lodash/fp";
import { useRouter } from 'next/router'
import { PayPalButton } from "react-paypal-button-v2";
import config from '../../config/secret'
import Card from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

const ConfrimCodeForm = ({ onConfrimCode, emailSuccessMessage }) => {

    const { register, handleSubmit, errors } = useForm();
    const [isLoading, setLoading] = useState(false)

    const onConfrim = async ({ code }) => {
        try {
            setLoading(false)
            await onConfrimCode(code)
            setLoadingT(true)
        } catch (error) {
            setLoading(false)
        }

    };

    return (
        <div>
            <div><p className="text-green-500 text-xs italic">{emailSuccessMessage}</p></div>
            <form onSubmit={handleSubmit(onConfrim)} className="flex flex-col items-center p-0 static w-80 h-4/5 left-36 inset-y-20 flex-none order-1 self-center flex-grow-0 mx-2.5">
                <div className="flex flex-col static text-left mt-5 w-full h-30 flex-none order-0 flex-grow-0 p-0 my-0 mx-8">
                    <label htmlFor="" className="flex static font-sans font-normal text-center w-20 h-4 left-0 -top-0 text-small3 text-gray-500 mb-3">Verification</label>
                    <input ref={register({ required: true })} name="code" placeholder="code" type="text" className="appearance-none border-2 rounded w-full py-1 px-1 leading-tight border-gray-300 bg-white-100 focus:outline-none focus:border-blue-500 focus:bg-white text-gray-700 pr-16 font-sans text-sm" />
                    {_.get("code.type", errors) === "required" && (
                        <p className="text-red-500 text-xs italic">This field is required</p>
                    )}
                </div>
                {
                    isLoading ?
                        <button disabled className="rounded w-full my-4 inline-flex justify-center border-2 shadow-sm px-11 py-2 bg-gradient-to-r bg-gray-300 text-small4 font-semibold text-white  focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-100 sm:ml-3 sm:w-auto sm:text-small4 font-sans">
                            Continue
                    </button>
                        :
                        <button className="rounded w-full my-4 inline-flex justify-center border-2 shadow-sm px-11 py-2 bg-gradient-to-r from-purple-bright to-purple-bright text-small4 font-semibold text-white hover:from-purple-light hover:to-blue-bright focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-100 sm:ml-3 sm:w-auto sm:text-small4 font-sans">
                            Continue
                    </button>

                }
            </form>
        </div>
    )
}

export default ConfrimCodeForm
