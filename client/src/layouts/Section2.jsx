import React from 'react'
import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import {Link} from 'react-router-dom'

const Section2 = () => {
  return (
    <div className=' h-screen w-full flex flex-col gap-3 justify-center items-center'>
      <h2 className='text-center font-bold text-2xl text-indigo-950'>Explore Conference Venues</h2>
      <h2 className='text-center font-bold text-4xl text-indigo-400'>Discover a wide range of professional venues <br/> designed to host corporate meetings, conferences, and business events<br/> with <span className=' text-indigo-950'>ConfyBook</span>. </h2>
     
     <div className=' flex flex-col gap-4 p-2 text-indigo-950'>
      <div className='flex gap-4 '>
        
        <div className='h-55 w-50 bg-gray-300 rounded-xl shadow-md shadow-gray-300 flex flex-col gap-3 p-3'>
          <h1 className='font-cold text-xl '>Small Conference Rooms</h1>
          <h2 className=''>Perfect for small meetings and team discussions</h2>
          <Link to={'/VenuePage'}>
          <motion.div whileHover={{scale:1.1,color:"white",borderColor:"white"}} className='h-10 w-8 border-2 border-black rounded-full ml-auto '><ArrowRight size={30}/></motion.div>
           </Link>
        </div>

        

      <div className='h-55 w-50 bg-gray-300 rounded-xl shadow-md shadow-gray-300 flex flex-col gap-3 p-3'>
        <h1 className='font-cold text-xl '>Large Conference Halls</h1>
          <h2>Spacious venues suitable for large corporate events and gatherings</h2>
          <Link to={'/VenuePage'}>
          <motion.div whileHover={{scale:1.1,color:"white",borderColor:"white"}} className='h-10 w-8 border-2 border-black rounded-full ml-auto'><ArrowRight size={30}/></motion.div>
     </Link>
      </div>

      <div className='h-55 w-50 bg-gray-300 rounded-xl shadow-md shadow-gray-300 flex flex-col gap-3 p-3'>
       <h1 className='font-cold text-xl '>  Corporate Meeting Rooms</h1>
             <h2>Professional environments built for business meetings </h2>
             <Link to={'/VenuePage'}>
             <motion.div whileHover={{scale:1.1,color:"white",borderColor:"white"}} className='h-10 w-8 border-2 border-black rounded-full ml-auto'><ArrowRight size={30}/></motion.div>
             </Link>
      </div>

      </div>

      <div className=' flex gap-4'>
       <div className='h-55 w-50 bg-gray-300 rounded-xl shadow-md shadow-gray-300 flex flex-col gap-3 p-3'>
        <h1 className='font-cold text-xl '>Seminar Halls</h1>
        <h2>Modern halls created for seminars, presentations, and workshops</h2>
        <Link to={'/VenuePage'}>
        <motion.div whileHover={{scale:1.1,color:"white",borderColor:"white"}} className='h-10 w-8 border-2 border-black rounded-full ml-auto'><ArrowRight size={30}/></motion.div>
      </Link>
       </div>

       <div className='h-55 w-50 bg-gray-300 rounded-xl shadow-md shadow-gray-300 flex flex-col gap-3 p-3'>
        <h1 className='font-cold text-xl '>Training Rooms</h1>
        <h2>Flexible rooms ideal for training sessions and learning programs</h2>
        <Link to={'/VenuePage'}>
        <motion.div whileHover={{scale:1.1,color:"white",borderColor:"white"}} className='h-10 w-8 border-2 border-black rounded-full ml-auto'><ArrowRight size={30}/></motion.div>
       </Link>
       </div>

       <div className='h-55 w-50 bg-gray-300 rounded-xl shadow-md shadow-gray-300 flex flex-col gap-3 p-3'>
        <h1 className='font-cold text-xl '>Premium Venues</h1>
        <h2>Luxury conference venues for high-end events</h2>
        <Link to={'/VenuePage'}>
        <motion.div whileHover={{scale:1.1,color:"white",borderColor:"white"}} className='h-10 w-8 border-2 border-black rounded-full ml-auto'><ArrowRight size={30}/></motion.div>
      </Link>
       </div>
      </div>
       

        
     
     
     </div>
    </div>
  )
}

export default Section2
