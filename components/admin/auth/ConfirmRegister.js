import { useForm } from "react-hook-form";
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router'

const ConfirmRegister = () => {
    const router = useRouter()
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = async ({ username, code }) => {
        try {
            await Auth.confirmSignUp(username, code);
            router.push('/admin/author')
        } catch (error) {
            console.log('error signing up:', error);
        }
    };

    return (
        <div className="bg-gray-600 h-screen flex items-center justify-center"> 
             <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-4 text-center rounded">
                <h2 className="text-lg font-bold">Confirm</h2> 

                <div className="text-left mt-2">
                    <label htmlFor="" className="text-xs text-gray-700">Username</label>
                    <input name="username" type="text" className="block bg-gray-200 text-sm px-2 py-1 border border-gray-400 focus:outline-none focus:bg-gray-100 focus:border-gray-500 rounded" ref={register({ required: true })} />
                    {errors.username && <span className="text-red-600">This field is required</span>}
                </div>

                <div className="text-left mt-2">
                    <label htmlFor="" className="text-xs text-gray-700">Auth Code</label>
                    <input name="code" type="text" className="block bg-gray-200 text-sm px-2 py-1 border border-gray-400 focus:outline-none focus:bg-gray-100 focus:border-gray-500 rounded" ref={register({ required: true })} />
                    {errors.code && <span className="text-red-600">This field is required</span>}
                </div>
                <button className="bg-gray-800 text-gray-100 mt-4 text-sm px-3 py-1 w-full rounded hover:bg-gray-700">Confirm</button>
            </form>
        </div>
    )
}

export default ConfirmRegister
