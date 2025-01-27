"use client"
import React, { useState,useEffect } from "react";
import Loading from "../Loading";

const Maps = () => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() =>{
        const fetchData =  () => {
            setIsLoading(false);
        };
        fetchData();
    });

    if(isLoading){
        return <Loading/>;
    }
  return (
    <div className="font-work-sans flex-col justify-center rounded-lg shadow-md overflow-hidden bg-custom pb-5">
        <h1 className=" flex justify-center  py-3 text-black-800 font-bold text-3xl" > Most Visted Place of The Year </h1>
      <div className="flex rounded-lg justify-center px-4">
        <iframe
          className="w-11/12  h-screen rounded-lg  p-3"
          title="Little Cafe Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158858.4734008494!2d-0.2416819696335475!3d51.528558241205936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b3331fa5b21%3A0xd3cfcd7b67956a48!2sLondon%2C%20UK!5e0!3m2!1sen!2sin!4v1734681127720!5m2!1sen!2sin"
          width="90%"
          height="80vh"
          //   style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Maps;
