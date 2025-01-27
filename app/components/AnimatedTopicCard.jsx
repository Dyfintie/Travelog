"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import parse from 'html-react-parser';
import Cookie from "js-cookie";

export default function AnimatedTopicCard({ topic,onHome }) {
  const [isAuth, setAuth] = useState(false);
  const [decodedImageUrl, setDecodedImageUrl] = useState(null);

  // Function to decode Base64 image
  const decodeBase64Image = (base64String) => {
    try {
      // Check if the string exists
      if (!base64String) {
        console.error("Base64 string is empty or undefined.");
        return null;
      }

      // // Remove the data URL prefix if present
      const base64Content = base64String.includes(",")
        ? base64String.split(",")[1]
        : base64String;

      // Decode Base64
      const binaryString = atob(base64Content);
      const binaryLength = binaryString.length;

      // Convert to Uint8Array
      const bytes = new Uint8Array(binaryLength);
      for (let i = 0; i < binaryLength; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Create a Blob and Object URL
      const blob = new Blob([bytes], { type: "image/png" });
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("Error decoding Base64 image:", error.message);
      return null;
    }
  };


  // Decode image when component mounts or when topic.file changes
  useEffect(() => {
    if (topic.file) {
      const decodedUrl = decodeBase64Image(topic.file);
      setDecodedImageUrl(decodedUrl);
    }
  }, [topic.file]);

  // Check authentication
  useEffect(() => {
    const email = Cookie.get("email");
    if (email === topic.email) {
      setAuth(true);
    }
  }, [topic.email]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-lg shadow-md overflow-hidden font-work-sans"
    >
      <div className="h-screen2">
        <Link href={`/blog/${topic._id}`} className="flex-col ">
          <div className="relative h-48 w-full">
            {decodedImageUrl && (
              <Image
                src={decodedImageUrl}
                alt={topic.title}
                layout="fill"
                objectFit="cover"
              />
            )}
          </div>
          <div className="h-full flex-col p-6 ">
            <h2 className="text-xl font-semibold text-black mb-2">
              {topic.title.substring(0,30)}...
            </h2>
            <h3 className="text-lg text-black mb-2">{topic.author}</h3>
            <p className="text-black mb-4">
              {parse(topic.content.substring(0, 100))}...
            </p>
            <div className="flex items-center text-sm text-black">
              <span>
                <AccessTimeIcon />
                {topic.date_created}
              </span>
            </div>
            {isAuth && !onHome ? (
              <div className="flex self-end mb-auto px-7 justify-end gap-4 ">
                <RemoveBtn id={topic._id} className="items-end" />
                <Link href={`/editTopic/${topic._id}`}>
                  <HiPencilAlt size={32} className="ml-2 mr-0" />
                </Link>
              </div>
            ) : null}
          </div>
        </Link>
      </div>
    </motion.div>
  );
}
