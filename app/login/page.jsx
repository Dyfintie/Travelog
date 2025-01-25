"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LoginForm } from "../components/LoginForm";
import { SignupForm } from "../components/SignupForm";
import Image from "next/image";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="min-h-screen bg-green-200 flex flex-col sm:flex-row items-center sm:items-stretch justify-center sm:justify-between">
      <div className="sm:flex flex-col justify-center items-center px-5 py-8 sm:w-1/2 w-full bg-green-200 max-w-full">
        <h2 className="text-2xl sm:text-3xl text-orange-800 font-bold text-center mb-6">
          {isLogin ? "Welcome Back!" : "Create Account"}
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
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

      {/* Responsive Image Section */}
      <div className="relative w-full sm:w-1/2 h-64 sm:h-screen">
        <Image
          src="/assests/mount.jpg"
          alt="mountain"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="rounded-t-lg sm:rounded-none"
        />
      </div>
    </div>
  );
}
