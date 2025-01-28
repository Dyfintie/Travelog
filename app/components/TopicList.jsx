"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedTopicCard from "./AnimatedTopicCard";
import { useRouter } from "next/navigation";
import { Search, MapPin } from "lucide-react";
import Image from "next/image";
import Loading from "../Loading";
export default function TopicsList() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  // const [selectedLocation, setSelectedLocation] = useState("");
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/blogs`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setTopics(result);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredTopics = topics.filter((topic) => {
    const matchesSearch =
      topic.title.toLowerCase().includes(searchTerm.toLowerCase())
    //  || topic.content.toLowerCase().includes(searchTerm.toLowerCase());
    // const matchesLocation =
    //   selectedLocation === "" || topic.location === selectedLocation;
    // return matchesSearch && matchesLocation;
    return matchesSearch;
  });

  // const uniqueLocations = Array.from(
  //   new Set(topics.map((topic) => topic.location))
  // );

  if (isLoading) {
    return (
      <Loading/>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 mt-10 bg-custom min-h-screen py-8">
        <h2 className="text-2xl font-bold mb-2">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      // whileHover={{ scale: 1.3 }}
      className="mx-auto px-4 py-8 bg-custom min-h-screen w-full"
    >
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search destinations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full hover:ring-black hover:ring-1 p-3 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
          />
          <Search className=" absolute left-3 top-3 text-gray-400" size={20} />
        </div>
        <div className="relative">
          {/* <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full md:w-48 p-3 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
          >
            <option value="">All Locations</option>
            {uniqueLocations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select> */}
          {/* <MapPin className="absolute left-3 top-3 text-gray-400" size={20} /> */}
        </div>
      </div>
      <AnimatePresence>
        <motion.div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredTopics.map((topic) => (
            <AnimatedTopicCard key={topic._id} topic={topic} />
          ))}
        </motion.div>
      </AnimatePresence>
      {filteredTopics.length === 0 && (
        <>
          <p className="text-center text-gray-600 mt-8 text-lg">
            No such destinations found.
          </p>
          <Image
            src="/assests/404.gif"
            height={400}
            width={400}
            alt="404 Page"
            className="mx-auto shadow-md rounded-xl opacity-80 "
            objectFit="contain"
            loading="lazy"
          />
        </>
      )}
    </motion.div>
  );
}
