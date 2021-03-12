import Link from "next/link";

const NotFound = ({message}) => {
    return (
        <div className="max-w-screen-2xl mx-auto md:p-14 p-8">
        <div className="container mx-auto p-6 flex flex-wrap content-center justify-center ">
           <div className="grid justify-items-center">
              <img  src="/img/others/404.png" width="200" height="200" alt="Page Not Found" />
              <h4 className="text-center text-purple-light font-sans font-semibold mb-2">Oops.</h4>
              <p className="text-center text-subtitle1 text-gray-light mb-8 font-serif">{message}</p>
              <Link href="/">
                 <a  className="rounded w-full my-4 inline-flex justify-center border-2 shadow-sm px-11 py-2 bg-gradient-to-r from-purple-bright to-purple-bright text-small4 font-semibold text-white hover:from-purple-light hover:to-blue-bright focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-100 sm:ml-3 sm:w-auto sm:text-small4 font-sans">
                    Back to home
                 </a>
              </Link>
           </div>
        </div>
     </div>
    )
}

export default NotFound
