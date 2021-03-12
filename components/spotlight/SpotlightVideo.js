import React, { useContext } from 'react'
import Vimeo from '@u-wave/react-vimeo';
import moment from 'moment';
import { AnalyticsContext } from '../../context/analytics';

const SpotlightVideo = ( {videoId , hideVideoPopup } ) => {

    const { trackData, setTrackDataDetails, saveTrackDetails  } = useContext(AnalyticsContext)

    let cancelVideo = () => {
		hideVideoPopup()
		let endTime = new Date()
		let end = moment(endTime)
		let startTime = moment(trackData.startTime)
		var currenttotalTime = end.diff(startTime, 'seconds')
		let trackDetails = {
		   ...trackData,
		   endTime,
		    currenttotalTime
	   }

	   saveTrackDetails(trackDetails);
	   setTrackDataDetails(trackDetails , false)
    }
    
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto" onClick={() => cancelVideo()}>
           <div className="flex items-center justify-center min-h-screen text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                 <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-middle text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                 <div className="flex justify-center h-full">
                    <Vimeo className="px-6 md:px-0 spotlight-frame"
                       video={videoId}
                       autoplay
                    />
                 </div>
              </div>
           </div>
        </div>
    )
}

export default SpotlightVideo
