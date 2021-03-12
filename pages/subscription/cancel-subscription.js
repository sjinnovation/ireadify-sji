import React, { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { Auth, API } from 'aws-amplify';
import Layout from '../../components/layout/Home-Layout';
import { AuthContext } from '../../context/auth';
import { userRole} from '../../config/bootstarp'
import Link from 'next/link'
import Loader from '../../components/Loader';

const index = () => {

    const [ userCheckLoading , setUserCheckLoading] = useState(true);
    const router = useRouter()
    const { setUserDetails } = useContext(AuthContext)

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
                      await router.push('/library')
                    }
                    else {
                      await router.push('/subscription')
                    }
                    
                }
                
            } catch (error) {
                setUserCheckLoading(false)
            }
        }
        checkUser()
       
    }, [])


    let fetchUserSubscription = async()=> {
        let  subscription  = await API.get('subscription', '/subscription/'+ Auth.user.attributes.email);
        if(subscription.data === null || (!subscription.data.isActive  && subscription.data.nextBillingDate < new Date().toISOString())){
           return false;
        }
        return true;
     }

    return (
        userCheckLoading ? <Loader /> :
       
        <Layout>
            <div className="bg-green-light pb-30 flex min-h-screen">
                <div className="container mx-auto px-6 md:px-24">
                    <div className="sm:flex my-10">
                        <div className="sm:w-full sm:px-8">
                            <div className="py-10 justify-items-center">
                                <h3 className="text-purple-light font-sans font-semibold mb-10 text-center md:px-4">Sorry to see You go</h3>
                                <p className="py-10 text-center text-subtitle1 text-gray-light font-serif">
                                    To unsubscribe, email "unsubscribe" to<Link href={"mailto:support@ireadify.com"}><a className="text-purple-bright"> support@ireadify.com </a></Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>   
        </Layout>  
     
    )
}

export default index
