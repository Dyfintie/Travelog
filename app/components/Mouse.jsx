"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
export default function MouseTrackingvideo({ src, className = "" }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const videoRef = useRef(null);
  const [islarge, setLarge] = useState(false);
  useEffect(()=>{
    const handleResize = () => {
      setLarge(window.innerWidth > 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  })

  useEffect(() => {
    
    const handleMouseMove = (e) => {
      if (!videoRef.current) return;

      const rect = videoRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const angleX = ((mouseY - centerY) / (rect.height / 2)) * 10;
      const angleY = (-(mouseX - centerX) / (rect.width / 2)) * 10;

      setRotation({ x: angleX, y: angleY });
    };

    const handleMouseLeave = () => {
      setRotation({ x: 0, y: 0 });
    };

    const element = videoRef.current;
    if (element) {
      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1, x: islarge? -400:0 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 4, ease: [0, 0.71, 0.2, 1.01] }}
      ref={videoRef}
      className={`relative ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      <video
        preload="auto"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-auto "
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </motion.div>
  );
}
