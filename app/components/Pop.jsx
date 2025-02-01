"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedTopicCard from "./AnimatedTopicCard";
import ErrorPage from "../404";
import Loading from "../Loading";

const Pop = () => {
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState("");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [onHome, setOnhome] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/blog", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        // console.log("Fetched data:", result); // Debugging log

        if (!Array.isArray(result.blogs)) {
          throw new Error("Fetched data is not an array");
        }

        setTopics(result.blogs);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } 
      // finally {
      //   setIsLoading(false);
      // }
    };

    fetchData();
  }, []);

  // Slice the first 3 topics
  const firstThreeTopics = topics.slice(0, 3);

  // if (isLoading) {
  //   return <Loading />;
  // }

  if (error) {
    return <ErrorPage />;
  }

  return (
    // export default function PopularPlaces({ firstThreeTopics }) {
    //   return (
    <motion.div className=" font-work-sans py-12 bg-custom ">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold  text-black mb-6 text-center">
          Most Popular Places
        </h2>

        <motion.div className="flex flex-wrap gap-6 justify-center">
          <AnimatePresence>
            {firstThreeTopics.map((topic, index) => (
              <motion.div
                key={topic._id}
                initial={{ y: 200, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                // transition={{ delay: 0.5, duration: 1 }}
                transition={{ duration: 0.5, delay: index * 0.3 }}
                className="max-w-sm w-full justify-between gap-3 lg:w-1/3 xl:w-1/4"
              >
                <AnimatedTopicCard
                  key={topic._id}
                  topic={topic}
                  onHome={onHome}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Pop;
