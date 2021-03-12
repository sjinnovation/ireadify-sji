import React, { useContext } from 'react';
import { AnalyticsContext } from '../../context/analytics';
import moment from 'moment';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const Player = ({ bookMedia, changeAudioPlayerStatus, bookDetails }) => {

	const { trackData, setTrackDataDetails, saveTrackDetails } = useContext(AnalyticsContext)
	let cancelAudio = () => {
		changeAudioPlayerStatus()
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
		setTrackDataDetails(trackDetails, false)
	}

	const playIcon = <div className=""><img className="h-8 w-8" src="/img/player/play.svg" width="50" height="50" alt="play" /></div>
	const pauseIcon = <div className=""><img className="h-8 w-8" src="/img/player/pause.svg" width="50" height="50" alt="pause" /></div>
	const rewindIcon = <div className=""><img className="h-6 w-6" src="/img/player/rewind.svg" width="50" height="50" alt="rewind" /></div>
	const forwardIcon = <div className=""><img className="h-6 w-6" src="/img/player/fwd.svg" width="50" height="50" alt="forward" /></div>
	const loopIcon = <div className=""><img className="h-5 w-5" src="/img/player/repeat.svg" width="50" height="50" alt="loop" /></div>
	const loopOffIcon = <div className=""><img className="h-5 w-5" src="/img/player/minus.svg" width="50" height="50" alt="loop-off" /></div>
	const volumeIcon = <div className=""><img className="h-5 w-5" src="/img/player/volume.svg" width="50" height="50" alt="volume" /></div>
	const muteIcon = <div className=""><img className="h-5 w-5" src="/img/player/muted.svg" width="50" height="50" alt="mute" /></div>
	const playerHeader =
		<div className="flex m-2 p-1 ml-3 mb-8 justify-around content-center ">
			<div className="h-20 w-20 justify-center mt-2">
				<img className="rounded-xl" src={bookDetails.image} width={80} height={60} alt="image" />
			</div>
			<div className="justify-center content-center ml-5 mt-2 w-full pt-2">
				<p className="inline font-sans align-middle text-xl font-bold text-white w-full mt-2">{bookDetails.title}</p>
				<p className=" font-sans align-middle text-sm font-semibold text-white">By: {bookDetails.authorName}</p>
				<p className="font-sans text-xs font-semibold text-white text-center mt-1">Age: {bookDetails.age.name}</p>
			</div>

		</div>

	const playerFooter = <div >
		<p className="font-sans text-xs font-semibold text-white">{bookDetails.narrator ? "Narrated by " + bookDetails.narrator : null}</p>
	</div>


	return (
		<div className="fixed z-10 inset-0 overflow-y-auto">
			<div className="flex flex-col items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
				<div className="fixed inset-0 transition-opacity" aria-hidden="true">
					<div className="absolute inset-0 bg-gray-light opacity-75"></div>
				</div>
				{/* This element is to trick the browser into centering the modal contents. */}
				<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

				<div className="inline-block w-full content-center align-bottom items-center justify-center bg-about-banner bg-cover bg-no-repeat bg-center rounded-md text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
					<div onClick={cancelAudio} className="modal-close self-center text-center absolute p-1 w-0 h-10 top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-bold z-50 order-none flex-grow-0">
						<svg className="fill-current text-gray" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
							<path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
						</svg>
					</div>

					<div className="flex flex-col items-center mt-1">
						<div className="flex flex-col items-center w-full p-0 static md:w-4/5 h-4/5 left-36 inset-y-20 flex-none order-1 self-center flex-grow-0 my-5 mx-2.5">
							<AudioPlayer
								src={bookMedia}
								layout="stacked-reverse"
								autoPlay={true}
								header={playerHeader}
								footer={playerFooter}
								customIcons={{
									play: playIcon,
									pause: pauseIcon,
									rewind: rewindIcon,
									forward: forwardIcon,
									// previous: previousIcon,
									// next: nextIcon,
									loop: loopIcon,
									loopOff: loopOffIcon,
									volume: volumeIcon,
									volumeMute: muteIcon
								}}
							/>
						</div>
					</div>

				</div>
			</div>
		</div>
	)
}

export default Player
