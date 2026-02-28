import React from "react";
import { motion } from "framer-motion";
import { FileText, Calendar, Users } from "lucide-react";

const SkillSection = () => {
  // ✅ Features Data
  const features = [
    {
      title: "Online Billing, Invoicing & Contracts",
      description:
        "Simple and secure control of your organization’s financial and legal transactions. Send customized invoices and contracts automatically.",
      icon: <FileText size={28} className="text-white" />,
      iconBg: "bg-blue-500",
    },
    {
      title: "Easy Scheduling & Attendance Tracking",
      description:
        "Schedule and reserve classrooms at one campus or multiple campuses. Keep detailed records of student attendance.",
      icon: <Calendar size={28} className="text-white" />,
      iconBg: "bg-orange-500",
    },
    {
      title: "Customer Tracking & Management",
      description:
        "Automate and track emails to individuals or groups. Skilline’s built-in system helps organize your organization efficiently.",
      icon: <Users size={28} className="text-white" />,
      iconBg: "bg-purple-500",
    },
  ];

  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2F327D] mb-6 leading-tight">
            All-In-One <span className="text-[#F48C06]">Cloud Software.</span>
          </h2>

          <p className="text-gray-500 max-w-2xl mx-auto mb-20 text-lg leading-relaxed">
            Skilline is one powerful online software suite that combines all the
            tools needed to run a successful school or office.
          </p>
        </motion.div>

        {/* ================= FEATURES GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
              }}
              whileHover={{
                y: -15,
                transition: { duration: 0.3 },
              }}
              className="relative bg-white p-8 pt-16 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center group cursor-pointer"
            >
              {/* ================= ICON ================= */}
              <motion.div
                whileHover={{ scale: 1.15, rotate: 6 }}
                transition={{ type: "spring", stiffness: 200 }}
                className={`absolute -top-10 w-20 h-20 ${feature.iconBg} rounded-full flex items-center justify-center shadow-lg border-8 border-white`}
              >
                {feature.icon}
              </motion.div>

              {/* ================= CONTENT ================= */}
              <h3 className="text-xl font-bold text-[#2F327D] mb-4 leading-snug">
                {feature.title}
              </h3>

              <p className="text-gray-500 text-sm leading-7">
                {feature.description}
              </p>

              {/* Decorative Hover Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent to-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillSection;
