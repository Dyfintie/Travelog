"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Editor from 'react-simple-wysiwyg';
import Loading from "../../Loading.jsx";

export default function EditTopic() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const [topic, setTopic] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = w;

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        // const response = await fetch(`${apiUrl}/blogs/${id}`, {
        const response = await fetch(`/api/blog/${id}`, {
          method: "GET",
          eaders: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch topic");
        }
        const result = await response.json();
        if (result.blog) {
          setTopic(result.blog);
          setNewTitle(result.blog.title || "");
          setNewContent(result.blog.content || "");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, apiUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsLoading(true);

    try {
      // const res = await fetch(`${apiUrl}/blogs/${id}`, {
      // const res = await fetch(`${apiUrl}/blogs/${id}`, {
      const response = await fetch(`/api/blog/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTitle, content: newContent }),
      });
      router.push("/blog");
      // router.refresh();
      if (!res.ok) {
        throw new Error("Failed to update topic");
      }
      
    } catch (error) {
      
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!topic) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-2xl text-gray-600">Topic not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900">Edit Topic</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Title
              </label>
              <input
                id="title"
                onChange={(e) => setNewTitle(e.target.value)}
                value={newTitle}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 transition duration-200 text-xl"
                type="text"
                placeholder="Enter topic title"
                required
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Content
              </label>
              {
                <Editor value={newContent} onChange={(e) => setNewContent(e.target.value)} />
              }
              {/* <textarea
                id="content"
                onChange={(e) => setNewContent(e.target.value)}
                value={newContent}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 transition duration-200 h-96 resize-none text-lg"
                placeholder="Enter topic content"
                required
              /> */}
            </div>

            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-900 text-white font-bold py-3 px-6 rounded-md hover:bg-gray-800 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Topic"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
