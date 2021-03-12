import React, { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { Auth } from 'aws-amplify';
import { graphqlOperation, API } from 'aws-amplify';
import { isDeleted, userRole } from '../../config/bootstarp'
import { videoByCreatedAt } from '../../api/Video/queries';
import { AuthContext } from '../../context/auth';
import Layout from '../../components/layout/Home-Layout';
import SpotLightVideoList from '../../components/spotlight/SpotLightVideoList';
import SpotlightVideo from '../../components/spotlight/SpotlightVideo';
import SpotlightSkeleton from '../../components/spotlight/SpotlightSkeleton';
import { AnalyticsContext } from '../../context/analytics';
import Loader from '../../components/Loader';

const index = () => {

    const [loading, setLoading] = useState(true);
    const [userCheckLoading, setUserCheckLoading] = useState(true);
    const [ videos, setVideo ] = useState()
    const { setUserDetails, changeLoginFormStatus } = useContext(AuthContext)
    const [ showVideoModal, setVideoModal] = useState(false)
    const [ videoId , setVideoId] = useState("")
    const { setTrackDataDetails, trackData } = useContext(AnalyticsContext)
    const router = useRouter()

    const showVideoPopup = (videoId , id) => {
        setVideoId(videoId)
        let startTime = new Date()
        let trackDetails = {
            ...trackData,
            videoId: id,
            startTime 
        }
        localStorage.setItem('startTime', startTime);
        localStorage.setItem('videoId', id);
        localStorage.setItem('trackedData', JSON.stringify(trackDetails));
        localStorage.setItem('analyticsId', 'null');
        setTrackDataDetails(trackDetails, true)
        setVideoModal(true)
    }
    const hideVideoPopup = () => {
        setVideoModal(false)
    }

    useEffect(() => {
        const checkUser = async () => {
            try {
               const user = await Auth.currentAuthenticatedUser()
               setUserDetails(user)
             
                let groups =  user.signInUserSession.accessToken.payload["cognito:groups"];
                if(groups && groups.includes(userRole.admin)){
                    router.push('/admin/author')
                }
                else{
                    let isSubscribed =  await fetchUserSubscription()
                    if(isSubscribed){
                        setUserCheckLoading(false)
                        fetchVideo()  
                    }
                    else {
                        await router.push('/subscription')
                    }
                   
                }
                
            } catch (error) {
                await router.push('/?redirect=spotlight')
                changeLoginFormStatus()
            }
        }
        checkUser()
    }, [])

    let fetchUserSubscription = async()=> {
        let  subscription  = await API.get('subscription', '/subscription/'+ Auth.user.attributes.email);
        if(subscription.data === null || (!subscription.data.isActive  && subscription.data.nextBillingDate < new Date().toISOString())){
           return false;
        }
        return true;
     }

    let fetchVideo = async ()  => {
        setLoading(true)
        let  video  = await API.graphql(graphqlOperation(videoByCreatedAt, {
            isDeleted: isDeleted.no,
            sortDirection: 'DESC',
            filter: {
                status: { eq: true}
            }
        }))
        setVideo(video.data.videoByCreatedAt.items)
        setLoading(false)
        let trackDetails = {
            email: Auth.user.attributes.email,
            firstName: Auth.user.attributes["custom:first_name"],
            lastName: Auth.user.attributes["custom:last_name"],
            bookId: "null",
            openedDate: new Date()
        }

        setTrackDataDetails(trackDetails)
    }


    return (
        userCheckLoading ? <Loader /> :
        <Layout>
            <div className="bg-green-light pb-10 flex min-h-screen">
                <div className="container mx-auto px-6 md:px-24">
                    <div className="sm:flex">
                        <div className="sm:w-full sm:px-8">
                            <h3 className="text-purple-light font-sans font-semibold ml-6 my-6 text-center tb:text-center tb-landscape:text-center md:text-left">Videos</h3>
                            <div className="flex flex-wrap justify-center"> 
                                {
                                    loading ? <SpotlightSkeleton /> :
                                    <SpotLightVideoList spotlightList={videos} showVideoPopup={showVideoPopup}/>
                                }
                            </div>
                            {/* <div className="w-full justify-center flex">
                                <Link href="#">
                                <a className="rounded w-full my-2 inline-flex justify-center border-2 shadow-sm px-11 py-2 bg-gradient-to-r from-purple-bright to-purple-bright text-small4 font-semibold text-white hover:from-purple-darkest hover:to-blue-bright focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-100 sm:w-auto sm:text-small4 font-sans">More</a></Link>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            {
                showVideoModal ?  <SpotlightVideo videoId={videoId} hideVideoPopup={hideVideoPopup}/>  : null
            }   
        </Layout>
    )
}

export default index
