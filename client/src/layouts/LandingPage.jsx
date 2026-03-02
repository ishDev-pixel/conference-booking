import React from 'react'
import Navbar from './Navbar'
import Section1 from './Section1'
import Section2 from './Section2'

const LandingPage = () => {
   const images=[
      {img:'https://images.unsplash.com/photo-1769758791765-9d4e8cc5a38d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8'},
      {img:'https://plus.unsplash.com/premium_photo-1677560517139-1836389bf843?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8'},
      {img:'https://plus.unsplash.com/premium_photo-1772057546818-cfb35e32accb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D'},
      {img:'https://images.unsplash.com/photo-1771834683810-c3bf223a2a53?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D'}
      ];
  return (
    <div className=' h-screen w-full bg-linear-to-r from-white to-indigo-950 '>
        
 
     
      <Navbar/>
        <div className='flex'>
      <Section1/>
      <Section2/>
      </div>
    </div>
  )
}

export default LandingPage
