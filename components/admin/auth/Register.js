import { useForm } from "react-hook-form";
import _ from "lodash/fp";
import { Auth } from 'aws-amplify';

const Register = ({updateFormStatus}) => {

    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = async ({username, password}) => {
        try {
            let userNameLowerCase = username.toLowerCase()
            await Auth.signUp({
                username: userNameLowerCase,
                password,
                attributes: {
					'custom:created_at': new Date(),
					'custom:last_login': new Date()
				}
            });
            updateFormStatus("confirm")
        } catch (error) {
            console.log('error signing up:', error);
        }
    };
  
    watch("username");

    return (
        <div className="bg-gray-600 h-screen flex items-center justify-center"> 
             <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-4 text-center rounded">
                <h2 className="text-lg font-bold">Register</h2> 
                <div className="text-left mt-1">
                    <label htmlFor="" className="text-xs text-gray-700">Email</label>
                    <input name="username" type="text"  className="block bg-gray-200 text-sm px-2 py-1 border border-gray-400 focus:outline-none focus:bg-gray-100 focus:border-gray-500 rounded" ref={register({ required: true, pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/ })} />
                    {_.get("username.type", errors) === "required" && (
                        <span className="text-red-600">This field is required</span>
                    )}
                    {_.get("username.type", errors) === "pattern" && (
                        <span className="text-red-600">This input is not valid E-mail!</span>
                    )}
                </div>
                <div className="text-left mt-1">
                    <label htmlFor="" className="text-xs text-gray-700">Password</label>
                    <input name="password" type="password"  className="block bg-gray-200 text-sm px-2 py-1 border border-gray-400 focus:outline-none focus:bg-gray-100 focus:border-gray-500 rounded" ref={register({ required: true })} />
                    {errors.password && <span className="text-red-600">This field is required</span>}
                </div>

               

                <button type="submit" className="bg-gray-800 text-gray-100 mt-4 text-sm px-3 py-1 w-full rounded hover:bg-gray-700">Register</button>
            </form>
        </div>
    )
}

export default Register;
