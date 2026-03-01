import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, MapPin, Clock, ChevronDown } from "lucide-react";

const Careers = () => {
  const [activeJob, setActiveJob] = useState(null);

  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      location: "Remote",
      type: "Full-Time",
      description:
        "We are looking for a skilled Frontend Developer proficient in React and Tailwind CSS to build modern and responsive user interfaces.",
      responsibilities: [
        "Develop and maintain React applications",
        "Collaborate with UI/UX designers",
        "Optimize applications for performance",
      ],
    },
    {
      id: 2,
      title: "Backend Developer",
      location: "Remote",
      type: "Full-Time",
      description:
        "Join our backend team to build scalable APIs and manage cloud-based infrastructure.",
      responsibilities: [
        "Develop RESTful APIs",
        "Manage database systems",
        "Ensure security and data protection",
      ],
    },
    {
      id: 3,
      title: "UI/UX Designer",
      location: "Hybrid",
      type: "Contract",
      description:
        "We need a creative designer to craft intuitive and engaging digital experiences.",
      responsibilities: [
        "Design user interfaces and experiences",
        "Conduct usability testing",
        "Collaborate with developers",
      ],
    },
  ];

  const toggleJob = (id) => {
    setActiveJob(activeJob === id ? null : id);
  };

  return (
    <section className="py-24 px-6 bg-[#F9FAFF]">
      <div className="max-w-6xl mx-auto">
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2F327D] mb-4">
            Join Our <span className="text-[#F48C06]">Team</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Explore exciting career opportunities and grow with us in a
            collaborative and innovative environment.
          </p>
        </motion.div>

        {/* ================= JOB LISTINGS ================= */}
        <div className="space-y-6">
          {jobs.map((job) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6"
            >
              {/* Top Section */}
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleJob(job.id)}
              >
                <div>
                  <h3 className="text-xl font-bold text-[#2F327D]">
                    {job.title}
                  </h3>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-2">
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      {job.type}
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase size={16} />
                      Hiring
                    </div>
                  </div>
                </div>

                <motion.div
                  animate={{ rotate: activeJob === job.id ? 180 : 0 }}
                >
                  <ChevronDown size={22} />
                </motion.div>
              </div>

              {/* Expandable Section */}
              <AnimatePresence>
                {activeJob === job.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mt-6 overflow-hidden"
                  >
                    <p className="text-gray-600 mb-4">{job.description}</p>

                    <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                      {job.responsibilities.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>

                    <button className="bg-[#F48C06] text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300">
                      Apply Now
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Careers;
