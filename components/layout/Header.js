import Link from 'next/link'
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth';
import { Auth } from 'aws-amplify';

function Header() {
	const [open, setOpen] = useState(false);
	const { changeSignUpFormStatus, user, setUserDetails, changeLoginFormStatus } = useContext(AuthContext) 

	function toggleMobileMenu() {
		setOpen(!open)
	}

	const logout = async () => {
        try {
            let user = await Auth.currentAuthenticatedUser();
			await Auth.updateUserAttributes( user, {
				'custom:last_login': new Date()
			});
			await Auth.signOut();
			await router.push('/')
			setUserDetails(null)
        } catch (error) {
            console.log('error signing out: ', error);
        }
	}
	
    return (
		<header className="relative bg-white">
			<nav className="max-w-screen-2xl mx-auto md:px-14 px-4">
				<div
				className="flex justify-between items-center py-6 md:py-3 md:justify-start md:space-x-10 "
				>
				<div className="flex justify-start lg:w-0 lg:flex-1">
					<Link href="/"><a>
						<span className="sr-only">iReadify</span>
						<img className="h-8 w-auto sm:h-10" src="/img/logos/logo.svg" width={200} height={46} alt="iReadify Logo" />
					</a></Link>
				</div>
				<div className="-mr-2 -my-2 md:hidden">
					<button
					type="button"
					className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-light hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
					onClick={toggleMobileMenu}>
					<span className="sr-only">Open menu</span>
					<svg
						className="h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
					</button>
				</div>
				{ user ? 
					<div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
						<button onClick={logout} className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-10 py-4 border border-transparent rounded shadow-sm text-base font-medium text-white bg-purple-400 hover:bg-purple-400">Logout</button>
					</div>
					 :
					 <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
						<button onClick={changeLoginFormStatus} className="whitespace-nowrap text-subtitle1 font-medium text-gray-light hover:text-gray-900">
							LOG IN
						</button>
						<button onClick={changeSignUpFormStatus} className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-6 py-4 border border-transparent rounded shadow-sm text-base bg-gradient-to-r from-purple-bright to-purple-bright font-medium text-white hover:from-purple-light hover:to-blue-bright focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-100"
						>START FREE TRIAL</button>
					 </div>
				}
				</div>
			</nav>
			{ open && 
				<nav className="absolute top-0 inset-x-0 transition transform origin-top-right">
					<div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
						<div className="py-6 px-4">
							<div className="flex items-center justify-between">
								<div>
									<Link href="/"><a>
										<img className="h-8 w-auto sm:h-10" priority="true" src="/img/logos/logo.svg" width={200} height={46} alt="iReadify Logo" />
									</a></Link>
								</div>
								<div className="-mr-2">
								<button type="button" className="bg-white rounded-md p-2 inline-flex justify-center text-gray-400 hover:text-gray-light hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" onClick={toggleMobileMenu}>
									<span className="sr-only">Close menu</span>
									<svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
								</div>
							</div>
							<div>
								<div className="flex items-center justify-center">
									<button onClick={changeLoginFormStatus} className="w-full flex px-4 py-2 justify-center text-subtitle1 font-medium font-semibold text-gray-light hover:text-gray-900">
										LOG IN
									</button>
								</div>
								<div className="flex items-center justify-center">
									<button onClick={changeSignUpFormStatus} className="whitespace-nowrap px-6 py-4 rounded shadow-sm text-base bg-gradient-to-r from-purple-bright to-purple-bright font-medium text-white hover:from-purple-light hover:to-blue-bright focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-100">
										START FREE TRIAL
									</button>
								</div>
							</div>
						</div>
					</div>
				</nav>
			}
		</header>
    )
}

export default Header
