const Features = () => {
    return (
    	<div>
    	<div className="py-4 mt-14 mb-14 md:mb-0 bg-gradient-to-r from-blue-light to-blue-bright">
		   <div className="container mx-auto px-6 md:px-24">
		      <div className="sm:flex sm:mt-8 ">
		         <div className="mt-20 sm:mt-0 sm:w-full">
		            <div className="grid grid-cols-6 gap-4">
		               <div className="col-start-1 col-end-7 flex justify-center">
		                  <h3 className="text-center md:text-left text-white font-sans font-semibold mb-5">
		                     <span className="text-white">Features </span> <span className="text-purple-deep">that you'll love</span>
		                  </h3>
		               </div>
		            </div>
		            <div className="mb-10 grid gap-5 md:gap-2 grid-cols-1 md:grid-cols-3 justify-items-center">
		               <div>
		                  <div className="flex mb-16">
		                     <div className="w-1/5 items-end mr-4 md:mr-2">
		                        <img className="h-8 w-auto sm:h-10" src="/img/icons/youtube.svg" width="50" height="50" alt="Spotlight" />
		                     </div>
		                     <div className="w-4/5">
		                        <h5 className="font-semibold text-white mb-2 font-sans">Spotlight</h5>
		                        <span className="mt-1 text-body2 font-normal font-serif text-white">Meet the authors.<br/>Listen to audiobooks.</span>
		                     </div>
		                  </div>
		                  <div className="flex sm:mb-8">
		                     <div className="w-1/5 items-end mr-4 md:mr-2">
		                        <img className="h-8 w-auto sm:h-10" src="/img/icons/book.svg" width="50" height="50" alt="Features" />
		                     </div>
		                     <div className="w-4/5">
		                        <h5 className="font-semibold text-white mb-2 font-sans">Get Inspired</h5>
		                        <span className="mt-1 text-body2 font-normal font-serif text-white">Read books by<br/>diverse authors.</span>
		                     </div>
		                  </div>
		               </div>
		               <div className="sm:mb-8">
		                  <img src="/img/others/features.png" width="300" height="250" alt="Features" />
		               </div>
		               <div>
		                  <div className="flex mb-20">
		                     <div className="w-1/5 items-end mr-4 md:mr-2">
		                        <img className="h-8 w-auto sm:h-10" src="/img/icons/view.svg" width="50" height="50" alt="See Progress" />
		                     </div>
		                     <div className="w-4/5">
		                        <h5 className="font-semibold text-white mb-2 font-sans">See Progress</h5>
		                        <span className="mt-1 text-body2 font-normal font-serif text-white">Track your child's reading.</span>
		                     </div>
		                  </div>
		                  <div className="flex sm:mb-8">
		                     <div className="w-1/5 items-end mr-4 md:mr-2">
		                        <img className="h-8 w-auto sm:h-10" src="/img/icons/rating.svg" width="50" height="50" alt="Favorite Books" />
		                     </div>
		                     <div className="w-4/5">
		                        <h5 className="font-semibold text-white mb-2 font-sans">Favorite Books</h5>
		                        <span className="mt-1 text-body2 font-normal font-serif text-white">Tag and save books<br/>you love.</span>
		                     </div>
		                  </div>
		               </div>
		            </div>
		         </div>
		      </div>
		   </div>
		</div>  
		<div className="h-0 md:h-44 py-0 md:py-20 bg-none md:bg-we-love bg-auto md:bg-cover bg-no-repeat bg-center">
		</div>
		</div>   
    )

}

export default Features
