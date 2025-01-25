"use client";
import React, { useState, useEffect, useRef } from "react";

export default function MouseTrackingVideo({ src, className = "" }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const videoRef = useRef(null);

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
    <div
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
    </div>
  );
}
