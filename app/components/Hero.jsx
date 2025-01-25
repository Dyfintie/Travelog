"use client";
import React from "react";
// import {vid} from "../../public/assests/trav.mp4"
import {motion} from "framer-motion";
import MouseTrackingVideo from "./Mouse";
const Hero = () => {
  return (
    <div className="bg-gradient-to-r h-screen from-green-100 to-green-200 w-full flex flex-col md:flex-row items-center justify-center p-5 gap-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full md:w-1/2 space-y-6 text-center md:text-left"
      >
        <h1 className="font-bold font-serif text-4xl sm:text-5xl lg:text-6xl text-green-800 px-2 ">
          Trave
          <span className="font-bold font-serif text-4xl sm:text-5xl lg:text-6xl text-orange-800 px-2 ">
            Log
          </span>
        </h1>
        <p className="font-semibold font-serif text-2xl sm:text-3xl lg:text-4xl text-green-700 px-2">
          Explore the World,
          <span className="font-semibold font-serif text-2xl sm:text-3xl lg:text-4xl text-orange-700 px-2">
            One Destination{" "}
          </span>
          at a Time
        </p>
        <p className="font-serif text-lg sm:text-xl text-green-600 max-w-xl mx-auto md:mx-0 p-2">
          Join us as we traverse breathtaking landscapes, uncover hidden gems,
          and share stories that inspire your next adventure.
        </p>
      </motion.div>

      {/* <div className="w-full md:w-1/2 mt-8 md:mt-0"> */}
      {/* <div className="relative rounded-lg overflow-hidden shadow-2xl"> */}
      <MouseTrackingVideo
        src="/assests/trav.mp4"
        className="w-full md:w-1/2 mt-8 md:mt-0 sm:mr-5 relative rounded-lg overflow-hidden shadow-2xl "
      ></MouseTrackingVideo>
      {/* </div> */}
      {/* </div> */}
    </div>
  );
};

export default Hero;
