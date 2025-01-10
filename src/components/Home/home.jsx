"use client";

import React, { useState } from "react";
import { FaPlay, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { SlideRight } from "@/../utils/animation";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Users, Zap } from 'lucide-react'

const Home = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const openVideo = () => setIsVideoOpen(true);
  const closeVideo = () => setIsVideoOpen(false);
  const router = useRouter();
  const handleNavigateCourses = () => router.push("/courses");

  return (
    <>
      <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[650px] relative">
        {/* brand info */}
        <div className="flex flex-col justify-center py-14 md:pr-16 xl:pr-40 md:py-0">
          <div className="text-center md:text-left space-y-6">
            <motion.h1
              variants={SlideRight(0.6)}
              initial="hidden"
              animate="visible"
              className="text-5xl font-semibold lg:text-5xl !leading-tight"
            >
              Unlock Your Potential with <span className="text-blue-600">Cutting-Edge Learning Tools and Resources!</span> 
            </motion.h1>
            <motion.p
              variants={SlideRight(0.8)}
              initial="hidden"
              animate="visible"
            >
             Discover a world of knowledge with our curated online courses. Learn from industry experts and advance your career at your own pace.
              </motion.p>
            {/* button section */}
         <motion.div
              variants={SlideRight(1.0)}
              initial="hidden"
              animate="visible"
              className="flex gap-8 justify-center md:justify-start !mt-8 items-center"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-12 mt-12">
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <div className="flex self-start gap-3">
                <Users className="h-10 w-10 text-blue-500 mt-0" />
                <div className="text-4xl mb-3 font-bold">8.5k+</div>
                </div>
                <div className="text-md text-gray-600 max-w-[300px] text-start">
                Active learners enrolled in our courses
                </div>
              </div>
            </div>
            <div className="relative">
              <svg className="w-16 h-16 text-gray-200 transform " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              <svg className="w-16 h-16 text-gray-200 transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <div className="flex self-start gap-3">
                <Zap className="h-10 w-10 text-green-500 mt-0" />
                <div className="text-4xl mb-3 font-bold">40+</div>
                </div>
                <div className="text-md text-gray-600 max-w-[300px] text-start">
                Expert-led courses across various disciplines
                </div>
              </div>
            </div>
          </div>
              {/* <button className="primary-btn" onClick={handleNavigateCourses}>Go To Course</button> */}
            </motion.div>
          </div> 
         </div>
        {/* Hero image */}
        <div className="flex justify-center items-center">
          <motion.img
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            src="/assets/front.jpg"
            alt=""
            className="w-[350px] h-auto md:w-[550px] xl:w-[700px]"
          />
        </div> 
      </div>

      {/* Video Popup */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeVideo}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", damping: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl aspect-video bg-white rounded-lg overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-600 opacity-20"></div>
              <button
                onClick={closeVideo}
                className="absolute top-4 right-4 text-white hover:text-blue-600 transition-colors duration-300 z-10"
                aria-label="Close video"
              >
                <FaTimes size={24} />
              </button>
              <div className="absolute inset-2 md:inset-4 bg-black rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/OQrDATc0bKk?si=-0s_m8QB_AxK6qZ6&autoplay=1"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Home;
