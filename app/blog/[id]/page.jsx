"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import parse from 'html-react-parser';
import Loading from "../../Loading";
import Scrollprog from "../../components/Scrollprog"
const ViewBlogPage = () => {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const [topic, setTopic] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [decodedImageUrl, setDecodedImageUrl] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const decodeBase64Image = (base64String) => {
    try {
      if (!base64String) {
        console.error("Base64 string is empty or undefined.");
        return null;
      }

      // Decode Base64
      const binaryString = atob(base64String);
      const binaryLength = binaryString.length;

      // Convert binary string to Uint8Array
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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // const response = await fetch(`${apiUrl}/blogs/${id}`, {
        const response = await fetch(`/api/blog/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch topic");
        }
        const result = await response.json();
        // console.log(result.blog);
        setTopic(result.blog);
        // Decode the image if file exists
        if (result.blog) {
          const decodedUrl = decodeBase64Image(result.blog.file);
          setDecodedImageUrl(decodedUrl);
        }
        // setTopic(result);
      } catch (error) {
        console.error("Error fetching topic:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, apiUrl]);

  if (isLoading) {
    return <Loading />;
  }

  if (!topic) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-2xl text-black">Topic not found</p>
      </div>
    );
  }

  return (
    <>
      <Scrollprog />
      <div className="min-h-screen bg-custom py-12">
        <div className="max-w-full mx-auto w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex items-center mb-8">
              <button
                onClick={() => router.push("/blog")}
                className="flex items-center text-black ml-2 hover:text-black transition-colors duration-200"
              >
                <ArrowLeft className="mr-1 " /> Back to Blog
              </button>
            </div>

            <h1 className="text-4xl ml-10 font-bold text-black mb-6">
              {topic.title}
            </h1>
            <h2 className="text-3xl ml-10  text-black mb-6 ">
              -{topic.author}
            </h2>

            {decodedImageUrl && (
              <div className="mb-8 flex justify-center">
                <Image
                  width={1500}
                  height={800}
                  src={decodedImageUrl}
                  alt={topic.title}
                  className="md:w-full2 h-auto rounded-lg shadow-md"
                />
              </div>
            )}
            <div className=" text-lg text-black leading-relaxed">
              <motion.p className="px-5">{parse(topic.content)}</motion.p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewBlogPage;
