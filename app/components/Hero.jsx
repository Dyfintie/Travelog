"use client";
import React from "react";
import { ease, easeOut, motion } from "framer-motion";
import MouseTrackingvideo from "./Mouse";
const Hero = () => {
  return (
    <div className="bg-custom  h-screen w-full flex flex-col md:flex-row items-center justify-center p-5 gap-8">
      <motion.div
        className="w-full md:w-1/2 space-y-6 text-center md:text-left"
      >
        <motion.h1
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 5, ease: [0, 0.71, 0.2, 1.01] }}
          className="font-bold font-work-sans text-4xl sm:text-5xl lg:text-6xl text-black px-2 "
        >
          Trave
          <motion.span
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 5.5, ease: [0, 0.71, 0.2, 1.01] }}
            className="font-bold font-work-sans text-4xl sm:text-5xl lg:text-6xl text-black px-2 "
          >
            Loog
          </motion.span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 6, ease: [0, 0.71, 0.2, 1.01] }}
          className="font-semibold font-work-sans text-2xl sm:text-3xl lg:text-4xl text-black px-2"
        >
          Explore the World,
          <span className="font-semibold font-work-sans text-2xl sm:text-3xl lg:text-4xl text-black px-2">
            One Destination{" "}
          </span>
          at a Time
        </motion.p>
        <motion.p
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 6.5, ease: [0, 0.71, 0.2, 1.01] }}
          className="font-work-sans text-lg sm:text-xl text-black max-w-xl mx-auto md:mx-0 p-2"
        >
          Join us as we traverse breathtaking landscapes, uncover hidden gems,
          and share stories that inspire your next adventure.
        </motion.p>
      </motion.div>
        <MouseTrackingvideo
          src="/assests/trav.mp4"
          className="w-full md:w-1/2 mt-8 md:mt-0 sm:mr-5 relative rounded-lg overflow-hidden shadow-2xl "
        ></MouseTrackingvideo>
    </div>
  );
};

export default Hero;
