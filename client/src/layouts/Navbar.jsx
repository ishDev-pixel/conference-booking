import React from 'react'
import logo from '../assets/logo.png'
import {motion} from 'motion/react'

const Navbar = () => {
  return (
    <>  
    <div className='h-22 w-screen bg-linear-to-r from-white to-indigo-950 shadow-lg shadow-black flex '>
      
      <img className="p-2 mr-4" src={logo} alt="logo" h-10 />
        <h1 className='text-5xl font-bold m-0 p-5 text-indigo-950'>ConfyBook</h1>
      
        <div className='flex items-center  text-indigo-950 gap-8 p-8 ml-140'>
          <motion.h3 className='text-2xl font-bold'
          whileHover={{color:'white'}}>Home</motion.h3>
          <motion.h3 className='text-2xl font-bold'
           whileHover={{color:'white'}}>Conferences</motion.h3>
          <motion.h3 className='text-2xl font-bold'
           whileHover={{color:'white'}}>About Us</motion.h3>
          <motion.button className='bg-indigo-900 border-indigo-900 border-3 rounded-md text-xl p-2'
          whileHover={{color:'white',scale:1.1}}>  Login  </motion.button>
        </div>
      <h1></h1>
    </div>
    </>
  )
}

export default Navbar
