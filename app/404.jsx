"use client";

import Image from "next/image";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          404 - Not Found
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Oops! Looks like the page you were looking for doesn't exist.
        </p>
        <div className="mb-8">
          {/* Dribbble Caveman 404 Not Found GIF */}
          <Image
            src="https://media.giphy.com/media/xT9IgJt0xEN7Z6J5J6/giphy.gif" // URL of the Dribbble Caveman 404 Not Found GIF
            alt="Caveman 404"
            width={400}
            height={300}
            objectFit="contain"
          />
        </div>
        <Link href="/" passHref>
          <a className="text-indigo-600 hover:text-indigo-800 text-lg">
            Back to Home
          </a>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
