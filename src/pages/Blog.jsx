import React from 'react'
import Navbar from '../components/Navbar'
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";

const Blog = () => {
  return (
    <>
      <Navbar />
      
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2F327D] mb-4">
            Our Latest <span className="text-[#F48C06]">Blog</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Stay updated with insights, tips, and trends in digital education
            and cloud software solutions.
          </p>
        </motion.div>

        {/* ================= BLOG GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Date */}
                <div className="flex items-center text-sm text-gray-400 mb-3 gap-2">
                  <Calendar size={16} />
                  {post.date}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#2F327D] mb-3 leading-snug">
                  {post.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-6 mb-6">
                  {post.description}
                </p>

                {/* Read More */}
                <div className="flex items-center text-[#F48C06] font-medium group-hover:gap-3 gap-2 transition-all">
                  Read More
                  <ArrowRight size={18} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

      <footer />
    </>
  );
} 

export default Blog