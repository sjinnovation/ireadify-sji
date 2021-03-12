import { graphqlOperation, API } from 'aws-amplify';
import React, { useState, useEffect } from 'react'
import * as queries from "../../api/testimonial/queries";
import isDeleted from "../../config/bootstarp"
import _ from 'lodash';


const Testimonial = () => {

    const [visibility, setVisibility] = useState(1);
    function moveNext(id) {
        setVisibility(id)
    }

    const [testimonial, setTestimonial] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [nextToken, setNextToken] = useState("")

    useEffect(() => {
        fetchTestimonial()
    }, [])

    let fetchTestimonial = async () => {
        setLoading(true)
        if ((nextToken === "" || nextToken === !null) === false) {
            const testimonials = await API.graphql({
                query: queries.listTestimonials,
                authMode: 'API_KEY',
                variables: {
                    limit: 1,
                    nextToken: nextToken
                },
            });
            const nextTokens = testimonials.data.listTestimonials.nextToken
            const data = testimonials.data.listTestimonials.items
            setNextToken(nextTokens)
            setTestimonial(data)
            setLoading(false)
        }
        else {
            setNextToken(null)
        }
        setLoading(false)
    }

    return (
        <div className="">
            <div className="container mx-auto px-6 md:px-24">
                <div className="sm:flex">
                    <div className="mt-8 sm:w-full">
                        <div className="grid grid-cols-6 gap-4">
                            <div className="col-start-1 col-end-7 flex justify-center">
                                <h3 className="text-left text-white font-sans font-semibold">
                                    <span className="text-blue-bright">We Love </span><span className="text-purple-light">iReadify</span>
                                </h3>
                            </div>
                        </div>
                        {
                            testimonial.map((item) =>
                                <div className="grid gap-4 md:gap-2.5 grid-cols-1 md:grid-cols-2 justify-items-center mt-0 lg:mt-6">
                                    <div className="">
                                        <section id="carousel">
                                            <figure className={visibility === 1 ? "visible" : "hidden"}>

                                                <div className="relative">

                                                    {
                                                        isLoading
                                                            ?
                                                            <div className="pt-4 md:pt-20 px-6 sm:px-12">
                                                                <div className="animate-pulse bg-gray-100 pt-1 m-4 h-8 w-48"></div>
                                                                <div className="animate-pulse bg-gray-100 pt-1 m-4 h-8 w-56"></div>
                                                                <div className="animate-pulse bg-gray-100 pt-1 m-4 h-24 w-96"></div>
                                                            </div>
                                                            :
                                                            <div key={item.id} className="pt-4 md:pt-20 px-6 sm:px-12">
                                                                <h4 className="text-left text-purple-light font-sans font-semibold mb-3">{item.name}</h4>
                                                                <p className="text-left text-subtitle1 text-gray-light mb-3 font-serif font-semibold">{item.title}</p>
                                                                <p className="text-left text-subtitle1 text-gray-light mb-3 font-serif">{item.testimonial}</p>


                                                            </div>
                                                    }
                                                </div>

                                            </figure>
                                        </section>
                                    </div>
                                    {
                                        isLoading
                                            ?
                                            <div className="animate-pulse bg-gray-100 py-4 md:py-20 px-6 sm:px-12 loader-img-testimonial"></div>
                                            :
                                            <div className="wrap-testimonial py-2 md:py-16 bg-testimonial bg-contain bg-no-repeat py-4 place-self-center">
                                                <div className="relative h-auto w-64 flex justify-center img-testimonial">
                                                {
                                                    item.image === ""
                                                        ?
                                                        <img src="/img/others/testimonial.png" width={294} height={295} alt="We Love iReadify" />
                                                        :
                                                        <img src={item.image} width={294} height={295} alt="We Love iReadify" />
                                                }
                                                    <div className="flex absolute rounded-full bg-white h-20 w-20 items-center justify-center bottom-16 md:bottom-10 -right-4 md:-right-8 pl-1">
                                                        <svg width="59" height="59" viewBox="0 0 59 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M51.1564 11.4137C49.9221 10.1788 48.4565 9.19916 46.8435 8.5308C45.2305 7.86244 43.5016 7.51843 41.7556 7.51843C40.0096 7.51843 38.2806 7.86244 36.6676 8.5308C35.0546 9.19916 33.5891 10.1788 32.3547 11.4137L29.7931 13.9753L27.2314 11.4137C24.7381 8.92042 21.3566 7.51972 17.8306 7.51972C14.3046 7.51973 10.923 8.92042 8.42972 11.4137C5.93646 13.9069 4.53577 17.2885 4.53577 20.8145C4.53577 24.3405 5.93646 27.7221 8.42972 30.2153L10.9914 32.777L29.7931 51.5787L48.5947 32.777L51.1564 30.2153C52.3913 28.981 53.3709 27.5155 54.0393 25.9025C54.7076 24.2894 55.0516 22.5605 55.0516 20.8145C55.0516 19.0685 54.7076 17.3396 54.0393 15.7266C53.3709 14.1135 52.3913 12.648 51.1564 11.4137Z" fill="#DB3B3E" stroke="#DB3B3E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                            <path d="M16.3406 14.8565C16.8874 14.7784 17.2673 14.2719 17.1892 13.7252C17.1111 13.1784 16.6045 12.7985 16.0578 12.8766L16.3406 14.8565ZM9.78114 20.0142C9.67283 20.5558 10.024 21.0826 10.5656 21.1909C11.1072 21.2992 11.634 20.948 11.7423 20.4064L9.78114 20.0142ZM16.0578 12.8766C14.7094 13.0693 13.3345 13.904 12.2224 15.1164C11.0968 16.3436 10.1801 18.0192 9.78114 20.0142L11.7423 20.4064C12.0683 18.7765 12.8131 17.4312 13.6963 16.4683C14.5931 15.4906 15.5745 14.966 16.3406 14.8565L16.0578 12.8766Z" fill="white"/>
                                                        </svg>
                                                   </div>
                                                </div>
                                            </div>
                                    }
                                </div>
                            )}
                        {
                            testimonial.length === 0 && nextToken === null ?
                                <div className="flex static items-center justify-center mt-10 mb-4">
                                    <button onClick={() => fetchTestimonial()} className="whitespace-nowrap inline-flex items-center justify-center px-6 py-4 border border-transparent rounded shadow-sm text-base bg-gradient-to-r from-purple-bright to-purple-bright font-medium text-white hover:from-purple-light hover:to-blue-bright focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-100">
                                        Read testimonials by our Clients
                                    </button>
                                </div>
                                :
                                <div className="flex static items-center justify-center">
                                    {
                                        isLoading ? null
                                            :
                                            <div onClick={() => fetchTestimonial()} className="cursor-pointer flex pb-12">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width={44} height={44} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#EF6063" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" />
                                                    <polyline points="15 6 9 12 15 18" />
                                                </svg>
                                                <svg onClick={() => fetchTestimonial()} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-right" width={44} height={44} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#EF6063" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" />
                                                    <polyline points="9 6 15 12 9 18" />
                                                </svg>
                                            </div>
                                    }
                                </div>
                        }

                    </div>
                </div>
            </div>
        </div>

    )
}
export default Testimonial
