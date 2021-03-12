import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/Home-Layout'
import * as queries from "../../api/faq/queries";
import isDeleted from "../../config/bootstarp"
import _ from 'lodash';
import { API } from 'aws-amplify';

const Faq = () => {
    const [open, setOpen] = useState(1);
    const [faq, setFaq] = useState([])
    const [isLoading, setLoading] = useState(false)


    const onOpenChanged = (value) => {
        setOpen(value)
    }


    useEffect(() => {
        fetchFaq()
    }, [])


    let fetchFaq = async () => {
        setLoading(true)
        const faqs = await API.graphql({
            query: queries.listFaqs,
            authMode: 'API_KEY',
            variables: {
                isDeleted: isDeleted.no,
            },
        });
        const data = faqs.data.listFaqs.items
        setFaq(data)
        setLoading(false)
    }
    return (
        <Layout>
            <div className="h-32 md:h-64 py-20 bg-about-banner bg-auto md:bg-contain bg-no-repeat bg-center">
                <div className="container mx-auto px-6">
                    <div className="sm:flex">
                        <div className="my-0 md:my-8 sm:w-full sm:px-8 flex flex-col md:flex-row justify-center">
                            <h3 className="text-center text-white font-sans font-semibold">
                                FAQ
		               		</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-green-light pb-36">
                <div className="container mx-auto px-6 md:px-24">
                    <div className="sm:flex">
                        <div className="sm:w-full sm:px-8">
                            <div className="grid gap-4 md:gap-2.5 grid-cols-1 justify-items-center">
                                <div className="">
                                    <div className="grid grid-cols-6 gap-4 pt-14">
                                        <div className="col-start-1 col-end-7 md:col-start-2 md:col-span-4 justify-center">
                                            <h3 className="text-left text-white font-sans font-semibold mb-5 text-center">
                                                <span className="text-purple-light">How to Log-in to your iReadify account?</span>
                                            </h3>
                                            {isLoading ?
                                                <div>
                                                    <div className="mb-5 m-10">
                                                        <div className="animate-pulse bg-gray-200 h-20 w-full m-1 mb-5"></div>
                                                        <div className="animate-pulse bg-gray-200 h-20 w-full m-1 mb-5"></div>
                                                    </div>
                                                </div>
                                                :
                                                faq.map((item) =>
                                                    <div key={item.id}>
                                                        {item.topic === "How to Log-in to your iReadify account?" ?
                                                            <div className="tab w-full overflow-hidden bg-white rounded mb-5 shadow-md">
                                                                <input className="absolute opacity-0" id={`tab-single-${item.id}`} type="radio" name="tabs2" checked={open === item.id ? true : false} onChange={() => onOpenChanged(item.id)} />
                                                                <label className="block p-5 leading-normal cursor-pointer text-body1 text-gray-light font-sans font-semibold" htmlFor={`tab-single-${item.id}`}>{item.question}</label>
                                                                <div className="tab-content overflow-hidden leading-normal">
                                                                    <p className="py-5 px-5 md:pr-9 md:pl-16 text-subtitle1 text-gray-light font-serif">{item.answer}</p>
                                                                </div>
                                                            </div>
                                                            : null
                                                        }
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-6 gap-4 pt-14">
                                        <div className="col-start-1 col-end-7 md:col-start-2 md:col-span-4 justify-center">
                                            <h3 className="text-left text-white font-sans font-semibold mb-5 text-center">
                                                <span className="text-purple-light">Subscription & payment</span>
                                            </h3>
                                            {isLoading ?
                                                <div>
                                                    <div className="mb-5 m-10">
                                                        <div className="animate-pulse bg-gray-200 h-20 w-full m-1 mb-5"></div>
                                                        <div className="animate-pulse bg-gray-200 h-20 w-full m-1 mb-5"></div>
                                                    </div>
                                                </div>
                                                :
                                                faq.map((item) =>
                                                    <div key={item.id}>
                                                        {item.topic === "Subscription & payment" ?
                                                            <div className="tab w-full overflow-hidden bg-white rounded mb-5 shadow-md">
                                                                <input className="absolute opacity-0" id={`tab-single-${item.id}`} type="radio" name="tabs2" checked={open === item.id ? true : false} onChange={() => onOpenChanged(item.id)} />
                                                                <label className="block p-5 leading-normal cursor-pointer text-body1 text-gray-light font-sans font-semibold" htmlFor={`tab-single-${item.id}`}>{item.question}</label>
                                                                <div className="tab-content overflow-hidden leading-normal">
                                                                    <p className="py-5 px-5 md:pr-9 md:pl-16 text-subtitle1 text-gray-light font-serif">{item.answer}</p>
                                                                </div>
                                                            </div>
                                                            : null
                                                        }
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-6 gap-4 pt-14 pb-10">
                                        <div className="col-start-1 col-end-7 md:col-start-2 md:col-span-4 justify-center">
                                            <h3 className="text-left text-white font-sans font-semibold mb-5 text-center">
                                                <span className="text-purple-light">General questions</span>
                                            </h3>
                                            {isLoading ?
                                                <div>
                                                    <div className="mb-5 m-10">
                                                        <div className="animate-pulse bg-gray-200 h-20 w-full m-1 mb-5"></div>
                                                        <div className="animate-pulse bg-gray-200 h-20 w-full m-1 mb-5"></div>
                                                    </div>
                                                </div>
                                                :
                                                faq.map((item) =>
                                                    <div key={item.id}>
                                                        {item.topic === "General questions" ?
                                                            <div className="tab w-full overflow-hidden bg-white rounded mb-5 shadow-md">
                                                                <input className="absolute opacity-0" id={`tab-single-${item.id}`} type="radio" name="tabs2" checked={open === item.id ? true : false} onChange={() => onOpenChanged(item.id)} />
                                                                <label className="block p-5 leading-normal cursor-pointer text-body1 text-gray-light font-sans font-semibold" htmlFor={`tab-single-${item.id}`}>{item.question}</label>
                                                                <div className="tab-content overflow-hidden leading-normal">
                                                                    <p className="py-5 px-5 md:pr-9 md:pl-16 text-subtitle1 text-gray-light font-serif">{item.answer}</p>
                                                                </div>
                                                            </div>
                                                            : null
                                                        }
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default Faq