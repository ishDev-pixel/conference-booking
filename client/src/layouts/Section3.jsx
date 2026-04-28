import React from 'react'
import BookingPage from '../pages/BookingPage'

const Section3 = () => {
  return (
    <div className='h-screen w-screen  flex flex-col justify-center items-center '>
        <div className='h-170 w-300  bg-gradient-to-b from-gray-300 to-white flex flex-col justify-center items-center border-2 border-black rounded-2xl'>
            <div className='py-10 flex flex-col gap-3'>
        <h1 className='text-center  text-5xl'>Host Seamless Conferences with ConfyBook</h1>
        <h2  className='text-center text-3xl'>Enhance collaboration, planning, and event management <br/> with ConfyBook’s smart venue booking platform.</h2>      
        </div>
        <div className='w-270 grid grid-cols-3 '>
            <BookingPage/>
             <BookingPage/>
              <BookingPage/>
              
            
         </div>

      </div>
    </div>
  )
}

export default Section3 