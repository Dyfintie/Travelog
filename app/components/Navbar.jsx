"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, LogIn, LogOut } from "lucide-react";
import plane from "../favicon.ico";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
const navItems = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blogs" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [gemail, setEmail] = useState("");
  const { scrollY } = useScroll();
  const router = useRouter();
  const [isAuth, setAuth] = useState(false);

  useEffect(() => {
    const email = Cookies.get("email");
    setEmail(email);
    if (email) {
      setAuth(true);
    }
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const toggleNavbar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    Cookies.remove("email");
    setAuth(false);
    router.push("/");
    router.refresh();
  };

  useEffect(() => {
    const handleResize = () => isOpen && setIsOpen(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={hidden ? { y: -100 } : { y: 0 }}
      exit={{ y: -100 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="font-work-sans fixed top-0 left-0 right-0 z-50 bg-opacity-90 backdrop-blur-md shadow-lg bg-gradient-to-r from-green-100 to-green-800"
    >
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-green-100 to-green-300">
        <div className="flex justify-between items-center py-4 md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/" className="flex items-center space-x-2">
              {/* <Compass className="h-8 w-8 text-green-600" /> */}
              <Image src={plane} height={24} widht={24} alt="Travelog logo" />
              <span className="text-2xl font-extrabold text-green-800 ">
                Trave{" "}
                <span className="text-2xl font-extrabold text-orange-800 ">
                  Loog
                </span>
              </span>
            </Link>
          </div>
          <div className="md:hidden">
            <motion.button
              whileTap={{ rotate: 180 }}
              type="button"
              className="bg-green-100 rounded-md p-2 inline-flex items-center justify-center text-green-600 hover:text-green-700 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
              onClick={toggleNavbar}
            >
              <span className="sr-only">Open menu</span>
              {isOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </motion.button>
          </div>
          <nav className="hidden md:flex space-x-10 font-work-sans font-bold">
            {navItems.map((item) => (
              // <Link
              //   key={item.href}
              //   href={item.href}
              //   className=" py-1 px-1 font-semibold text-xl pt-1.5 text-green-600 hover:text-green-800 transition duration-300 ease-in-out"
              // >
              <motion.button
                key={item.label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="px-3 py-1 rounded-xl hover:bg-green-400 text-green-800 flex justify-center items-center"
                onClick={() => {
                  router.push(`${item.href}`);
                }}
              >
                {item.label}
              </motion.button>
              // </Link>
            ))}
            {isAuth ? (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                onClick={() => {
                  router.push("/addtopic");
                }}
                className="px-2 py-1 rounded-xl hover:bg-green-400  text-orange-700  "
              >
                <CreateOutlinedIcon />
                Write
              </motion.button>
            ) : null}
            {isAuth ? (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                onClick={handleLogout}
                className="flex items-center space-x-1 rounded-md px-3 py-2 bg-green-500 text-white hover:bg-green-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                onClick={() => {
                  router.push("/login");
                }}
                className="rounded-md px-3 py-2 bg-green-500 text-white "
              >
                <LogIn className="h-5 w-5" />
                <span>Login</span>
              </motion.button>
            )}
          </nav>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-green-100 shadow-lg md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-green-600 hover:text-green-800 hover:bg-green-200 transition duration-300 ease-in-out"
                  onClick={toggleNavbar}
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                  </motion.span>
                </Link>
              ))}
              <div className="flex justify-between space-x-2">
                {isAuth ? (
                  <button
                    onClick={() => {
                      router.push("/addtopic");
                    }}
                    className="flex font-semibold  items-center gap-1 space-x-1 rounded-md px-3 py-2  text-orange-700 hover:bg-green-300 transition duration-300 ea  -in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    <CreateOutlinedIcon />
                    Write
                  </button>
                ) : null}
                {isAuth ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 w-1/11 px-3 py-2 rounded-md text-base font-medium text-white bg-green-500 hover:bg-green-600 transition duration-300 ease-in-out"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      router.push("/login");
                    }}
                    className="max-w-fit items-center space-x-1 w-full px-3 py-2 rounded-md text-base font-medium text-white bg-green-500 hover:bg-green-600 transition duration-300 ease-in-out"
                  >
                    <LogIn className="h-5 w-5" />
                    <span>Login</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
