import React from "react";
import { motion } from "framer-motion";
import { Users, Target, Eye } from "lucide-react";

const AboutUs = () => {
  const stats = [
    { number: "10K+", label: "Active Students" },
    { number: "150+", label: "Partner Institutions" },
    { number: "50+", label: "Team Members" },
    { number: "99%", label: "Customer Satisfaction" },
  ];

  const team = [
    {
      name: "John Doe",
      role: "CEO & Founder",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Sarah Williams",
      role: "Head of Product",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Michael Brown",
      role: "Lead Developer",
      image: "https://randomuser.me/api/portraits/men/46.jpg",
    },
  ];

  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* ================= HERO SECTION ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2F327D] mb-6">
            About <span className="text-[#F48C06]">Our Company</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            We are committed to transforming digital education through
            innovative cloud-based solutions that empower students, educators,
            and institutions worldwide.
          </p>
        </motion.div>

        {/* ================= MISSION & VISION ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-[#F9FAFF] p-8 rounded-2xl shadow-md"
          >
            <Target className="text-[#F48C06] mb-4" size={32} />
            <h3 className="text-2xl font-bold text-[#2F327D] mb-4">
              Our Mission
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To provide seamless, secure, and scalable educational technology
              solutions that enhance learning experiences and operational
              efficiency for institutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-[#F9FAFF] p-8 rounded-2xl shadow-md"
          >
            <Eye className="text-[#F48C06] mb-4" size={32} />
            <h3 className="text-2xl font-bold text-[#2F327D] mb-4">
              Our Vision
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To become a global leader in cloud-based education platforms,
              driving innovation and making quality education accessible to all.
            </p>
          </motion.div>
        </div>

        {/* ================= STATS SECTION ================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-24">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-[#F48C06]/10 p-6 rounded-2xl"
            >
              <h4 className="text-3xl font-bold text-[#2F327D]">
                {stat.number}
              </h4>
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* ================= TEAM SECTION ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Users className="text-[#F48C06] mx-auto mb-4" size={36} />
          <h3 className="text-3xl font-bold text-[#2F327D]">Meet Our Team</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 text-center"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-28 h-28 mx-auto rounded-full mb-4 object-cover"
              />
              <h4 className="text-xl font-bold text-[#2F327D]">
                {member.name}
              </h4>
              <p className="text-gray-500">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
