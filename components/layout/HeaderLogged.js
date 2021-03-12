import { useRouter } from 'next/router'
import Link from 'next/link'
import React, { useContext, useState, useEffect, useRef } from 'react'
import { AuthContext } from '../../context/auth';
import { Auth } from 'aws-amplify';
import SearchBox from './SearchBox';
import SearchBoxMobile from './SearchBoxMobile';

function HeaderLogged() {
	const [openDropdown, setOpenDropdown] = useState(false);
	const [open, setOpen] = useState(false);
	const { setUserDetails } = useContext(AuthContext) 
	const router = useRouter()

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
            if(error.message === "User is disabled.") {
              Auth.signOut()
              router.push('/')
              window.location.reload();
          }
        }
	}

	const dropdownRef = useRef(null);
    useEffect(() => {
      if (!openDropdown) return;
      function handleClick(event) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setOpenDropdown(false);
        }
      }
      window.addEventListener("click", handleClick);
      return () => window.removeEventListener("click", handleClick);
    }, [openDropdown]);
    
	return (
		<header className="relative bg-white">
		   <nav className="max-w-screen-2xl mx-auto md:px-14 px-4">
		      <div className="flex flex-row justify-between items-center tb-landscape:justify-between lg:justify-center">
		         <div className="flex justify-start tb-landscape:justify-start lg:justify-center md:mr-5 p-1">
		            <Link href="/">
		            <a>
		            <span className="sr-only">iReadify</span>
		            <img className="w-auto" src="/img/logos/logo.svg" width={150} height={46} alt="iReadify Logo" />
		            </a></Link>
		         </div>
		         <div className="-mr-2 -my-2 tb-landscape:flex lg:hidden">
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
		         <div className="hidden tb-landscape:hidden lg:flex flex-row static">
		            <div className="flex static mx-2.5 items-center">
		               <Link href="/spotlight">
		               <a className="flex">
		                  <svg className="flex static justify-between mx-2.5 hover:stroke-current stroke-1 hover:text-blue-400" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		                     <path d="M22.54 6.42C22.4212 5.94541 22.1793 5.51057 21.8386 5.15941C21.498 4.80824 21.0707 4.55318 20.6 4.42C18.88 4 12 4 12 4C12 4 5.11999 4 3.39999 4.46C2.92924 4.59318 2.50197 4.84824 2.16134 5.19941C1.82071 5.55057 1.57878 5.98541 1.45999 6.46C1.14521 8.20556 0.991228 9.97631 0.999992 11.75C0.988771 13.537 1.14276 15.3213 1.45999 17.08C1.59095 17.5398 1.8383 17.9581 2.17814 18.2945C2.51797 18.6308 2.93881 18.8738 3.39999 19C5.11999 19.46 12 19.46 12 19.46C12 19.46 18.88 19.46 20.6 19C21.0707 18.8668 21.498 18.6118 21.8386 18.2606C22.1793 17.9094 22.4212 17.4746 22.54 17C22.8524 15.2676 23.0063 13.5103 23 11.75C23.0112 9.96295 22.8572 8.1787 22.54 6.42V6.42Z" stroke="#777676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		                     <path d="M9.75 15.02L15.5 11.75L9.75 8.47998V15.02Z" stroke="#777676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		                  </svg>
		                  <p className="static font-serif text-center font-semibold items-center tracking-tight flex-none text-gray-light hover:text-purple-light text-small2">Spotlight</p>
		               </a>
		               </Link>
		            </div>
		            <div className="flex static mx-2.5 items-center">
		               <Link href="/library">
		               <a className="flex">
		                  <svg className="flex static justify-between mx-2.5 hover:stroke-current stroke-1 hover:text-blue-400" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		                     <path d="M2 3H8C9.06087 3 10.0783 3.42143 10.8284 4.17157C11.5786 4.92172 12 5.93913 12 7V21C12 20.2044 11.6839 19.4413 11.1213 18.8787C10.5587 18.3161 9.79565 18 9 18H2V3Z" stroke="#777676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		                     <path d="M22 3H16C14.9391 3 13.9217 3.42143 13.1716 4.17157C12.4214 4.92172 12 5.93913 12 7V21C12 20.2044 12.3161 19.4413 12.8787 18.8787C13.4413 18.3161 14.2044 18 15 18H22V3Z" stroke="#777676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		                  </svg>
		                  <p className="static font-serif text-center font-semibold items-center tracking-tight flex-none text-gray-light hover:text-purple-light text-small2">Library</p>
		               </a>
		               </Link>
		            </div>
		            <div className="flex static mx-2.5 items-center">
		               <Link href="/myBooks">
		               <a className="flex">
		                  <svg className="flex static justify-between mx-2.5 hover:stroke-current stroke-1 hover:text-blue-400" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		                     <path d="M20.84 4.60987C20.3292 4.09888 19.7228 3.69352 19.0554 3.41696C18.3879 3.14039 17.6725 2.99805 16.95 2.99805C16.2275 2.99805 15.5121 3.14039 14.8446 3.41696C14.1772 3.69352 13.5708 4.09888 13.06 4.60987L12 5.66987L10.94 4.60987C9.9083 3.57818 8.50903 2.99858 7.05 2.99858C5.59096 2.99858 4.19169 3.57818 3.16 4.60987C2.1283 5.64156 1.54871 7.04084 1.54871 8.49987C1.54871 9.95891 2.1283 11.3582 3.16 12.3899L4.22 13.4499L12 21.2299L19.78 13.4499L20.84 12.3899C21.351 11.8791 21.7563 11.2727 22.0329 10.6052C22.3095 9.93777 22.4518 9.22236 22.4518 8.49987C22.4518 7.77738 22.3095 7.06198 22.0329 6.39452C21.7563 5.72706 21.351 5.12063 20.84 4.60987V4.60987Z" stroke="#777676" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
		                  </svg>
		                  <p className="static font-serif text-center font-semibold items-center tracking-tight flex-none text-gray-light hover:text-purple-light text-small2">My Books</p>
		               </a>
		               </Link>
		            </div>
		         </div>
		         <SearchBox />
		         <div className="hidden tb-landscape:hidden lg:flex static mx-2.5 items-center">
		            <div className="relative inline-block text-left dropdown">
		               <div className="flex items-center justify-start space-x-2 cursor-pointer" onClick={() => setOpenDropdown(account => !account)}>
		                  <span className="flex dropdown">
		                     <svg className="mr-2.5" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
		                        <path d="M13 2.1665C7.12727 2.1665 2.16669 7.12709 2.16669 12.9998C2.16669 16.4546 3.89135 19.5843 6.50002 21.5842V21.6665H6.61052C8.41752 23.0153 10.6308 23.8332 13 23.8332C15.3693 23.8332 17.5825 23.0153 19.3895 21.6665H19.5V21.5842C22.1087 19.5843 23.8334 16.4557 23.8334 12.9998C23.8334 7.12709 18.8728 2.1665 13 2.1665ZM8.74685 20.5041C8.9065 19.7819 9.30752 19.1358 9.88378 18.6722C10.46 18.2085 11.1771 17.9552 11.9167 17.9539H14.0834C14.8229 17.9554 15.5399 18.2088 16.1161 18.6724C16.6923 19.136 17.0934 19.782 17.2532 20.5041C15.9879 21.2375 14.534 21.6665 13 21.6665C11.466 21.6665 10.0122 21.2375 8.74685 20.5041ZM19.0775 19.1109C18.6643 18.1271 17.9701 17.287 17.0817 16.6958C16.1934 16.1046 15.1504 15.7886 14.0834 15.7873H11.9167C10.8496 15.7886 9.80664 16.1046 8.91831 16.6958C8.02998 17.287 7.33575 18.1271 6.92252 19.1109C5.33327 17.5303 4.33335 15.3572 4.33335 12.9998C4.33335 8.30142 8.3016 4.33317 13 4.33317C17.6984 4.33317 21.6667 8.30142 21.6667 12.9998C21.6667 15.3572 20.6668 17.5303 19.0775 19.1109Z" fill="#777676" />
		                        <path d="M13 6.5C10.53 6.5 8.66669 8.36333 8.66669 10.8333C8.66669 13.3033 10.53 15.1667 13 15.1667C15.47 15.1667 17.3334 13.3033 17.3334 10.8333C17.3334 8.36333 15.47 6.5 13 6.5ZM13 13C11.7239 13 10.8334 12.1095 10.8334 10.8333C10.8334 9.55717 11.7239 8.66667 13 8.66667C14.2762 8.66667 15.1667 9.55717 15.1667 10.8333C15.1667 12.1095 14.2762 13 13 13Z" fill="#777676" />
		                     </svg>
		                     <p className="static font-serif text-center font-medium items-center tracking-tight flex-none text-gray-light hover:text-purple-light ">My account</p>
		                  </span>
		                  <svg className="mt-1 h-5 w-5 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
		               </div>
		               {openDropdown && (
			               <div ref={dropdownRef} className="dropdown-menu origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-40">
			                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
							  	<Link href="/activity" ><a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Activity</a></Link>
								<Link href="/profile" ><a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Profile</a></Link>
			                     <a href="#" onClick={logout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Logout</a>
			                  </div>
			               </div>
		               )}
		            </div>
		         </div>
		      </div>
		   </nav>
		   { open && 
		   <nav className="absolute top-0 inset-x-0 transition transform origin-top-right z-10">
		      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
		         <div className="py-6 px-4">
		            <div className="flex items-center justify-between mb-2">
		               <div>
		                  <Link href="/">
		                  <a>
		                  <img className="" priority="true" src="/img/logos/logo.svg" width={150} height={46} alt="iReadify Logo" />
		                  </a></Link>
		               </div>
		               <div className="-mr-2 -mt-3.5">
		                  <button type="button" className="bg-white rounded-md p-2 inline-flex justify-center text-gray-400 hover:text-gray-light hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" onClick={toggleMobileMenu}>
		                     <span className="sr-only">Close menu</span>
		                     <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
		                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
		                     </svg>
		                  </button>
		               </div>
		            </div>
		            <div>
		               <div className="flex items-center justify-start static my-2">
		                  <Link href="/spotlight">
		                  <a className="flex">
		                     <svg className="flex static justify-between mr-2.5 hover:stroke-current stroke-1 hover:text-blue-400" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		                        <path d="M22.54 6.42C22.4212 5.94541 22.1793 5.51057 21.8386 5.15941C21.498 4.80824 21.0707 4.55318 20.6 4.42C18.88 4 12 4 12 4C12 4 5.11999 4 3.39999 4.46C2.92924 4.59318 2.50197 4.84824 2.16134 5.19941C1.82071 5.55057 1.57878 5.98541 1.45999 6.46C1.14521 8.20556 0.991228 9.97631 0.999992 11.75C0.988771 13.537 1.14276 15.3213 1.45999 17.08C1.59095 17.5398 1.8383 17.9581 2.17814 18.2945C2.51797 18.6308 2.93881 18.8738 3.39999 19C5.11999 19.46 12 19.46 12 19.46C12 19.46 18.88 19.46 20.6 19C21.0707 18.8668 21.498 18.6118 21.8386 18.2606C22.1793 17.9094 22.4212 17.4746 22.54 17C22.8524 15.2676 23.0063 13.5103 23 11.75C23.0112 9.96295 22.8572 8.1787 22.54 6.42V6.42Z" stroke="#777676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		                        <path d="M9.75 15.02L15.5 11.75L9.75 8.47998V15.02Z" stroke="#777676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		                     </svg>
		                     <p className="static font-serif text-center font-semibold items-center tracking-tight flex-none text-gray-light hover:text-purple-light text-small2">Spotlight</p>
		                  </a>
		                  </Link>
		               </div>
		               <div className="flex items-center justify-start my-2">
		                  <Link href="/library">
		                  <a className="flex">
		                     <svg className="flex static justify-between mr-2.5 hover:stroke-current stroke-1 hover:text-blue-400" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		                        <path d="M2 3H8C9.06087 3 10.0783 3.42143 10.8284 4.17157C11.5786 4.92172 12 5.93913 12 7V21C12 20.2044 11.6839 19.4413 11.1213 18.8787C10.5587 18.3161 9.79565 18 9 18H2V3Z" stroke="#777676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		                        <path d="M22 3H16C14.9391 3 13.9217 3.42143 13.1716 4.17157C12.4214 4.92172 12 5.93913 12 7V21C12 20.2044 12.3161 19.4413 12.8787 18.8787C13.4413 18.3161 14.2044 18 15 18H22V3Z" stroke="#777676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		                     </svg>
		                     <p className="static font-serif text-center font-semibold items-center tracking-tight flex-none text-gray-light hover:text-purple-light text-small2">Library</p>
		                  </a>
		                  </Link>
		               </div>
		               <div className="flex items-center justify-start my-2">
		                  <Link href="/myBooks">
		                  <a className="flex">
		                     <svg className="flex static justify-between mr-2.5 hover:stroke-current stroke-1 hover:text-blue-400" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		                        <path d="M20.84 4.60987C20.3292 4.09888 19.7228 3.69352 19.0554 3.41696C18.3879 3.14039 17.6725 2.99805 16.95 2.99805C16.2275 2.99805 15.5121 3.14039 14.8446 3.41696C14.1772 3.69352 13.5708 4.09888 13.06 4.60987L12 5.66987L10.94 4.60987C9.9083 3.57818 8.50903 2.99858 7.05 2.99858C5.59096 2.99858 4.19169 3.57818 3.16 4.60987C2.1283 5.64156 1.54871 7.04084 1.54871 8.49987C1.54871 9.95891 2.1283 11.3582 3.16 12.3899L4.22 13.4499L12 21.2299L19.78 13.4499L20.84 12.3899C21.351 11.8791 21.7563 11.2727 22.0329 10.6052C22.3095 9.93777 22.4518 9.22236 22.4518 8.49987C22.4518 7.77738 22.3095 7.06198 22.0329 6.39452C21.7563 5.72706 21.351 5.12063 20.84 4.60987V4.60987Z" stroke="#777676" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
		                     </svg>
		                     <p className="static font-serif text-center font-semibold items-center tracking-tight flex-none text-gray-light hover:text-purple-light text-small2">My Books</p>
		                  </a>
		                  </Link>
		               </div>
		               <div className="flex items-center justify-start relative inline-block text-left dropdown my-2">
		                  <div className="flex items-center justify-start space-x-2" onClick={() => setOpenDropdown(account => !account)}>
		                     <span className="flex dropdown">
		                        <svg className="mr-2.5" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
		                           <path d="M13 2.1665C7.12727 2.1665 2.16669 7.12709 2.16669 12.9998C2.16669 16.4546 3.89135 19.5843 6.50002 21.5842V21.6665H6.61052C8.41752 23.0153 10.6308 23.8332 13 23.8332C15.3693 23.8332 17.5825 23.0153 19.3895 21.6665H19.5V21.5842C22.1087 19.5843 23.8334 16.4557 23.8334 12.9998C23.8334 7.12709 18.8728 2.1665 13 2.1665ZM8.74685 20.5041C8.9065 19.7819 9.30752 19.1358 9.88378 18.6722C10.46 18.2085 11.1771 17.9552 11.9167 17.9539H14.0834C14.8229 17.9554 15.5399 18.2088 16.1161 18.6724C16.6923 19.136 17.0934 19.782 17.2532 20.5041C15.9879 21.2375 14.534 21.6665 13 21.6665C11.466 21.6665 10.0122 21.2375 8.74685 20.5041ZM19.0775 19.1109C18.6643 18.1271 17.9701 17.287 17.0817 16.6958C16.1934 16.1046 15.1504 15.7886 14.0834 15.7873H11.9167C10.8496 15.7886 9.80664 16.1046 8.91831 16.6958C8.02998 17.287 7.33575 18.1271 6.92252 19.1109C5.33327 17.5303 4.33335 15.3572 4.33335 12.9998C4.33335 8.30142 8.3016 4.33317 13 4.33317C17.6984 4.33317 21.6667 8.30142 21.6667 12.9998C21.6667 15.3572 20.6668 17.5303 19.0775 19.1109Z" fill="#777676" />
		                           <path d="M13 6.5C10.53 6.5 8.66669 8.36333 8.66669 10.8333C8.66669 13.3033 10.53 15.1667 13 15.1667C15.47 15.1667 17.3334 13.3033 17.3334 10.8333C17.3334 8.36333 15.47 6.5 13 6.5ZM13 13C11.7239 13 10.8334 12.1095 10.8334 10.8333C10.8334 9.55717 11.7239 8.66667 13 8.66667C14.2762 8.66667 15.1667 9.55717 15.1667 10.8333C15.1667 12.1095 14.2762 13 13 13Z" fill="#777676" />
		                        </svg>
		                        <p className="static font-serif text-center font-semibold items-center tracking-tight flex-none text-gray-light hover:text-purple-light text-small2 p-1">My account</p>
		                     </span>
		                     <svg className="mt-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                             </svg>
		                  </div>
		                  {openDropdown && (
			                  <div ref={dropdownRef} className="dropdown-menu mobile-dropdown-menu origin-top-right absolute right-0 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-40">
			                     <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
								 	<Link href="/activity" ><a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Activity</a></Link>
									<Link href="/profile" ><a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Profile</a></Link>
			                        <a href="#" onClick={logout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Logout</a>
			                     </div>
			                  </div>
		                  )}
		               </div>
						<SearchBoxMobile />
		            </div>
		         </div>
		      </div>
		   </nav>
		   }
		</header>
	)
}

export default HeaderLogged
