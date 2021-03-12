import React, { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { Auth, API } from 'aws-amplify';
import Layout from '../../components/layout/Home-Layout';
import { AuthContext } from '../../context/auth';
import { userRole, subscriptionType} from '../../config/bootstarp'
import moment from 'moment'
import EditPassword from '../../components/authentication/EditPassword';
import Loader from '../../components/Loader';

const index = () => {
    const [ loading , setLoading] = useState(true);
    const [ userCheckLoading , setUserCheckLoading] = useState(true);
    const [ subscriptionDetails, setSubscriptionDetails] = useState("")
    const [showEditPassword, setEditPassword] = useState(false)
    const router = useRouter()
    const { setUserDetails , changeLoginFormStatus, } = useContext(AuthContext)

    useEffect(() => {
        const checkUser = async () => {
            try {
              const user = await Auth.currentAuthenticatedUser()
              setUserDetails(user)
             
                let groups =  user.signInUserSession.accessToken.payload["cognito:groups"];
                if(groups && groups.includes(userRole.admin)){
                    router.push('/admin/author')
                }
                else{
                    let isSubscribed =  await fetchUserSubscription()
                    if(isSubscribed){
                        setUserCheckLoading(false);
                        setLoading(false)
                    }
                    else {
                        await router.push('/subscription')
                    }
                    
                }
                
            } catch (error) {
                await router.push('/' + '?redirect=profile' )
                changeLoginFormStatus()
            }
        }
        checkUser()
       
    }, [])

   let fetchUserSubscription = async()=> {
    let  subscription  = await API.get('subscription', '/subscription/'+ Auth.user.attributes.email);
    if(subscription.data === null || (!subscription.data.isActive  && subscription.data.nextBillingDate < new Date().toISOString())){
       return false;
    }
    setSubscriptionDetails(subscription.data)
    return true;
 }

    let cancelSubscription = async()=> {
        var isCancel = confirm("Are you sure to cancel subscritpion ? ");
        if (isCancel == true) {
            setLoading(true);
            let inputData = {
                body : {
                    istrailPeriod : subscriptionDetails.istrailPeriod,
                    subscriptionId : subscriptionDetails.subscriptionId,
                    nextBillingDate: subscriptionDetails.nextBillingDate
                }	
            }
            if(subscriptionDetails.type && subscriptionDetails.type == subscriptionType.authorizeNet){
                await API.post('subscription', '/authorize/cancel/'+ subscriptionDetails.id, inputData);
            }
            else {
                await API.post('subscription', '/subscription/cancel/'+ subscriptionDetails.id, inputData);
            }
           
         
            if(subscriptionDetails.istrailPeriod){
                await Auth.signOut();
                await router.push('/subscription/cancel-subscription')
                setUserDetails(null)
            } 
            else {
                let newSubscriptionDetails = subscriptionDetails
                newSubscriptionDetails.isActive = false
                setSubscriptionDetails(newSubscriptionDetails);
                setLoading(false);
            }
       }   
    }
    return (
        userCheckLoading ? <Loader /> :
            <Layout>
                 <main className="">
                    <div className="bg-green-light pb-30 flex min-h-screen">
                        <div className="container mx-auto px-6 md:px-24">
                        <div className="sm:flex my-10">
                            <div className="sm:w-full sm:px-8">
                                <div className="py-10 justify-items-center">
                                    <h3 className="text-purple-light font-sans font-semibold mb-10 text-center md:px-4">Profile</h3>
                                    <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="pr-6 py-8 whitespace-no-wrap border-b border-gray-300">
                                                <h5 className="text-5xl font-sans font-semibold leading-5 text-purple-light">Email</h5>
                                                </td>
                                                <td className="pr-6 py-8 whitespace-no-wrap border-b border-gray-300">
                                                <p className="text-body2 text-gray-light font-serif leading-5">{Auth.user.attributes.email}</p>
                                                </td>
                                                <td className="pl-6 py-8 whitespace-no-wrap border-b border-gray-300"></td>
                                            </tr>
                                            <tr>
                                                <td className="pr-6 py-8 whitespace-no-wrap border-b border-gray-300">
                                                <h5 className="text-5xl font-sans font-semibold leading-5 text-purple-light">Last visit to account</h5>
                                                </td>
                                                <td className="pr-6 py-8 whitespace-no-wrap border-b border-gray-300">
                                                <p className="text-body2 text-gray-light font-serif leading-5">{moment(Auth.user.attributes["custom:last_login"]).format('MM.DD.YYYY')}</p>
                                                </td>
                                                <td className="pl-6 py-8 whitespace-no-wrap border-b border-gray-300"></td>
                                            </tr>
                                            <tr>
                                                <td className="pr-6 py-8 whitespace-no-wrap border-b border-gray-300">
                                                <h5 className="text-5xl font-sans font-semibold leading-5 text-purple-light">History</h5>
                                                </td>
                                                <td className="pr-6 py-8 whitespace-no-wrap border-b border-gray-300">
                                                <p className="text-body2 text-gray-light font-serif leading-5">{moment(Auth.user.attributes["custom:created_at"]).format('MM.DD.YYYY')} to {moment().format('MM.DD.YYYY')}</p>
                                                </td>
                                                <td className="pl-6 py-8 whitespace-no-wrap border-b border-gray-300"></td>
                                            </tr>
                                            <tr>
                                                <td className="pr-6 py-8 whitespace-no-wrap border-b border-gray-300">
                                                <h5 className="text-5xl font-sans font-semibold leading-5 text-purple-light">Password</h5>
                                                </td>
                                                <td className="pr-6 py-8 whitespace-no-wrap border-b border-gray-300"></td>
                                                <td className="pl-6 py-8 whitespace-no-wrap border-b border-gray-300">
                                                <button onClick={() => setEditPassword(true)} className="text-subtitle1 font-sans font-semibold text-purple-light focus:outline-none flex items-center float-right">
                                                    <img src="/img/icons/edit.png" width={24} height={24} alt="Edit password" />
                                                    <span className="ml-2 mr-0 md:mx-4">Edit password</span>
                                                </button>
                                                </td>
                                            </tr>
                                            {
                                                loading ?
                                                 <tr>
                                                     <td className="pr-6 py-8 whitespace-no-wrap border-b border-gray-300"></td> 
                                                     <td className="text-center pr-6 py-8 whitespace-no-wrap border-b border-gray-300"><p className="text-body2 text-gray-light font-serif leading-5">Loading...</p></td> 
                                                     <td className="pr-6 py-8 whitespace-no-wrap border-b border-gray-300"></td> 
                                                </tr> : 
                                            
                                            <tr>
                                                <td className="pr-6 py-8 whitespace-no-wrap border-b border-gray-300">
                                                <h5 className="text-5xl font-sans font-semibold leading-5 text-purple-light">Account status</h5>
                                                </td>
                                                <td className="pr-6 py-8 whitespace-no-wrap border-b border-gray-300">
                                                    {
                                                        subscriptionDetails.istrailPeriod ?
                                                        <p className="text-body2 font-semibold text-gray-light font-serif leading-5 mb-2">Free Trial</p> 
                                                        : null
                                                    }
                                                    {
                                                        !subscriptionDetails.isActive ?
                                                        <p className="text-body2 text-gray-light font-serif leading-5">{ 'Your subscription will expire on '  + moment(subscriptionDetails.nextBillingDate).format('MM/DD/YYYY')}</p>:
                                                        <p className="text-body2 text-gray-light font-serif leading-5">{ 'Your next billing date is '  + moment(subscriptionDetails.nextBillingDate).format('MM/DD/YYYY')}</p>
                                                    }
                                                </td>
                                                { !subscriptionDetails.isActive ? <td className="pr-6 py-8 whitespace-no-wrap border-b border-gray-300"></td> :
                                                    <td className="pl-6 py-8 whitespace-no-wrap border-b border-gray-300">
                                                        <button onClick={cancelSubscription} className="text-subtitle1 font-sans font-semibold text-purple-light focus:outline-none float-right">
                                                            Cancel subscription
                                                        </button>
                                                    </td> 
                                                }
                                            </tr>
                                            }
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    {
                        showEditPassword ?  <EditPassword hideEditPassword={() => setEditPassword(false)} /> : null
                    }
                   
                 </main>
            </Layout>
    )
}

export default index
