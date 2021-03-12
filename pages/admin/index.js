import React,  { useState, useEffect} from 'react'
import ConfirmRegister from '../../components/admin/auth/ConfirmRegister'
import Login from '../../components/admin/auth/Login'
import Register from '../../components/admin/auth/Register'
import { useRouter } from 'next/router'
import { Auth } from 'aws-amplify';
import { userRole } from '../../config/bootstarp'

const Authentication = () => {

  const [ formType, setFormType ] = useState("signIn")
  const [ userCheckLoading , setUserCheckLoading] = useState(true);
  const router = useRouter()

  useEffect( ()  => {
    const checkUser = async () => {
        try {
          const user = await Auth.currentAuthenticatedUser()
          let groups = user.signInUserSession.accessToken.payload["cognito:groups"];
          if(groups && groups.includes(userRole.admin)){
            router.push('/admin/author')
          }
          else {
            router.push('/library')
          }
          
        } catch (error) {
          console.log(error)
          setUserCheckLoading(false)
          //  router.push('/')
        }
    }
    checkUser()   
  }, [])

  const updateFormStatus = (formStatus) => {
    setFormType(formStatus)
  }

  return (
    userCheckLoading ? null :
    <div>
       { formType === "signIn" ? 
          <Login updateFormStatus={updateFormStatus}/> : formType === "signUp" ?
          <Register updateFormStatus={updateFormStatus}/> : formType === "confirm" ?
          <ConfirmRegister updateFormStatus={updateFormStatus}/> : null
      }  
    </div>
  )
}

export default Authentication
