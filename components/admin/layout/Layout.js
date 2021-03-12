
import React,  { useEffect, useState, useContext} from 'react'
import  Header from './Header'
import Sidebar from './Sidebar'
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router'
import { userRole } from '../../../config/bootstarp'
import Spinner from '../Spinner';
import { AuthContext } from '../../../context/auth';

const Layout = ({children}) => {

    const router = useRouter()
    const [ isLoading, setLoading] = useState(true)
    const { setUserDetails } = useContext(AuthContext)

    useEffect( ()  => {
        const checkUser = async () => {
            try {
               const user = await Auth.currentAuthenticatedUser()
               setUserDetails(user)
               let groups = user.signInUserSession.accessToken.payload["cognito:groups"];
                if(!groups.includes(userRole.admin)){
                    router.push('/library')
                }
                setLoading(false)
            } catch (error) {
                router.push('/') 
            }
        }
        checkUser()   
    }, [])

    const logout = async () => {
        try {
            await Auth.signOut();
            router.push('/admin')
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    return (
        
        isLoading ? <Spinner />
        :
        <div>
            <Header logout={logout} />
            <div className="flex flex-1 ">
                <Sidebar />
                <main className="py-2 px-3 flex-auto">
                    {children}
                </main> 
            </div>
                
        </div>
        
    )
}

export default Layout
