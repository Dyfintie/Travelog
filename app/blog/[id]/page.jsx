"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

const ViewBlogPage = () => {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const [topic, setTopic] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/blogs/${id}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch topic");
        }
        const result = await response.json();
        setTopic(result);
      } catch (error) {
        console.error("Error fetching topic:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full"
        />
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-2xl text-gray-600">Topic not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="flex items-center mb-8">
            <button
              onClick={() => router.push("/blog")}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              <ArrowLeft className="mr-1" /> Back to Blog
            </button>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {topic.title}
          </h1>
          <h2 className="text-3xl  text-gray-900 mb-6 ">-{topic.author}</h2>

          {topic.file && (
            <div className="mb-8">
              <Image
                width={1500}
                height={800}
                src={`http://localhost:8080/${topic.file}`}
                alt={topic.title}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          )}

          <div className="text-lg text-gray-800 leading-relaxed">
            <p>{topic.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBlogPage;
