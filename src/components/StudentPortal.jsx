import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const StudentPortal = () => {
  return (
    <section className="py-24 px-6 bg-[#F9FAFF] overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* ================= LEFT CONTENT ================= */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2F327D] leading-tight mb-6">
            Everything You Need in a{" "}
            <span className="text-[#F48C06]">Student Portal</span>
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Manage assignments, track attendance, access learning materials, and
            communicate with instructors — all from one secure and intuitive
            dashboard designed to simplify your academic experience.
          </p>

          {/* Features List */}
          <div className="space-y-4 mb-10">
            {[
              "Real-time assignment tracking",
              "Attendance and performance monitoring",
              "Secure document and resource access",
              "Integrated messaging system",
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex items-center space-x-3"
              >
                <div className="w-3 h-3 bg-[#F48C06] rounded-full" />
                <p className="text-gray-700">{item}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#F48C06] text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              Get Started
              <ArrowRight size={18} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-[#2F327D] text-[#2F327D] px-6 py-3 rounded-full font-medium hover:bg-[#2F327D] hover:text-white transition-all duration-300"
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>

        {/* ================= RIGHT IMAGE ================= */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          {/* Decorative Background Shape */}
          <div className="absolute -top-10 -right-10 w-72 h-72 bg-[#F48C06]/10 rounded-full blur-3xl" />

          <img
            src="https://images.unsplash.com/photo-1584697964190-7383c1b6b9e9"
            alt="Student Portal Dashboard"
            className="relative rounded-3xl shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default StudentPortal;
