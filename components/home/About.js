import Image from 'next/image'

const About = () => {
    return (
    	<div className="container mx-auto px-6 md:px-6 xl:px-24">
		   <div className="sm:flex sm:mt-8 ">
		      <div className="grid gap-1 xl:gap-2.5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-items-center">
		         <div className="flex flex-wrap content-center md:content-start about-ireadify">
		            <img src="/img/others/about-ireadify.png" width="450" height="380" alt="About iReadify" />
		         </div>
		         <div className="col-span-1 xl:col-span-2 flex flex-wrap content-center">
		            <h3 className="text-center md:text-left text-white font-sans font-semibold mb-5">
		               <span className="text-purple-light">About</span> <span className="text-blue-bright">iReadify</span>
		            </h3>
		            <p className="text-left text-subtitle1 text-gray-light mb-3 font-serif">
		               iReadify is a digital collection of children’s books with diverse characters, cultures and people from around the world. Children can read along, listen to audiobooks in many languages and hear authentic dialects.
		            </p>
		         </div>
		      </div>
		   </div>
		</div>      
    )

}
export default About
