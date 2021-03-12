import Image from 'next/image';
import Link from 'next/link'
import Layout from '../../components/layout/Home-Layout'

const CancelSubscription = () => {
    return (
      <div className="bg-green-light"> 
        <Layout>
           <div className="bg-green-light pb-30 flex">
              <div className="container mx-auto px-6 md:px-24">
                 <div className="sm:flex my-10">
                    <div className="sm:w-full sm:px-8">
                       <div className="py-10 justify-items-center">
                          <h3 className="text-purple-light font-sans font-semibold mb-10 text-center md:px-4">Sorry to see You go</h3>
                          <p className="py-10 text-center text-subtitle1 text-gray-light font-serif">
                             To unsubscribe, email "unsubscribe" to<Link href={"mailto:support@ireadify.com"}><a className="text-purple-bright"> support@ireadify.com </a></Link>
                          </p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </Layout>  
      </div>
    )
}

export default CancelSubscription


