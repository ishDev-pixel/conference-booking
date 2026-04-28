import React from 'react'
import logo from '../assets/logo.png'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'


const About = () => {
  return (
    <div className='h-screen w-screen bg-indigo-100  '>
        <div className='h-40 w-screen  border-b-2 flex p-5'>
             <div className='h-22   flex '>
                  <div className='flex itewms-center p-4'>
                  <img className="m-0 h-15 w-16" src={logo} alt="logo"/>
                    <h1 className='text-6xl font-bold text-indigo-950'>ConfyBook</h1>
                  </div>
            
        </div>
        <div className='flex gap-15 ml-auto p-5 '>
          <Link to={'/VenuePage'}>
          <motion.button whileHover={{scale:1.1}} className=' border-2  border-black bg-white w-65 h-15 rounded-full text-xl font-bold flex items-center justify-center'>Explore Conferences <ArrowRight/></motion.button>
         </Link>
         <Link to={'/Register'}>
          <motion.button whileHover={{scale:1.1}} className='border-2 border-black bg-white w-40 h-15 rounded-full text-xl font-bold flex items-center justify-center'>Register<ArrowRight/></motion.button>
           </Link>
           </div>
      
    </div>

    <div className='flex gap-4'>
        <div className='flex flex-col gap-3 '>
        <div className='h-70 w-130  p-4'>
            <h1 className='text-4xl'>About ConfyBook</h1>
            <p className='text-xl p-2'>ConfyBook is a modern conference and venue booking platform designed to simplify the process of finding and booking professional spaces for corporate events, meetings, and conferences.
                Our goal is to provide a seamless and reliable experience for users to explore venues and manage bookings efficiently.</p>
        </div>
          <div className='h-70 w-130  p-4'>
            <h1 className='text-4xl'>Our Mission</h1>
            <p className='text-xl p-2'>Our mission is to make conference booking simple, fast, and accessible for businesses and organizations.
             ConfyBook aims to connect users with the perfect venues while providing a smooth and user-friendly booking experience.</p>
          </div>
     </div>
     <div className='flex flex-col gap-3 '>
            <div className='h-70 w-110  p-4'>
                <h1 className='text-4xl'>What We Offer</h1>
                <div className='text-xl p-2'>
                <ul>
                <li>Easy venue discovery</li>
                 <li>Smart conference booking system</li>
                  <li>Professional and secure platform</li>
                  <li>User-friendly dashboard</li>
                   <li>Smooth and reliable booking experience</li>
                   </ul>
                   </div>
            </div>
              <div className='h-70 w-110  p-4'>
                <h1 className='text-4xl'>Why Choose ConfyBook</h1>
                <p className='text-xl p-2'>Designed with simplicity and efficiency in mind<br/>
                 Clean and modern user interface<br/>
                Fast and smooth booking process<br/>
                Reliable and secure platform<br/>
                Easy way to organize professional events</p>
              </div>
              </div>
              <div className='flex flex-col gap-3'>
                <div className='h-70 w-130  p-4'>
                    <h1 className='text-4xl'>About the Developer</h1>
                    <p className='text-xl p-2'>ConfyBook was developed by Ishrat Posge, a Computer Science student and frontend developer passionate about building modern and user-friendly web applications using React, Tailwind, and the MERN stack.
                        This project showcases skills in UI design, responsive development, and real-world application building.</p>
                </div>
                  <div className='h-70 w-130 b p-4'>
                    <h1 className='text-4xl '>Future Vision</h1>
                    <p className='text-xl p-2'>ConfyBook aims to grow into a complete conference management platform with advanced features like online payments, venue filtering, real-time booking, and admin dashboards.</p>
                  </div>
                   </div>
        
    </div>
    </div>
  )
}

export default About
