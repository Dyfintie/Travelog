"use client";

import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-green-100">
      <motion.svg
        width={120}
        height={120}
        viewBox="0 0 100 100"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
        }}
      >
        
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#90EE90"
          strokeWidth="2"
        />

        
        <circle cx="50" cy="50" r="5" fill="#90EE90" />

        
        <motion.g
          animate={{ rotate: [0, 360] }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <path d="M50 10 L55 50 L50 90 L45 50 Z" fill="#90EE90" />
        </motion.g>

        
        <text x="50" y="20" textAnchor="middle" fill="#90EE90" fontSize="12">
          N
        </text>
        <text x="80" y="53" textAnchor="middle" fill="#90EE90" fontSize="12">
          E
        </text>
        <text x="50" y="85" textAnchor="middle" fill="#90EE90" fontSize="12">
          S
        </text>
        <text x="20" y="53" textAnchor="middle" fill="#90EE90" fontSize="12">
          W
        </text>
      </motion.svg>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-4 text-2xl font-semibold text-indigo-700"
      >
        Exploring new horizons...
      </motion.h2>
    </div>
  );
};

export default Loading;
