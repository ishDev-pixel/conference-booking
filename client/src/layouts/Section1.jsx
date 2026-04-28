import React from 'react'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import {Link} from 'react-router-dom'

const Section1 = () => {
  return (
    <div className='  justify-center items-center flex flex-col gap-5 bg-pink-400  h-full w-full  bg-no-repeat bg-cover object-cover bg-[url(https://plus.unsplash.com/premium_photo-1681995453325-455f7084888d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG1lZXRpbmd8ZW58MHx8MHx8fDA%3D)]'>
      <h2 className='text-center text-2xl font-bold text-indigo-950'> ConfyBook Conference Experience Platform</h2>
          
          <h1 className='font-bold text-6xl text-indigo-400 text-center'>Host Seamless Corporate <br /> <span className='text-indigo-950'>Venues</span> and <span className='text-indigo-950'>Conferences</span><br/> with ConfyBook</h1>
          <h2 className='text-2xl font-bold text-indigo-950 text-center'>ConfyBook makes conference booking simple, fast, and seamless, helping you <br /> <span> find the perfect venue for every professional event</span></h2>
         
          <div className='flex gap-15'>
          <Link to={'/VenueContext'}>
          <motion.button whileHover={{scale:1.1}} className='bg-indigo-950 text-white w-65 h-15 rounded-md text-xl font-bold flex items-center justify-center'>Explore Conferences <ArrowRight/></motion.button>
          </Link>
            <Link to={'/VenuePage'}>
          <motion.button whileHover={{scale:1.1}} className='bg-indigo-950 text-white h-15 w-40 rounded-md text-xl font-bold flex items-center justify-center'>Book Now <ArrowRight/></motion.button>
           </Link>
           </div>
    </div>
  )
}

export default Section1
