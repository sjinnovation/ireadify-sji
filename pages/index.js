import React, { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import HomePage from '../components/home'
import { Auth, API } from 'aws-amplify';
import Layout from '../components/layout/Home-Layout'
import { AuthContext } from '../context/auth'
import { useRouter } from 'next/router'
import { userRole } from '../config/bootstarp'

export default function Home() {

  const [ isLoading, setLoading] = useState(true)

  const { setUserDetails } = useContext(AuthContext)
  const router = useRouter()

  useEffect( ()  => {
      const checkUser = async () => {
          try {
            const user = await Auth.currentAuthenticatedUser()
            setUserDetails(user)
           
              let groups =  user.signInUserSession.accessToken.payload["cognito:groups"];
              if(groups && groups.includes(userRole.admin)){
                  await router.push('/admin/author')
              }
              else {
                let isSubscribed =  await fetchUserSubscription()
                if(isSubscribed){
                  await router.push('/library')
                  setLoading(false)
                }
                else {
                  await router.push('/subscription')
                }
              
              }
          } catch (error) {
              setLoading(false)
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
    isLoading? null :
    <Layout>
      <Head>
        <meta charSet="utf-8" />
        <title>Ireadify</title>
        <meta name="description" content="Ireadify - Home" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="">
        <HomePage />
      </main>
    </Layout>
  )
}
