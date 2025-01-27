"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Cookies from "js-cookie"; 
import TopicList from "../components/TopicList";
const BlogPage = () => {
  const [isAuth, setAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const email = Cookies.get("email");

    if (email) {
      setAuth(true);
    } else {
      router.push("/login");
    }
  }, [router]);

  if (!isAuth) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="pt-16 bg-custom">
        <TopicList />
      </div>
    </>
  );
};

export default BlogPage;
