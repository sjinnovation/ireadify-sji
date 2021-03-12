import React, { useContext } from 'react'
import Footer from './Home-Footer'
import Header from './Header'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Signup from '../authentication/Signup'
import { AuthContext } from '../../context/auth'
import Login from '../authentication/Login'
import ForgotPassword from '../authentication/ForgotPassword'
import HeaderLogged from './HeaderLogged'

const Layout = ({ children }) => {

    const pathname = useRouter().pathname;
    const { showSignUpForm, showLoginForm, showForgotPasswordForm, user } = useContext(AuthContext)
 
    return (
        <div className="flex flex-col min-h-screen">
            <Head>
                <title>Ireadify</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="icon" href="/favicon.ico" />
                { pathname === "/contact" ? <script id="ze-snippet" src="https://static.zdassets.com/ekr/snippet.js?key=12f32f8b-0cf6-4dd1-9166-38df3901be78"> </script> : "" }
            </Head>
            { user ? <HeaderLogged /> : <Header /> }
            <div className="flex-grow">
                {children}
            </div>
            <Footer />
            {
                showSignUpForm ?
                    <Signup /> : null
            }
            {
                showLoginForm ?
                    <Login /> : null
            }
            {
                showForgotPasswordForm ?
                <ForgotPassword /> : null
            }
        </div>

    )
}

export default Layout
