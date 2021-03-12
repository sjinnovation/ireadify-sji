import React, { useState, createContext } from 'react';

const AuthContext = createContext({
});

const AuthProvider = (props) => {

    const [showSignUpForm, setSignUpForm] = useState(false)
    const [showLoginForm, setLoginForm] = useState(false)
    const [showForgotPasswordForm, setForgotPasswordForm] = useState(false)
    const [showForgotPasswordSubmitForm, setForgotPasswordSubmitForm] = useState(false)
    const [user, setUser] = useState(null)

    const changeSignUpFormStatus = () => {
        setLoginForm(false)
        setForgotPasswordForm(false)
        setSignUpForm(!showSignUpForm)
    }

    const changeLoginFormStatus = () => {
        setSignUpForm(false)
        setForgotPasswordForm(false)
        setLoginForm(!showLoginForm)
    }

    const changeForgotPasswordFormStatus = () => {
        setLoginForm(false)
        setSignUpForm(false)
        setForgotPasswordForm(!showForgotPasswordForm)
    }

    const changeForgotPasswordSubmitFormStatus = () => {
        setForgotPasswordForm(false)
        setForgotPasswordSubmitForm(!showForgotPasswordSubmitForm)
    }

    const setUserDetails = async (authenticatedUser) => {
        setUser(authenticatedUser)
    }


    return (
        <AuthContext.Provider value={{
            showSignUpForm,
            changeSignUpFormStatus,
            setUserDetails,
            user,
            showLoginForm,
            changeLoginFormStatus,
            changeForgotPasswordFormStatus,
            changeForgotPasswordSubmitFormStatus,
            showForgotPasswordSubmitForm,
            showForgotPasswordForm,
        }
        } {...props} />
    );
}

export { AuthProvider, AuthContext }