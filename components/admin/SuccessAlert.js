import React from 'react'

const SuccessAlert = ({show , fade, hideAlert, animateAlert, message}) => {
    return (

        show ? 
        <div className={(fade ? "fade " : '') + "alert alert-dark alert-close mx-2 mb-5"} onAnimationEnd={() => animateAlert()}>
                <button className="alert-btn-close" onClick={() => hideAlert()}  >
                    <svg className="text-white-500 block m-auto w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
                <span>{message}</span>
            </div>
        : null
         
    )
}

export default SuccessAlert
