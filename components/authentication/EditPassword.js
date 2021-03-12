import React, { useState, useRef } from 'react';
import { useForm } from "react-hook-form";
import { Auth } from 'aws-amplify';
import _ from "lodash/fp";

const EditPassword = ({hideEditPassword}) => {

	const { register, handleSubmit, watch, errors, reset, setError, clearErrors } = useForm();
    const newPassword = useRef({});
    newPassword.current = watch("newPassword", "");
    const confrimPassword = useRef({});
    confrimPassword.current = watch("confrimPassword", "");
	const [serverError, setServerError] = useState(false)
	const [isLoading, setLoading] = useState(false)
	const [newPasswordType, setNewPasswordType] = useState("password")
	const [showNewPassword, setNewShowPassword] = useState(false)
    const [oldPasswordType, setOldPasswordType] = useState("password")
	const [showOldPassword, setOldShowPassword] = useState(false)
    const [confrimPasswordType, setConfrimPasswordType] = useState("password")
	const [showConfrimPassword, setConfrimShowPassword] = useState(false)

	const onToggleShowNewPassword = () => {
		setNewPasswordType(newPasswordType == "password" ? "Text" : "password")
		newPasswordType == "password" ? setNewShowPassword(true) : setNewShowPassword(false)
	}

    const onToggleShowOldPassword = () => {
		setOldPasswordType(oldPasswordType == "password" ? "Text" : "password")
		oldPasswordType == "password" ? setOldShowPassword(true) : setOldShowPassword(false)
	}

    const onToggleShowConfrimPassword = () => {
		setConfrimPasswordType(confrimPasswordType == "password" ? "Text" : "password")
		confrimPasswordType == "password" ? setConfrimShowPassword(true) : setConfrimShowPassword(false)
	}


	const onSubmit = async ({ oldPassword, newPassword }) => {
		try {
			setLoading(true)
			let user = await Auth.currentAuthenticatedUser();
			await Auth.changePassword( user, oldPassword, newPassword );
            setLoading(false)
            setServerError("Password changed successfully.")
            setTimeout( () => hideEditPassword() , 2000);
			
		} catch (error) {
			setLoading(false)
            if(error.name === "NotAuthorizedException" || error.name === "InvalidParameterException")
			{
				setServerError("Incorrect old password.")
			}
			else {
				setServerError(error.message)
			}
		}
	};

    let checkPassword = (newP, confrimP) => {
       if(newP !== confrimP) {
            setError("confrimPassword", {
            type: "validate",
            message: "The passwords do not match"
          });
       }
       else {
            clearErrors("confrimPassword");
       }
    }

	return (
		<div className="fixed z-10 inset-0 overflow-y-auto">
			<div className="flex flex-col items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
				<div className="fixed inset-0 transition-opacity" aria-hidden="true">
					<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
				</div>
				{/* This element is to trick the browser into centering the modal contents. */}
				<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

				<div className="inline-block content-center align-bottom items-center justify-center bg-gray-100 rounded-md text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
					<div className="modal-close self-center text-center absolute p-1 w-0 h-5 top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-gray-500 text-base z-50 order-none flex-grow-0">
						<svg onClick={hideEditPassword} className="fill-current text-gray" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
							<path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
						</svg>
					</div>

					<div className="flex flex-col items-center">
						<div className="flex flex-row justify-center items-center p-2.5 static w-60 h-16 left-36 top-0 flex-none order-0 flex-grow-0 my-0 mx-8">
							<h4 className="static left-16 bottom-2.5 font-sans text-center font-semibold items-center tracking-tight flex-none text-blue-900 order-0 flex-grow-0 my-2.5 mx-0 text-subtitle1">Edit Password</h4>
						</div>
						{serverError && <p className="text-red-600">{serverError}</p>}
						<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center p-0 static w-80 h-4/5 left-36 inset-y-20 flex-none order-1 self-center flex-grow-0 my-5 mx-2.5">
                            <div className="flex flex-col static text-left mt-5 w-full h-30 flex-none order-0 flex-grow-0 p-0 my-0 mx-8">
                                <label htmlFor="" className="flex static font-sans font-normal text-center w-32 h-4 left-0 -top-0 text-small3 text-gray-500 mb-3">Old Password</label>
                                <div className="mt-1 relative rounded-md shadow-sm cursor-pointer">
                                    <div onClick={onToggleShowOldPassword} className="absolute inset-y-0 right-0 pr-3 mt-1 flex items-center cursor-pointer">
                                        {
                                            showOldPassword
                                                ?
                                                <svg className="cursor-pointer absolute focus:outline-none focus:shadow-outline right-2 top-0.5 align-center" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clipPath="url(#clip0)">
                                                        <path d="M1.05664 12.4529C1.05664 12.4529 5.05664 4.45288 12.0566 4.45288C19.0566 4.45288 23.0566 12.4529 23.0566 12.4529C23.0566 12.4529 19.0566 20.4529 12.0566 20.4529C5.05664 20.4529 1.05664 12.4529 1.05664 12.4529Z" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M12.0566 15.4529C13.7135 15.4529 15.0566 14.1097 15.0566 12.4529C15.0566 10.796 13.7135 9.45288 12.0566 9.45288C10.3998 9.45288 9.05664 10.796 9.05664 12.4529C9.05664 14.1097 10.3998 15.4529 12.0566 15.4529Z" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <line x1="20.3427" y1="4.3641" x2="3.34268" y2="20.3641" stroke="#BDBDBD" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0">
                                                            <rect width="24" height="24" fill="white" transform="translate(0.0566406 0.452881)" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                                :
                                                <svg className="cursor-pointer absolute focus:outline-none focus:shadow-outline right-2 top-0.5 align-center" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clipPath="url(#clip0)">
                                                        <path d="M1.92856 12C1.92856 12 5.92856 4 12.9286 4C19.9286 4 23.9286 12 23.9286 12C23.9286 12 19.9286 20 12.9286 20C5.92856 20 1.92856 12 1.92856 12Z" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M12.9286 15C14.5854 15 15.9286 13.6569 15.9286 12C15.9286 10.3431 14.5854 9 12.9286 9C11.2717 9 9.92856 10.3431 9.92856 12C9.92856 13.6569 11.2717 15 12.9286 15Z" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0">
                                                            <rect width="24" height="24" fill="white" transform="translate(0.928558)" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                        }
                                    </div>
                                    <input ref={register({ required: true })} name="oldPassword" placeholder="●●●●●●●●" type={oldPasswordType} className="border-2 rounded-md w-full py-1 px-1 leading-tight border-gray-300 bg-white-100 focus:outline-none focus:border-blue-500 focus:bg-white text-gray-700 pr-16 font-sans text-small2" />
                                    {errors.oldPassword && <p className="text-red-500 text-xs italic">This field is required</p>}
                                </div>
                            </div>
                            <div className="flex flex-col static text-left mt-5 w-full h-30 flex-none order-0 flex-grow-0 p-0 my-0 mx-8">
                                <label htmlFor="" className="flex static font-sans font-normal text-center w-32 h-4 left-0 -top-0 text-small3 text-gray-500 mb-3">New Password</label>
                                <div className="mt-1 relative rounded-md shadow-sm cursor-pointer">
                                    <div onClick={onToggleShowNewPassword} className="absolute inset-y-0 right-0 pr-3 mt-1 flex items-center cursor-pointer">
                                        {
                                            showNewPassword
                                                ?
                                                <svg className="cursor-pointer absolute focus:outline-none focus:shadow-outline right-2 top-0.5 align-center" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clipPath="url(#clip0)">
                                                        <path d="M1.05664 12.4529C1.05664 12.4529 5.05664 4.45288 12.0566 4.45288C19.0566 4.45288 23.0566 12.4529 23.0566 12.4529C23.0566 12.4529 19.0566 20.4529 12.0566 20.4529C5.05664 20.4529 1.05664 12.4529 1.05664 12.4529Z" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M12.0566 15.4529C13.7135 15.4529 15.0566 14.1097 15.0566 12.4529C15.0566 10.796 13.7135 9.45288 12.0566 9.45288C10.3998 9.45288 9.05664 10.796 9.05664 12.4529C9.05664 14.1097 10.3998 15.4529 12.0566 15.4529Z" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <line x1="20.3427" y1="4.3641" x2="3.34268" y2="20.3641" stroke="#BDBDBD" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0">
                                                            <rect width="24" height="24" fill="white" transform="translate(0.0566406 0.452881)" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                                :
                                                <svg className="cursor-pointer absolute focus:outline-none focus:shadow-outline right-2 top-0.5 align-center" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clipPath="url(#clip0)">
                                                        <path d="M1.92856 12C1.92856 12 5.92856 4 12.9286 4C19.9286 4 23.9286 12 23.9286 12C23.9286 12 19.9286 20 12.9286 20C5.92856 20 1.92856 12 1.92856 12Z" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M12.9286 15C14.5854 15 15.9286 13.6569 15.9286 12C15.9286 10.3431 14.5854 9 12.9286 9C11.2717 9 9.92856 10.3431 9.92856 12C9.92856 13.6569 11.2717 15 12.9286 15Z" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0">
                                                            <rect width="24" height="24" fill="white" transform="translate(0.928558)" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                        }
                                    </div>
                                    <input ref={register({ required: true, validate: value => checkPassword(value , confrimPassword.current), pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.{8,25})/ })} name="newPassword" placeholder="●●●●●●●●" type={newPasswordType} className="border-2 rounded-md w-full py-1 px-1 leading-tight border-gray-300 bg-white-100 focus:outline-none focus:border-blue-500 focus:bg-white text-gray-700 pr-16 font-sans text-small2" />
                                    
                                    {_.get("newPassword.type", errors) === "required" && (
                                                <p className="text-red-500 text-xs italic">This field is required</p>
                                    )}
                                    {_.get("newPassword.type", errors) === "pattern" && (
                                        <p className="text-red-500 text-xs italic">Password must contain atleast 1 capital letter, 1 small letter, 1 special character, 1 digit and length between 8-25</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col static text-left mt-5 w-full h-30 flex-none order-0 flex-grow-0 p-0 my-0 mx-8">
                                <label htmlFor="" className="flex static font-sans font-normal text-center w-32 h-4 left-0 -top-0 text-small3 text-gray-500 mb-3">Confirm Password</label>
                                <div className="mt-1 relative rounded-md shadow-sm cursor-pointer">
                                    <div onClick={onToggleShowConfrimPassword} className="absolute inset-y-0 right-0 pr-3 mt-1 flex items-center cursor-pointer">
                                        {
                                            showConfrimPassword
                                                ?
                                                <svg className="cursor-pointer absolute focus:outline-none focus:shadow-outline right-2 top-0.5 align-center" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clipPath="url(#clip0)">
                                                        <path d="M1.05664 12.4529C1.05664 12.4529 5.05664 4.45288 12.0566 4.45288C19.0566 4.45288 23.0566 12.4529 23.0566 12.4529C23.0566 12.4529 19.0566 20.4529 12.0566 20.4529C5.05664 20.4529 1.05664 12.4529 1.05664 12.4529Z" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M12.0566 15.4529C13.7135 15.4529 15.0566 14.1097 15.0566 12.4529C15.0566 10.796 13.7135 9.45288 12.0566 9.45288C10.3998 9.45288 9.05664 10.796 9.05664 12.4529C9.05664 14.1097 10.3998 15.4529 12.0566 15.4529Z" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <line x1="20.3427" y1="4.3641" x2="3.34268" y2="20.3641" stroke="#BDBDBD" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0">
                                                            <rect width="24" height="24" fill="white" transform="translate(0.0566406 0.452881)" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                                :
                                                <svg className="cursor-pointer absolute focus:outline-none focus:shadow-outline right-2 top-0.5 align-center" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clipPath="url(#clip0)">
                                                        <path d="M1.92856 12C1.92856 12 5.92856 4 12.9286 4C19.9286 4 23.9286 12 23.9286 12C23.9286 12 19.9286 20 12.9286 20C5.92856 20 1.92856 12 1.92856 12Z" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M12.9286 15C14.5854 15 15.9286 13.6569 15.9286 12C15.9286 10.3431 14.5854 9 12.9286 9C11.2717 9 9.92856 10.3431 9.92856 12C9.92856 13.6569 11.2717 15 12.9286 15Z" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0">
                                                            <rect width="24" height="24" fill="white" transform="translate(0.928558)" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                        }
                                    </div>
                                    <input ref={register({ required: true, validate: value => value === newPassword.current || "The passwords do not match"})} name="confrimPassword" placeholder="●●●●●●●●" type={confrimPasswordType} className="border-2 rounded-md w-full py-1 px-1 leading-tight border-gray-300 bg-white-100 focus:outline-none focus:border-blue-500 focus:bg-white text-gray-700 pr-16 font-sans text-small2" />
                                    
                                    {_.get("confrimPassword.type", errors) === "required" && (
                                                <p className="text-red-500 text-xs italic">This field is required</p>
                                    )}
                                    {_.get("confrimPassword.type", errors) === "validate" && (
                                        <p className="text-red-500 text-xs italic">{errors.confrimPassword.message}</p>
                                    )}
                                </div>
                            </div>
                            <div className="rounded w-full my-2 inline-flex justify-center">
                                {
                                    isLoading ?
                                    <button disabled className="rounded w-full my-2 inline-flex justify-center border-2 shadow-sm px-11 py-2 bg-gradient-to-r bg-gray-300 text-base font-semibold text-white focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-100 sm:w-auto sm:text-sm font-sans">
                                        Change password
                                        </button>
                                    :
                                    <button className="rounded w-full my-2 inline-flex justify-center border-2 shadow-sm px-11 py-2 bg-gradient-to-r from-purple-bright to-purple-bright text-base font-semibold text-white hover:from-purple-light hover:to-blue-bright focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-100 sm:w-auto sm:text-sm font-sans">
                                        Change password
                                    </button>
                                }
                            </div>
                        </form>
						
					</div>
				</div>
			</div>
		</div>
	)
}

export default EditPassword
