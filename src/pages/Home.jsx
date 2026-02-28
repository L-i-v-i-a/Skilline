import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
<<<<<<< HEAD
import SkillSection from '../components/SkillSection'
=======
import WhatIsSkilline from '../components/WhatIsSkilline'
import PhysicalClassroom from '../components/PhysicalClassroom'
import Features from '../components/Features'
>>>>>>> origin/dev

const Home = () => {
  return (
     <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      
      {/* Brands Section */}
      <section className="py-20 text-center">
        <p className="text-gray-400 text-lg font-medium mb-12 uppercase tracking-[0.2em]">Trusted by 5,000+ Companies Worldwide</p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-30 grayscale px-6">
          {/* Note: Import these similar to the logo if they are in assets */}
          <span className="text-3xl font-bold">GOOGLE</span>
          <span className="text-3xl font-bold">NETFLIX</span>
          <span className="text-3xl font-bold">AIRBNB</span>
          <span className="text-3xl font-bold">AMAZON</span>
          <span className="text-3xl font-bold">FACEBOOK</span>
        </div>
      </section>
      <WhatIsSkilline />
      <PhysicalClassroom />
      <Features />
    </div>   
  )
}

export default Home
