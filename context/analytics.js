import React, { useState, createContext } from 'react';
import { createAnalytics } from '../api/Book/mutation';
import { graphqlOperation, API, Auth } from 'aws-amplify';
import moment from 'moment';
import { updateAnalytics, deleteAnalytics} from '../api/Book/mutation';
import { listAnalyticss, getAnalytics} from '../api/Book/queries';
const { v4: uuidv4 } = require("uuid");

const AnalyticsContext = createContext({
});

const AnalyticsProvider = (props) => {

    const [ trackData, setTrackData] = useState({})
    const [analyticsId , setAnalyticsId] = useState(null)

    const setTrackDataDetails = (data , handler = null) => {
        setTrackData(data)
        if(handler === true) {
            window.addEventListener('beforeunload', handleUnload);
        }
        else if(handler === false){
            window.removeEventListener('beforeunload', handleUnload);
        }
    }

    const setAnalytics = (id) => {
        setAnalyticsId(id)
    }

    const saveTrackDetails = async ( data ) => {
        if(analyticsId == null){
            let newData = JSON.parse(JSON.stringify(data));

            var newStartDate = new Date()
            newStartDate.setHours(0,0,0,0)
            var newEndDate = new Date()
            var activity = await API.graphql(graphqlOperation(listAnalyticss, {
                filter : { videoId : {eq : newData.videoId},
                           email: {eq: Auth.user.attributes.email},  
                           createdAt: {le: newEndDate}, and: {createdAt: {gt: newStartDate}}        
                }
            }))
            if(activity.data.listAnalyticss.items && activity.data.listAnalyticss.items[0] )
             {
                var  updateData = {
                    totalTime : activity.data.listAnalyticss.items[0].totalTime + newData.currenttotalTime ,
                    activity : [ 
                        ...activity.data.listAnalyticss.items[0].activity,
                        {
                        id : uuidv4(),
                        startTime : newData.startTime,
                        endTime : newData.endTime,
                        totalTime : newData.currenttotalTime,
                        createdAt : new Date()}
                    ]
                }  

                updateData.id = activity.data.listAnalyticss.items[0].id
                await API.graphql(graphqlOperation(updateAnalytics, {input: updateData}))
             }
             else {
                let trackDetails = {
                    email: Auth.user.attributes.email,
                    firstName: Auth.user.attributes["custom:first_name"],
                    lastName: Auth.user.attributes["custom:last_name"],
                    videoId: newData.videoId,
                    bookId: "null",
                    totalTime : newData.currenttotalTime,
                    openedDate: new Date(),
                    activity : {
                        id : uuidv4(),
                        startTime : newData.startTime,
                        endTime : newData.endTime,
                        totalTime : newData.currenttotalTime,
                        createdAt : new Date()
                    }
                }

    
                await API.graphql(graphqlOperation(createAnalytics, { input: trackDetails }))
                localStorage.setItem('analyticsId', 'null');
             }
        }
        else{
            let newData = JSON.parse(JSON.stringify(data));
            let  analyticsData  = await API.graphql(graphqlOperation(getAnalytics,{ id: analyticsId }))
            var activity;
            if(!analyticsData.data.getAnalytics.activity || analyticsData.data.getAnalytics.activity === null){
                activity = 
                   {
                   id : uuidv4(),
                   startTime : newData.startTime,
                   endTime : newData.endTime,
                   totalTime : newData.currenttotalTime,
                   createdAt : new Date() }
               
            }
            else {
                activity = [ 
                    ...analyticsData.data.getAnalytics.activity,
                   {
                   id : uuidv4(),
                   startTime : newData.startTime,
                   endTime : newData.endTime,
                   totalTime : newData.currenttotalTime,
                   createdAt : new Date() }
               ]
            }
           
            var  updateData = {
                totalTime : analyticsData.data.getAnalytics.totalTime + newData.currenttotalTime ,
                activity
            }
            updateData.id = analyticsId
            await API.graphql(graphqlOperation(updateAnalytics, {input: updateData}))            
        }
       
    }


    return (
        <AnalyticsContext.Provider value={{
            trackData,
            setTrackDataDetails,
            saveTrackDetails,
            setAnalytics
        }
        } {...props} />
    );
}

function handleUnload (e)  {
    e.preventDefault();
    setTimeout(function() { stayOnSamePage(); }, 7000);
    saveDetails();
    return e.returnValue = '';
}

let saveDetails = async () => {
    let analyticsId =  localStorage.getItem('analyticsId')
    if(analyticsId == 'null'){
        let videoId  = localStorage.getItem('videoId');
        let endTime = new Date()
        let end = moment(endTime)
        let start  = new Date(localStorage.getItem('startTime'));
        let startTime = moment(start)
    
        var currenttotalTime = end.diff(startTime, 'seconds');

            var newStartDate = new Date()
            newStartDate.setHours(0,0,0,0)
            var newEndDate = new Date()
            var activity = await API.graphql(graphqlOperation(listAnalyticss, {
                filter : { videoId : {eq : videoId},
                           email: {eq: Auth.user.attributes.email},  
                           createdAt: {le: newEndDate}, and: {createdAt: {gt: newStartDate}}        
                }
            }))
            if(activity.data.listAnalyticss.items && activity.data.listAnalyticss.items[0] )
             {
                 var newActivity = 
                 {
                    id : uuidv4(),
                        startTime : start,
                        endTime : endTime,
                        totalTime : currenttotalTime,
                        createdAt : new Date()
                 }
                var  updateData = {
                    totalTime : activity.data.listAnalyticss.items[0].totalTime + currenttotalTime ,
                    activity : [ 
                        ...activity.data.listAnalyticss.items[0].activity,
                        newActivity
                    ]
                }  

                updateData.id = activity.data.listAnalyticss.items[0].id
                var result = await API.graphql(graphqlOperation(updateAnalytics, {input: updateData}))
                localStorage.setItem('isCreated', 'no');
                localStorage.setItem('updateData', JSON.stringify(updateData));
                localStorage.setItem('updateId', result.data.updateAnalytics.id);
                localStorage.setItem('activity', JSON.stringify(newActivity));
             }
             else {
                 
                let trackDetails = {
                    email: Auth.user.attributes.email,
                    firstName: Auth.user.attributes["custom:first_name"],
                    lastName: Auth.user.attributes["custom:last_name"],
                    videoId: videoId,
                    bookId: "null",
                    totalTime : currenttotalTime,
                    openedDate: new Date(),
                    activity : {
                        id : uuidv4(),
                        startTime : start,
                        endTime : endTime,
                        totalTime : currenttotalTime,
                        createdAt : new Date()
                    }
                }

                var result = await API.graphql(graphqlOperation(createAnalytics, { input: trackDetails }))
                localStorage.setItem('isCreated', 'yes');
                localStorage.setItem('updateId', result.data.createAnalytics.id);

             }
    }
    else {
        let endTime = new Date()
        let end = moment(endTime)
        let start  = new Date(localStorage.getItem('startTime'));
        let startTime = moment(start)
    
        var currenttotalTime = end.diff(startTime, 'seconds');
        let  analyticsData  = await API.graphql(graphqlOperation(getAnalytics,{ id: analyticsId }))
        var newActivity;
        var activity = 
                {
                id : uuidv4(),
                startTime :start,
                endTime : endTime,
                totalTime : currenttotalTime,
                createdAt : new Date() 
        }
            
        if(!analyticsData.data.getAnalytics.activity || analyticsData.data.getAnalytics.activity === null){
            newActivity = [activity]
        }
        else {
            
            newActivity = [ 
                ...analyticsData.data.getAnalytics.activity,
                activity
            ]
        }
        
        var  updateData = {
            totalTime : currenttotalTime + analyticsData.data.getAnalytics.totalTime ,
            activity: newActivity
        }
        updateData.id = analyticsId
        localStorage.setItem('updateData', JSON.stringify(updateData));
        var result = await API.graphql(graphqlOperation(updateAnalytics, {input: updateData}))
        localStorage.setItem('updateId', analyticsId);
        localStorage.setItem('activity', JSON.stringify(activity));
    }
  
    
  }

  let stayOnSamePage = async() => {
    
    let analyticsId =  localStorage.getItem('analyticsId')
    if(analyticsId == 'null')
    {
        let isCreated =  localStorage.getItem('isCreated')
        let updateId =  localStorage.getItem('updateId')
        if(isCreated === 'yes') {
            await API.graphql(graphqlOperation( deleteAnalytics , { input: { id: updateId }}))
        }
        else {
            let newData = JSON.parse(localStorage.getItem('updateData'))
            let activity =  JSON.parse(localStorage.getItem('activity'))
            let newActivity = newData.activity.filter(function (item) {
                return item.id!== activity.id;
            });

            let totalTime =  parseInt(newData.totalTime);
            let currentTime = parseInt(activity.totalTime)
            var  updateData = {
                id : updateId,
                totalTime : totalTime - currentTime ,
                activity  : newActivity
            }
            await API.graphql(graphqlOperation( updateAnalytics, {input: updateData}))
        }
        
    }
    else{
        let newData = JSON.parse(localStorage.getItem('updateData'))
        let activity =  JSON.parse(localStorage.getItem('activity'))

        let updateId =  localStorage.getItem('updateId')
        let newActivity = newData.activity.filter(function (item) {
            return item.id!== activity.id;
        });

        let totalTime =  parseInt(newData.totalTime);
        let currentTime = parseInt(activity.totalTime)
        var  updateData = {
            id : updateId,
            totalTime : totalTime - currentTime ,
            activity  : newActivity.length > 0  ? newActivity : null
        }
        await API.graphql(graphqlOperation( updateAnalytics, {input: updateData}))
    }    
  }

export { AnalyticsProvider, AnalyticsContext, }