import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Layout from '../../components/layout/Home-Layout'
import { FacebookShareButton, FacebookIcon } from 'next-share'
import { TwitterShareButton, TwitterIcon } from 'next-share'

const BlogDetails = () => {
	const router = useRouter()
    const { id } = router.query
    const blogImage = "/img/blog/read-aloud-ebooks.png";
	const blogName = "iReadify introduces Read Aloud ebooks that spotlight diverse characters, cultures, and dialects";
	const blogDescription = "<p className='text-left text-body2 text-gray-light mb-8 font-serif'>Experience the magic in books with diverse change to characters. iReadify has a growing collection of read aloud children's ebooks that both kids and the entire family will love. All books are narrated with authentic dialect and written by many diverse authors from around the world. iReadify inspires and encourage children up to 14 years old to use their imagination.</p>";
	const previousBlogList = [
	    {
	        "_id": "1",
	        "name": "iReadify Company Profile",
	        "imageUrl": "/img/blog/profile.png",
	        "date":"20.10.2020",
	        "description": "iReadify is the only streaming service that promotes diverse representation and authentic language in every story."
	    },
	    {
	        "_id": "2",
	        "name": "iReadify Press Release",
	        "imageUrl": "/img/blog/press.png",
	        "date":"10.11.2020",
	        "description": "Experience the magic in books with diverse representation. iReadify has a growing collection of children’s books that both kids and the entire family will love."
	    },
	    {
	        "_id": "3",
	        "name": "iReadify Company Profile",
	        "imageUrl": "/img/blog/company-profile.png",
	        "date":"20.09.2020",
	        "description": "iReadify is the only streaming service that promotes diverse representation and authentic language in every story."
	    },  
	]
	return (
    	<Layout> 
    	   <div className="max-w-screen-2xl mx-auto md:px-14 px-4"><img className="" src={blogImage} layout="responsive" width="100%" height="300" objectFit="fill" alt="Blog Image" /></div>
		   <div className="hidden tb:hidden tb-landscape:hidden md:block max-w-screen-2xl mx-auto md:px-14 px-4 mt-2">
		      <div className="sm:flex">
		         <div className="my-0 md:my-2 sm:w-full flex flex-col md:flex-row justify-center">
		            <nav className="w-full">
		               <ol className="list-reset flex text-gray-light font-serif">
		                  <li className="flex flex-wrap content-center">
		                     <img className="" src="/img/icons/home.png" width={20} height={20} alt="Home" />
		                     <Link href="/"><a className="text-body2 text-gray-light ml-2">Homepage</a></Link>
		                  </li>
		                  <li className="flex flex-wrap content-center"><span className="mx-2">/</span></li>
		                  <li className="flex flex-wrap content-center">
		                     <img className="" src="/img/icons/folder.png" width={20} height={20} alt="Blog" />
		                     <Link href={"/blog"}><a className="text-body2 text-gray-light ml-2">Blog</a></Link>
		                  </li>
		                  <li className="flex flex-wrap content-center"><span className="mx-2">/</span></li>
		                  <li className="flex flex-wrap content-center text-body2 text-gray-lightest ">
		                     <img className="" src="/img/icons/file-text.png" width={20} height={20} alt="Home" />
		                     <span className="ml-2">{blogName}</span>
		                  </li>
		               </ol>
		            </nav>
		         </div>
		      </div>
		   </div>
		   <div className="container mx-auto md:px-28 px-6 mt-8">
		      <div className="sm:flex mb-0 md:mb-6">
		         <div className="sm:w-full sm:px-8">
		            <div className="grid gap-4 md:gap-2.5 grid-cols-1 justify-items-center">
		               <div className="">
		                  <h3 className="text-left text-6xl text-purple-light font-sans font-semibold mb-6">{blogName}</h3>
		                  <section className="text-left text-body2 text-gray-light mb-8 font-serif" dangerouslySetInnerHTML={{ __html: blogDescription }}></section>
		                  <h4 className="text-left text-5xl text-purple-light font-sans font-semibold mb-6">Ad-free, kid-friendly, and age appropriate content</h4>
		                  <p className="text-left text-body2 text-gray-light mb-8 font-serif">iReadify provides families with ad-free, kid-friendly, and age appropriate content. We work diligently with our publishing partners, authors and narrators to make sure that the authenticity of the books are captures in a digital environment. With iReadify, children can be inspired, and feel the magic in every book. They can let their imaginations take them everywhere. Families can be confident about the content that their children are enjoying.</p>
		                  <div className="grid justify-items-center"><img className="" src="/img/blog/kid-friendly.png" width="800" height="380" alt="We Love iReadify" /></div>
		                  <h4 className="text-left text-5xl text-purple-light font-sans font-semibold my-6">Free trial and unlimited access to all customers</h4>
		                  <p className="text-left text-body2 text-gray-light font-serif">iReadify offers a free trial and unlimited access to all customers. Subscribers will be able to listen to audiobooks, read aloud stories and watch videos about diverse cultures and people. New titles will be added weekly as the iReadify library continues to grow. iReadify will take children on a magical journey, showcasing the beauty of diverse cultures and people in a safe and secure digital environment.</p>
		                  <div className="flex flex-col items-center">
		                     <div className="sm:w-2/3 text-center py-6">
		                        <ul className="list-reset flex justify-center flex-1 items-center">
		                           <li className="mr-2">
		                              <span className="text-left text-body2 font-semibold text-gray-700 font-serif">Share:</span>
		                           </li>
		                           <li className="mr-2">
		                                <FacebookShareButton
										  url={'https://d3r3xs5iiglnqq.cloudfront.net'}
										  quote={blogName}
										  hashtag={'#iReadify'}
										>
											<FacebookIcon className="hidden"/><img className="" src="/img/social_icons/icon_fb.svg" width={40} height={40} alt="Facebook" />
										</FacebookShareButton>   
		                           </li>
		                           <li className="mr-2">
		                                <TwitterShareButton
										  url={'https://d3r3xs5iiglnqq.cloudfront.net'}
										  title={blogName}
										>
											<TwitterIcon size={32} round className="hidden"/><img className="" src="/img/social_icons/icon_tw.svg" width={40} height={40} alt="Twitter" />
										</TwitterShareButton>
		                           </li>
		                        </ul>
		                     </div>
		                  </div>
		               </div>
		            </div>
		         </div>
		      </div>
		   </div>
		   <div className="container mx-auto md:px-6 px-6">
		      <div className="sm:flex mb-10">
		         <div className="sm:w-full sm:px-8">
		            <h3 className="text-left text-6xl text-purple-light font-sans font-semibold">Previous articles</h3>
		            <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3">
		               {previousBlogList.map(function (blog, index) {
		               return (
		               <article className="flex flex-col my-0 md:my-4 md:mr-2" key={blog._id}>
		                  <Link href={`/blog/${blog._id}`}>
		                  <a className="hover:opacity-75">
		                     <img className="" src={blog.imageUrl} width="435" height="306" alt="iReadify Company Profile" />
		                     <div className="bg-white flex flex-col justify-start py-2 md:py-6">
		                        <p className="pb-3 text-subtitle1 text-gray-light font-serif">{blog.date}</p>
		                        <h5 className="text-5xl font-semibold text-purple-light pb-3 font-sans">{blog.name}</h5>
		                        <p className="text-subtitle1 text-gray-light font-serif">{blog.description}</p>
		                     </div>
		                  </a>
		                  </Link>
		               </article>
		               )		                     
		               })}
		            </div>
		         </div>
		      </div>
		   </div>
		</Layout>   
    )
}

export default BlogDetails


