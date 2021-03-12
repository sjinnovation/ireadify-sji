import React, { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { userRole } from '../../config/bootstarp'
import { AuthContext } from '../../context/auth';
import Layout from '../../components/layout/Home-Layout';
import Link from 'next/link'
import moment from 'moment'
import { searchAnalyticss } from '../../api/Book/queries';
import ActivitySkeleton from '../../components/activity/ActivitySkeleton';
import Loader from '../../components/Loader';

let defautEndDate = moment().format('YYYY-MM-DD');
let defautStartDate= moment(defautEndDate).add(-6, 'day').format('YYYY-MM-DD')

const index = () => {

    const [loading, setLoading] = useState(true);
    const [userCheckLoading, setUserCheckLoading] = useState(true);
    const [ activityDetails, setActivityDetails] = useState()
    const { setUserDetails, changeLoginFormStatus } = useContext(AuthContext)
    const [ totalRecord, setTotalRecords] = useState({
      readCount : 0,
      totalReadTime : 0,
      videoWatched : 0
   })
    const router = useRouter()

    const [ startDate, setStartDate] = useState(defautStartDate)
    const [ endDate, setEndDate] = useState(defautEndDate)
    const [dateRange, setDateRange] = useState("")
    const [previousButton , setPreviousButton] = useState("disabled")
    const [nextButton , setNextButton] = useState("disabled")

   
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
                     configureDates(startDate, endDate)
                     fetchAnalyticsRecord(startDate, endDate)  
                  }
                  else {
                      await router.push('/subscription')
                  }
                    
                }
                
            } catch (error) {
                await router.push('/?redirect=activity')
                changeLoginFormStatus()
            }
        }
        checkUser()
    }, [])

    const configureDates = (start, end) => {
      
        let startMonth = moment(start).format('MMM')
        let endMonth = moment(end).format('MMM')
        let startYear = moment(start).format('YYYY')
        let endYear = moment(end).format('YYYY')
        var date = ""
        if(startMonth === endMonth ){
            date = moment(start).format('MMMM') + ' ' + moment(start).format('D') + '-' + moment(end).format('D')+ ',';
        }
        else {
            date = startMonth + '/' + endMonth +' ' + moment(start).format('D') + '-' + moment(end).format('D') + ',';
        }
        if(startYear === endYear) {
            date = date + ' ' + startYear;
        }
        else{
            date = date + ' ' + moment(start).format('YY') + '/' + moment(end).format('YY');
        }
        setDateRange(date)
        if(start <= moment(Auth.user.attributes["custom:created_at"]).format('YYYY-MM-DD'))
        {
            setPreviousButton("disabled")
        }
        else{
            setPreviousButton("")
        }
        if(end >= moment().format('YYYY-MM-DD'))
        {
            setNextButton("disabled")
        }
        else{
            setNextButton("")
        }
    }

    let fetchUserSubscription = async()=> {
      let  subscription  = await API.get('subscription', '/subscription/'+ Auth.user.attributes.email);
      if(subscription.data === null || (!subscription.data.isActive  && subscription.data.nextBillingDate < new Date().toISOString())){
         return false;
      }
      return true;
   }

    
    let fetchAnalyticsRecord = async (startDate, endDate)  => {
        setLoading(true)
        var newStartDate = new Date(startDate)
        newStartDate.setHours(0,0,0,0)
        var newEndDate = new Date(endDate)
        newEndDate.setHours(23,59,59,59)

        let  result  = await API.graphql(graphqlOperation(searchAnalyticss, {
            filter: {email: { eq: Auth.user.attributes.email} ,  createdAt: {lte: newEndDate , gt: newStartDate}},
            sort: {direction: 'desc', field: 'updatedAt'}
        }))

        var data = result.data.searchAnalyticss.items
        let otherAnalytics = {
            readCount : 0,
            totalReadTime : 0,
            videoWatched : 0
        };
        data.forEach(element => {
            if(element.videoId === 'null'){
               if(element.activity !== null){
                  otherAnalytics.readCount = otherAnalytics.readCount + 1;
                  otherAnalytics.totalReadTime = otherAnalytics.totalReadTime + element.totalTime;
               }
              
            }
            else {
               otherAnalytics.videoWatched = otherAnalytics.videoWatched + 1
            }
        });

        setTotalRecords(otherAnalytics)

        const groups = data.reduce((groups, data) => {
             const date = data.createdAt.split('T')[0];
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(data);
            return groups;
        }, {});

        const activitybyDate = Object.keys(groups).map((date) => {
            return {
                date,
                activity: groups[date]
            };
        });
        setActivityDetails(activitybyDate)
        setLoading(false)
    }

    let changeToPreviousDateRange =  () => {
         let end = moment(endDate).add(-7, 'day').format('YYYY-MM-DD')
         setEndDate(end);
         let start = moment(end).add(-6, 'day').format('YYYY-MM-DD');
         setStartDate(start);
         configureDates(start, end);
         fetchAnalyticsRecord(start, end);
    }

    function timeConvert(n) {
      var num = n;
      if(num < 60 ){
         return num + " seconds";
      }
      var minutes = Math.floor(num / 60);
      if(minutes < 60) {
         return minutes + " mins";
      }
      var hours = Math.floor(minutes / 60)
      return hours + " hour";
    }

    function timeConvertTotalMessage(n) {
      var num = n;
      if(num < 60 ){
         return "Seconds Read";
      }
      var minutes = Math.floor(num / 60);
      if(minutes < 60) {
         return "Mins Read";
      }
      return "Hours Read";
    }

    function timeConvertTotal(n) {
      var num = n;
      if(num < 60 ){
         return num 
      }
      var minutes = Math.floor(num / 60);
      if(minutes < 60) {
         return minutes
      }
      var hours = Math.floor(minutes / 60)
      return hours
    }

    let changeToNextDateRange =  () => {
        let end = moment(endDate).add(7, 'day').format('YYYY-MM-DD')
        setEndDate(end);
        let start = moment(end).add(-6, 'day').format('YYYY-MM-DD');
        setStartDate(start);
        configureDates(start, end);
        fetchAnalyticsRecord(start, end);
   }

    return (
        userCheckLoading ? <Loader /> :
        <Layout>
         <div className="bg-green-light pb-30 flex min-h-screen">
            <div className="container mx-auto px-6 md:px-24">
               <div className="sm:flex my-10">
                  <div className="sm:w-full sm:px-8">
                     <div className="py-10 justify-items-center">
                        <h3 className="text-purple-light font-sans font-semibold mb-6 text-center md:px-4">Activity</h3>
                        <div className="flex justify-center mb-6">
                           <div className="px-4">
                              <h4 className="text-purple-light font-sans font-semibold mb-2 text-center">{totalRecord.readCount}</h4>
                              <p className="text-body2 text-gray-light font-serif">Books Read</p>
                           </div>
                           <div className="px-4">
                              <h4 className="text-purple-light font-sans font-semibold mb-2 text-center">{timeConvertTotal(totalRecord.totalReadTime)}</h4>
                              <p className="text-body2 text-gray-light font-serif">{timeConvertTotalMessage(totalRecord.totalReadTime)}</p>
                           </div>
                           <div className="px-4">
                              <h4 className="text-purple-light font-sans font-semibold mb-2 text-center">{totalRecord.videoWatched}</h4>
                              <p className="text-body2 text-gray-light font-serif">Videos Watched</p>
                           </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 justify-items-center">
                           <div className="col-start-1 col-end-7 md:col-start-2 md:col-span-4 flex justify-center content-center">
                              <button className="focus:outline-none focus:border-none" disabled={previousButton} onClick={changeToPreviousDateRange}>
                                 <svg  xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left cursor-pointer" width={40} height={40} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#BDBDBD" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <polyline points="15 6 9 12 15 18" />
                                 </svg>
                              </button>
                              <h4 className="text-5xl md:text-6xl text-gray-light font-sans font-semibold text-center py-2 md:py-0 px-1 md:px-4">{dateRange}</h4>
                              <button  className="focus:outline-none focus:border-none" disabled={nextButton} onClick={changeToNextDateRange} >
                                 <svg   xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-right cursor-pointer" width={40} height={40} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#BDBDBD" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <polyline points="9 6 15 12 9 18" />
                                 </svg>
                              </button>
                           </div>
                        </div>
                        <div className="overflow-x-auto">
                           {
                           loading ? 
                           <ActivitySkeleton />
                           :
                           activityDetails.map(element => {
                           return <table className="w-full mb-4" key={element.date}>
                              <thead>
                                 <tr>
                                    <th className="py-2 whitespace-no-wrap text-left text-purple-light text-5xl" colSpan="5">{moment(element.date).format('MMM D YYYY')}</th>
                                 </tr>
                              </thead>
                              {
                              element.activity.map(item => {
                              return <tbody key={item.id}>
                                 {
                                 item.videoId === "null" ? 
                                 <tr className="bg-white border-b-8 border-green-light">
                                    <td className="pl-2.5 pr-6 py-4 whitespace-no-wrap" colSpan="4">
                                       <div className="flex justify-start">
                                          <div className="w-3/4 small:w-5/12 md:w-1/4">
                                             <Link href={`/book/${item.books.id}`}>
                                             <a><img className="" src={item.books.image} width="118" height="176" alt="Book" /></a></Link>
                                          </div>
                                          <div className="w-1/4 small:w-7/12 md:w-3/4 flex justify-start place-self-center">
                                             <div className="place-self-center ml-2">
                                                <h5 className="text-5xl font-sans font-semibold leading-5 text-purple-light mb-2">
                                                   <Link href={`/book/${item.books.id}`}>
                                                   {item.books.title}</Link>
                                                </h5>
                                                <p className="text-body2 text-gray-light font-serif leading-5">
                                                   <Link href={`/author/${item.books.authorId}`}>
                                                   {item.books.authorName}</Link>
                                                </p>
                                             </div>
                                          </div>
                                       </div>
                                    </td>
                                    <td className="pl-24 pr-2.5 py-4 whitespace-no-wrap">
                                       {!item.activity || item.activity == null ?
                                       <div className="float-right pr-0 md:pr-12">
                                          <p className="text-body2 font-semibold text-gray-light font-serif leading-5 mb-2"></p>
                                          <p className="text-body2 text-gray-lightest font-serif leading-5">Browsed</p>
                                       </div>
                                       :
                                       <div className="float-right pr-0 md:pr-12">
                                          <p className="text-body2 font-semibold text-gray-light font-serif leading-5 mb-2">{timeConvert(item.totalTime)}</p>
                                          <p className="text-body2 text-gray-lightest font-serif leading-5">Time Read</p>
                                       </div>
                                       }
                                    </td>
                                 </tr>
                                 :
                                 <tr className="bg-white border-b-8 border-green-light">
                                    <td className="pl-2.5 pr-6 py-4 whitespace-no-wrap" colSpan="4">
                                       <div className="flex justify-start">
                                          <div className="w-3/4 small:w-5/12 md:w-1/4">
                                             <Link href={`/spotlight`}>
                                             <img className="" src={item.videos.image} width="118" height="85" alt="Book" /></Link>
                                          </div>
                                          <div className="w-1/4 small:w-7/12 md:w-3/4 flex justify-start place-self-center">
                                             <div className="place-self-center ml-2">
                                                <h5 className="text-5xl font-sans font-semibold leading-5 text-purple-light mb-2">{item.videos.title}</h5>
                                                <p className="text-body2 text-gray-light font-serif leading-5"></p>
                                             </div>
                                          </div>
                                       </div>
                                    </td>
                                    <td className="pl-24 pr-2.5 py-4 whitespace-no-wrap">
                                       <div className="float-right pr-0 md:pr-16">
                                          <p className="text-body2 font-semibold text-gray-light font-serif leading-5 mb-2">{timeConvert(item.totalTime)}</p>
                                          <p className="text-body2 text-gray-lightest font-serif leading-5">Watch Time</p>
                                       </div>
                                    </td>
                                 </tr>
                                 }
                              </tbody>
                              })
                              }   
                           </table>
                           })  
                           }
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
        </Layout>
    )
}

export default index
