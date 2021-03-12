import React from "react";

const SpotLightVideoList = ({ spotlightList, showVideoPopup }) => {
  function timeConvert(n) {
    var num = n;
    var hours = num / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    rminutes = rminutes < 10 ? '0' + rminutes : rminutes;
    rhours = rhours < 10 ? '0' + rhours : rhours;
    return rhours + ":" + rminutes;
  }

  return spotlightList.map(function (spotlight, index) {
    return (
      <div key={spotlight.id}>
        <div className="flex-col relative mb-10 mx-3 pb-5 grid grid-cols-1 gap-2 duration-400 ease-in-out transform hover:-translate-y-1 hover:scale-110 transition-shadow hover:shadow-xl">
           <div className="cursor-pointer relative w-72 md:w-56 lg:w-72 h-56 mb-2 bg-green-light shadow-inner">
                <div className="inner-shadow cursor-pointer">
                  <div className="h-52 bg-contain bg-no-repeat bg-center flex justify-center" style={{backgroundImage: "url(" + spotlight.image + ")"}}>
                       <div className="flex flex-wrap content-center">
                          <img className="" src="/img/icons/play.svg" width="75" height="75" alt="img" onClick={ () => showVideoPopup(spotlight.video,  spotlight.id)}/>
                       </div>
                  </div>
                </div>
               <div className="flex absolute justify-between p-2 shadow-inner top-0 w-full h-8">
                  <div className="flex">
                     <div className="w-16 h-7 flex justify-center mr-2 bg-gray-900 bg-opacity-10 block px-2 py-1 rounded-full ml-1">
                        <span className="font-semibold text-subtitle2 text-white">{timeConvert(spotlight.duration)}</span>
                     </div>
                  </div>
               </div>
               <div className="flex flex-col truncate">
                  <h5 className="flex font-sans text-4xl font-semibold text-gray-700">{spotlight.title}</h5>
                  <p className="flex font-serif text-small1 text-gray-500">{spotlight.author}</p>
               </div>
            </div>
        </div>
    </div>
    );
  });
};

export default SpotLightVideoList;
