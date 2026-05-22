import React from 'react'
import { motion } from 'framer-motion' // Note: change back to 'motion/react' if that's your specific package alias
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const Section1 = () => {
  return (
    <div 
      className="pt-22 min-h-screen w-full flex flex-col justify-center items-center gap-6  bg-no-repeat bg-cover bg-[url(https://media.licdn.com/dms/image/v2/D5612AQE7QlAC9kaIdQ/article-cover_image-shrink_720_1280/B56ZrEM1SCJUAM-/0/1764228293880?e=2147483647&v=beta&t=onq5riyekX_68TKNuTZFUGnv33gu68IgatOfHuqANXA))]">
      <h2 className="text-center text-xl md:text-2xl font-semibold text-indigo-950 tracking-wide"> 
        ConfyBook Conference Experience Platform
      </h2>
          
      <h1 className="font-extrabold text-4xl md:text-6xl text-indigo-600 text-center leading-tight">
        Host Seamless Corporate <br /> 
        Venues and Conferences<br/> 
        with <span className="text-indigo-950">ConfyBook</span>.
      </h1>

      <h2 className=" md:text-2xl  text-white font-medium text-center max-w-4xl px-4">
        ConfyBook makes conference booking simple, fast, and seamless, helping you <br className="hidden md:inline" /> 
        <span className="font-bold text-indigo-950">find the perfect venue for every professional event</span>
      </h2>
         
      <div className="flex flex-col sm:flex-row gap-6 mt-4">
        <Link to="/VenueContext">
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="bg-indigo-950 text-white px-8 h-15 rounded-md text-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-indigo-900 transition-colors cursor-pointer"
          >
            Explore Conferences <ArrowRight className="w-5 h-5" />
          </motion.button>
        </Link>

        <Link to="/VenuePage">
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="bg-white text-indigo-950 border-2 border-indigo-950 px-8 h-15 rounded-md text-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-indigo-50 transition-colors cursor-pointer"
          >
            Book Now <ArrowRight className="w-5 h-5" />
          </motion.button>
        </Link>
      </div>
    </div>
  )
}

export default Section1