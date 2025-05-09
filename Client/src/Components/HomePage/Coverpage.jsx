import React from 'react'

import coverVideo from '../../assets/cover_vid_1.mp4';
import coverVideo2 from '../../assets/cover_vid0.mp4';  

const CoverPage = () => {
  return (
    <section
      id="cover-page"
      className="w-full h-screen relative bg-gradient-to-t from-white to-transparent to-20%"
    >
      <div className="w-full h-full absolute -z-10 ">
        <video
          autoPlay
          muted
          loop
          className="w-full h-full object-cover object-center"
        >
          <source src={coverVideo} type="video/mp4" />
          <source src={coverVideo2} type="video/mp4" />
        </video>
      </div>
      <div className="absolute w-full h-full z-10 flex justify-center items-center flex-col pb-10 text-3xl sm:text-7xl font-bold">
        <h1
          data-visible="false"
          className="fade-in duration-[1500ms] ease-in-out font-archivo z-1 uppercase text-slate-900 [letter-spacing:6px] w-fit"
        >
          <span className="text-brand">Trek</span>
          <br />
          connect
          {/* <br />
          Initiative */}
          <hr className="mt-1 w-full border-0 bg-brand h-1" />
        </h1>
      </div>
    </section>

  );
};


export default CoverPage
