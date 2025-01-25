"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Cookies from "js-cookie";

export default function AddTopicWithImage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    } else {
      setPreview("");
    }
  };
 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !file) {
      alert("Title, content, and an image are required.");
      return;
    }

    setIsLoading(true);
    const email = Cookies.get("email");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("email", email);
    formData.append("content", content);
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8080/create-blog", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        router.push("/blog");
      } else {
        throw new Error("Failed to create a topic");
      }
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Tell your Travelog!
          </h1>
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
                className="block text-md font-medium text-gray-700 mb-1"
              >
                Title
              </label>
              <input
                id="title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="w-full px-4 py-2 border border-gray-300 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2  focus:ring-gray-900 transition duration-200 text-xl"
                type="text"
                placeholder="Enter Travelog title"
                required
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-md font-medium text-gray-700 mb-1"
              >
                Content
              </label>
              <textarea
                id="content"
                onChange={(e) => setContent(e.target.value)}
                value={content}
                className="w-full hover:bg-gray-200 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 transition duration-200 h-96 resize-none text-lg"
                placeholder="Enter Travelog content"
                required
              />
            </div>

            <div>
              <label
                htmlFor="image"
                className="block text-md font-medium text-gray-700 mb-1"
              >
                Upload Image
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border hover:bg-gray-200 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 transition duration-200"
                required
              />
              {preview && (
                <div className="mt-4">
                  <img
                    src={preview || "/placeholder.svg"}
                    alt="Preview"
                    className="max-w-full h-auto max-h-96 object-contain rounded-md"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-900 text-white font-bold py-3 px-6 rounded-md hover:bg-gray-800 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Adding..." : "Publish Travelog"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
