import React,  { useState } from 'react'
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router'
import { Auth } from 'aws-amplify';
import { userRole } from '../../../config/bootstarp'
import _ from "lodash/fp";

const Login = () => {
    const router = useRouter()
   
    const [loginError, setLoginError] = useState(false)
    const [ isLoading, setLoading ] = useState(false)

    const { register, handleSubmit, errors, watch } = useForm();

    const onSubmit = async ({username, password }) => {
        try {
            let userNameLowerCase = username.toLowerCase()
            setLoading(true)
            let user = await Auth.signIn({
                username: userNameLowerCase,
                password,
            });
            let groups = user.signInUserSession.accessToken.payload["cognito:groups"];
            if(groups && groups.includes(userRole.admin)){
                router.push('/admin/author')
            }
            else {
                await Auth.signOut();
                setLoginError("User does not exist.")
            }    
        } catch (error) {
            setLoginError(error.message)
            setLoading(false)
            console.log('error signing up:', error);
        }
    };

    watch("username");

    return (
        <div className="bg-gray-600 h-screen flex items-center justify-center"> 
             <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-4 text-center rounded">
                {loginError && <p className="text-red-600">{loginError}</p>}
                <h2 className="text-lg font-bold">Login</h2> 
                <div className="text-left mt-2">
                    <label htmlFor="" className="text-xs text-gray-700">Email</label>
                    <input name="username" type="text" className="block bg-gray-200 text-sm  py-1 border border-gray-400 focus:outline-none focus:bg-gray-100 focus:border-gray-500 rounded" ref={register({ required: true })} />
                    {_.get("username.type", errors) === "required" && (
                        <span className="text-red-600">This field is required</span>
                    )}
                    {_.get("username.type", errors) === "pattern" && (
                        <span className="text-red-600">This input is not valid E-mail!</span>
                    )}
                </div>
                
                <div className="text-left mt-1">
                    <label htmlFor="" className="text-xs text-gray-700">Password</label>
                    <input name="password" type="password"  className="block bg-gray-200 text-sm py-1 border border-gray-400 focus:outline-none focus:bg-gray-100 focus:border-gray-500 rounded" ref={register({ required: true })} />
                    {errors.password && <span className="text-red-600">This field is required</span>}
                </div>
                {
                    !isLoading ? <button className="bg-gray-800 text-gray-100 mt-4 text-sm py-1 w-full rounded hover:bg-gray-700">Login</button>
                    :   
                    <button className="bg-gray-400 text-gray-100 mt-4 text-sm  py-1 w-full rounded" disabled>
                        Login
                    </button>
                }
            </form>
        </div>
    )
}

export default Login;
