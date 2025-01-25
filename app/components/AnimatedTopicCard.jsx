"use client";
import { motion } from "framer-motion";
import {useState,useEffect} from "react"
import Image from "next/image";
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Cookie from "js-cookie";
export default function AnimatedTopicCard({ topic }) {
  const [isAuth,setAuth]=useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  useEffect(()=>{
    const func = ()=> {
        const email=Cookie.get("email");
        if(email==topic.email){
          setAuth(true);
        }
    }
    func();
  },[])
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-green-100 rounded-lg shadow-md overflow-hidden"
    >
      <div className="h-screen2">
        <Link href={`/blog/${topic._id}`} className="flex-col ">
          <div className="relative h-48 w-full">
            <Image
              src={`${apiUrl}/${topic.file}`}
              alt={topic.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="h-full flex-col p-6 ">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {topic.title}
            </h2>
            <h3 className="text-lg text-gray-700 mb-2">{topic.author}</h3>
            <p className="text-gray-600 mb-4">
              {topic.content.substring(0, 100)}...
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <span>
                <AccessTimeIcon />
                {topic.date_created}
              </span>
            </div>
            {isAuth ? (
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
