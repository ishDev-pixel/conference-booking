import { ArrowRight } from 'lucide-react'
import React from 'react'
import BookingPage from '../../pages/BookingPage'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'

const section1 = () => {
  return (
  <div className='pt-22 h-screen w-screen'>
    <div className=' flex flex-col justify-center items-center gap-8 '>
         <div className='pt-23   h-100 w-350 bg-no-repeat bg-cover object-cover bg-[url(https://plus.unsplash.com/premium_photo-1681995453325-455f7084888d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG1lZXRpbmd8ZW58MHx8MHx8fDA%3D)]'>
         <div className='px-5'>
         <h1 className='text-2xl font-bold '>Built for Corporate Events</h1>
         <p className='text-xl p-2 '>Planning a meeting or conference? <br/>
            ConfyBook provides a curated selection of venues designed for business events, seminars, and corporate gatherings.
             <br /> Find the right venue and book it effortlessly.</p>
         </div>
         </div>

         <div className='h-20 w-350  flex justify-center items-center'>
            <h1 className='text-4xl font-bold p-2 '>Popular Venues</h1>
            <h1 className='flex ml-auto'>Explore more<ArrowRight/></h1>
         </div>
         <div className='  w-350  grid grid-cols-4 grid-rows-2 gap-x-3 gap-y-4'>
            <BookingPage/>
             <BookingPage/>
              <BookingPage/>
               <BookingPage/>
                <BookingPage/>
                 <BookingPage/>
                  <BookingPage/>
                   <BookingPage/>
            
         </div>

         <div className='h-40 w-350 '>
            <h1 className='text-6xl p-5 font-bold'> Experience the calm of simplified,<br/> streamlined corporate event management</h1> 
            </div>
       
        <div className=' h-50 w-250  p-2 grid grid-cols-3 grid-rows-2 gap-2 text-4xl '>
         <Link to={'/VenuePage'}>
            <motion.div whileHover={{backgroundColor:"white",color:"gray",border: "2px solid gray"}} className='h-20 w-80 bg-gray-300 rounded-2xl p-5'>
               <h1>Conference hall</h1>
            </motion.div>
            </Link>
            <Link to={'/VenuePage'}>
            <motion.div whileHover={{backgroundColor:"white",color:"gray",border: "2px solid gray"}} className='h-20 w-80 bg-gray-300 rounded-2xl p-5'>
               <h1>Seminar</h1>
            </motion.div>
            </Link>
            <Link to={'/VenuePage'}>
            <motion.div whileHover={{backgroundColor:"white",color:"gray",border: "2px solid gray"}} className='h-20 w-80 bg-gray-300 rounded-2xl p-5'>
               <h1>Meetings</h1> 
            </motion.div>
            </Link>
            <Link to={'/VenuePage'}>
            <motion.div whileHover={{backgroundColor:"white",color:"gray",border: "2px solid gray"}} className='h-20 w-80 bg-gray-300 rounded-2xl p-5'>
               <h1>Training</h1> 
            </motion.div>
            </Link>

            <Link to={'/VenuePage'}>
            <motion.div whileHover={{backgroundColor:"white",color:"gray",border: "2px solid gray"}} className='h-20 w-80 bg-gray-300 rounded-2xl p-5'>
             <h1> Employee Events</h1> 
            </motion.div>
            </Link>
            <Link to={'/VenuePage'}>
            <motion.div whileHover={{backgroundColor:"white",color:"gray",border: "2px solid gray"}} className='h-20 w-80 bg-gray-300 rounded-2xl p-5'>
              <h1> Conferences</h1> 
            </motion.div>
            </Link>
         </div>
      
    </div>

    </div>
     
  )
}

export default section1      