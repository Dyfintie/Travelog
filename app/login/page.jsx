"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LoginForm } from "../components/LoginForm";
import { SignupForm } from "../components/SignupForm";
import Image from "next/image";
export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="min-h-screen bg-green-200 flex items-center justify-between ">
      {/* <div className="min-h-screen bg-gradient-to-br from-green-200 to-green-300 flex-col"> */}
      <div className="flex justify-between px-5 h-screen bg-green-200 w-full max-w-full overflow-hidden">
        <div className="flex-col w-full2 px-8 pt-8 pb-16 max-h-1.5 mt-40">
          <h2 className="text-3xl text-orange-800 font-bold text-center mb-8">
            {isLogin ? "Welcome Back!" : "Create Account"}
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {isLogin ? <LoginForm /> : <SignupForm />}
          </motion.div>
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-green-600 hover:underline focus:outline-none"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Log in"}
            </button>
          </div>
          
        </div>
        <div className="pl-5 h-full w-full2 relative">
          <Image
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            src="/assests/mount.jpg"
            alt="mountain"
            // height={500}
            // width={500}
          />
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}
