import React from 'react'
import {motion} from 'motion/react'

const Section1 = () => {
  return (
    <>
    <div className='h-screen w-4/7 '>
        <div className='justify-center items-center p-10 '>  
        <h2 className='text-6xl font-bold gap-10 leading-tight py-10 '>Book Corporate <br></br><span className='flex'> Conferences Seamlessly</span></h2>
        <p className='text-xl font-bold '>Enterprise-level event management and booking made Easy</p>
              </div>
       <div className='flex gap-10 p-10 '>
          <motion.button className='border-10 border-indigo-800 bg-indigo-800 text-white font-bold shadow-lg shadow-indigo-950' whileHover={{scale:1.1}}>Explore Conferences</motion.button>
          <motion.button className='border-10 bg-white border-white text-black font-bold shadow-lg shadow-indigo-950 ' whileHover={{scale:1.1}}>Host an Even</motion.button>
          </div>

    </div>
    </>
  )
}

export default Section1
